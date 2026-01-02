import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

// Manual base64 decoding to avoid external libraries as per guidelines
function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Manual base64 encoding to avoid external libraries as per guidelines
function encodeBase64(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export class GeminiLiveService {
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private outputNode: GainNode | null = null;
  private nextStartTime = 0;
  private sources = new Set<AudioBufferSourceNode>();
  private stream: MediaStream | null = null;
  private sessionPromise: Promise<any> | null = null;
  private processor: ScriptProcessorNode | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  public isConnected = false;
  private isConnecting = false;
  public isInputMuted = false;

  public onAudioData: ((amplitude: number) => void) | null = null;
  public onError: ((error: any) => void) | null = null;

  constructor() {}

  muteInput(muted: boolean) {
    this.isInputMuted = muted;
  }

  async connect(persona: string) {
    if (this.isConnecting || this.isConnected) return;
    this.isConnecting = true;

    await this.disconnect();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.isConnecting = false;
        const err = new Error("Mic not supported in this browser.");
        if (this.onError) this.onError(err);
        throw err;
    }

    try {
        this.stream = await navigator.mediaDevices.getUserMedia({ 
            audio: { echoCancellation: true, noiseSuppression: true } 
        });
        
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        this.inputAudioContext = new AudioContextClass({ sampleRate: 16000 });
        this.outputAudioContext = new AudioContextClass({ sampleRate: 24000 });
        
        if (this.inputAudioContext?.state === 'suspended') await this.inputAudioContext.resume();
        if (this.outputAudioContext?.state === 'suspended') await this.outputAudioContext.resume();

        this.outputNode = this.outputAudioContext.createGain();
        this.outputNode.connect(this.outputAudioContext.destination);

        // ALWAYS initialize GoogleGenAI with { apiKey: process.env.API_KEY } per guidelines
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        this.sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-09-2025',
          callbacks: {
            onopen: () => {
                this.isConnected = true;
                this.isConnecting = false;
                this.handleOpen();
            },
            onmessage: this.handleMessage.bind(this),
            onclose: () => {
                this.isConnected = false;
                this.isConnecting = false;
            },
            onerror: (err) => {
                this.isConnected = false;
                this.isConnecting = false;
                if (this.onError) this.onError(err);
            },
          },
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
            },
            systemInstruction: `Persona: ${persona}. You are a live stream host. Keep it interactive.`,
          },
        });
        
        return this.sessionPromise;
    } catch (error: any) {
        this.isConnected = false;
        this.isConnecting = false;
        if (this.onError) this.onError(error);
        throw error;
    }
  }

  private handleOpen() {
    if (!this.inputAudioContext || !this.stream) return;
    try {
        this.sourceNode = this.inputAudioContext.createMediaStreamSource(this.stream);
        this.processor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);
        this.processor.onaudioprocess = (e) => {
          // Check for intentional mute toggle
          if (this.isInputMuted) return;
          const inputData = e.inputBuffer.getChannelData(0);
          const l = inputData.length;
          const int16 = new Int16Array(l);
          for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
          const pcmBlob = {
            data: encodeBase64(new Uint8Array(int16.buffer)),
            mimeType: 'audio/pcm;rate=16000',
          };
          // CRITICAL: Solely rely on sessionPromise resolves and then call `session.sendRealtimeInput`, do not add other connection condition checks.
          this.sessionPromise?.then((session) => {
            session.sendRealtimeInput({ media: pcmBlob });
          });
        };
        this.sourceNode.connect(this.processor);
        this.processor.connect(this.inputAudioContext.destination);
    } catch (e) { console.error(e); }
  }

  private async handleMessage(message: LiveServerMessage) {
    if (!this.isConnected) return;
    const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
    if (base64Audio && this.outputAudioContext && this.outputNode) {
      try {
          const raw = decodeBase64(base64Audio);
          let sum = 0;
          const dataInt16 = new Int16Array(raw.buffer);
          for(let i=0; i<dataInt16.length; i++) sum += Math.abs(dataInt16[i]);
          if (this.onAudioData) this.onAudioData(sum / dataInt16.length / 327);
          this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
          const audioBuffer = await decodeAudioData(raw, this.outputAudioContext, 24000, 1);
          const source = this.outputAudioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(this.outputNode);
          source.addEventListener('ended', () => this.sources.delete(source));
          source.start(this.nextStartTime);
          this.nextStartTime += audioBuffer.duration;
          this.sources.add(source);
      } catch (e) { console.warn(e); }
    }
    if (message.serverContent?.interrupted) {
      this.sources.forEach(s => { try { s.stop(); } catch(e) {} });
      this.sources.clear();
      this.nextStartTime = 0;
    }
  }

  async disconnect() {
    this.isConnected = false;
    this.isConnecting = false;
    if (this.processor) {
        this.processor.onaudioprocess = null;
        this.processor.disconnect();
    }
    this.sourceNode?.disconnect();
    this.stream?.getTracks().forEach(track => track.stop());
    this.sources.forEach(s => { try { s.stop(); } catch(e) {} });
    this.sources.clear();
    if (this.inputAudioContext?.state !== 'closed') try { await this.inputAudioContext?.close(); } catch(e) {}
    if (this.outputAudioContext?.state !== 'closed') try { await this.outputAudioContext?.close(); } catch(e) {}
    this.processor = null;
    this.sourceNode = null;
    this.inputAudioContext = null;
    this.outputAudioContext = null;
    this.stream = null;
    this.sessionPromise = null;
  }
}
