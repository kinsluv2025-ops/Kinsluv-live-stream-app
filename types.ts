
export interface Streamer {
  id: string;
  name: string;
  avatar: string;
  videoUrl?: string;
  viewerCount: number;
  followerCount: number;
  tags: string[];
  persona: string;
  flag?: string; // Country flag emoji
  countryCode?: string; // ISO country code for flag images
  isVerified?: boolean; // Official Blue Tick
  roomType?: 'audio' | 'video';
  seatCount?: number;
  vipLevel?: number; // 0-4
  starLevel?: number; // 0 = None, 1 = Star Host, 2 = Elite Star
  distance?: string;
  diamonds?: number;
  resolution?: string;
  isSelf?: boolean;
  welcomeMessage?: string;
  xp?: number; // Viewer XP
  hostXp?: number; // Streamer XP
}

export enum AppState {
  AUTH = 'AUTH',
  FEED = 'FEED',
  LIVE_ROOM = 'LIVE_ROOM',
  PROFILE = 'PROFILE',
  ADMIN = 'ADMIN',
  MOMENTS = 'MOMENTS',
  WALLET = 'WALLET',
  MESSAGES = 'MESSAGES',
  PARTY = 'PARTY',
  TASKS = 'TASKS',
  HOST_CENTER = 'HOST_CENTER',
  GAME = 'GAME',
  TOOLS = 'TOOLS',
  AGENT = 'AGENT',
  SELLER = 'SELLER',
  STAR_HOST = 'STAR_HOST',
  STORE = 'STORE',
  POSTS = 'POSTS',
  BADGES = 'BADGES',
  LEVELS = 'LEVELS',
  VIP = 'VIP',
  INVITE = 'INVITE',
  SAFETY = 'SAFETY',
  JOIN_AGENCY = 'JOIN_AGENCY',
  CERTIFICATION = 'CERTIFICATION',
  SUPPORT = 'SUPPORT',
  ENTRY_EFFECTS = 'ENTRY_EFFECTS',
  FACE_AUTH = 'FACE_AUTH',
  CRYPTO = 'CRYPTO'
}

export interface ChatMessage {
  id: string;
  username: string;
  text: string;
  image?: string; 
  isSystem?: boolean;
  isPrivate?: boolean;
  isVerified?: boolean; 
  avatar?: string;
  vipLevel?: number; 
}

export interface CommentReply {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timeAgo: string;
}

export interface MomentComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timeAgo: string;
  replies?: CommentReply[];
}

export interface Moment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timeAgo: string;
  content: string; 
  contentType: 'image' | 'video' | 'audio' | 'parlay';
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  location?: string;
  isFollowing?: boolean;
  commentList?: MomentComment[];
  parlay?: {
    question: string;
    option1: string;
    option2: string;
    votes1: number;
    votes2: number;
    totalVotes: number;
    userVoted?: 1 | 2;
  };
}

export type PredictionType = '1X2' | 'SCORE' | 'OVER_UNDER';

export interface FootballMatch {
  id: string;
  league: string;
  team1: { name: string; logo: string; color: string };
  team2: { name: string; logo: string; color: string };
  startTime: string;
  status: 'scheduled' | 'live' | 'finished';
  votes: number;
  vote1Percent: number;
  vote2Percent: number;
  score1: number;
  score2: number;
  liveTime?: string;
  totalPool: number; 
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  xpBonus: number; 
  unlocked: boolean;
}
