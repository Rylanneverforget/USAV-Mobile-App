export type Team = {
  id: string;
  name: string;
  shortName: string;
  country: string;
  wins: number;
  losses: number;
  setsWon: number;
  setsLost: number;
  points: number;
  form: ("W" | "L")[];
  isFavorite?: boolean;
};

export type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: "live" | "upcoming" | "finished";
  date: string;
  time: string;
  tournament: string;
  sets?: { home: number; away: number }[];
  currentSet?: number;
};

export type Player = {
  id: string;
  name: string;
  position: string;
  team: string;
  country: string;
  number: number;
  stats: {
    points: number;
    aces: number;
    blocks: number;
    digs: number;
    attacks: number;
  };
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: number;
};

export const TEAMS: Team[] = [
  { id: "1", name: "USA", shortName: "USA", country: "United States", wins: 22, losses: 3, setsWon: 68, setsLost: 18, points: 66, form: ["W","W","W","L","W"], isFavorite: true },
  { id: "2", name: "Brazil", shortName: "BRA", country: "Brazil", wins: 20, losses: 5, setsWon: 64, setsLost: 22, points: 61, form: ["W","W","L","W","W"] },
  { id: "3", name: "Poland", shortName: "POL", country: "Poland", wins: 19, losses: 6, setsWon: 60, setsLost: 25, points: 58, form: ["L","W","W","W","W"] },
  { id: "4", name: "France", shortName: "FRA", country: "France", wins: 18, losses: 7, setsWon: 58, setsLost: 28, points: 55, form: ["W","L","W","W","L"] },
  { id: "5", name: "Italy", shortName: "ITA", country: "Italy", wins: 17, losses: 8, setsWon: 55, setsLost: 30, points: 52, form: ["W","W","W","L","W"] },
  { id: "6", name: "Japan", shortName: "JPN", country: "Japan", wins: 16, losses: 9, setsWon: 52, setsLost: 33, points: 49, form: ["L","L","W","W","W"] },
  { id: "7", name: "Argentina", shortName: "ARG", country: "Argentina", wins: 15, losses: 10, setsWon: 49, setsLost: 36, points: 46, form: ["W","L","W","L","W"] },
  { id: "8", name: "Canada", shortName: "CAN", country: "Canada", wins: 14, losses: 11, setsWon: 46, setsLost: 38, points: 43, form: ["L","W","L","W","W"] },
];

export const MATCHES: Match[] = [
  {
    id: "m1",
    homeTeam: "USA",
    awayTeam: "BRA",
    homeScore: 2,
    awayScore: 1,
    status: "live",
    date: "Today",
    time: "LIVE",
    tournament: "VNL 2026",
    sets: [{ home: 25, away: 22 }, { home: 23, away: 25 }, { home: 18, away: 15 }],
    currentSet: 3,
  },
  {
    id: "m2",
    homeTeam: "USA",
    awayTeam: "FRA",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    date: "Today",
    time: "20:00",
    tournament: "VNL 2026",
  },
  {
    id: "m3",
    homeTeam: "USA",
    awayTeam: "JPN",
    homeScore: 3,
    awayScore: 0,
    status: "finished",
    date: "Yesterday",
    time: "Final",
    tournament: "VNL 2026",
    sets: [{ home: 25, away: 20 }, { home: 25, away: 18 }, { home: 25, away: 22 }],
  },
  {
    id: "m4",
    homeTeam: "POL",
    awayTeam: "ITA",
    homeScore: 1,
    awayScore: 3,
    status: "finished",
    date: "Yesterday",
    time: "Final",
    tournament: "VNL 2026",
    sets: [{ home: 22, away: 25 }, { home: 25, away: 23 }, { home: 18, away: 25 }, { home: 20, away: 25 }],
  },
  {
    id: "m5",
    homeTeam: "USA",
    awayTeam: "POL",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    date: "Tomorrow",
    time: "18:00",
    tournament: "VNL 2026",
  },
  {
    id: "m6",
    homeTeam: "BRA",
    awayTeam: "CAN",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    date: "Tomorrow",
    time: "21:00",
    tournament: "VNL 2026",
  },
];

export const PLAYERS: Player[] = [
  { id: "p1", name: "Matt Anderson", position: "Outside Hitter", team: "USA", country: "USA", number: 1, stats: { points: 312, aces: 35, blocks: 24, digs: 88, attacks: 253 } },
  { id: "p2", name: "Micah Christenson", position: "Setter", team: "USA", country: "USA", number: 11, stats: { points: 82, aces: 18, blocks: 6, digs: 112, attacks: 58 } },
  { id: "p3", name: "Taylor Averill", position: "Middle Blocker", team: "USA", country: "USA", number: 17, stats: { points: 178, aces: 12, blocks: 52, digs: 28, attacks: 114 } },
  { id: "p4", name: "Aaron Russell", position: "Outside Hitter", team: "USA", country: "USA", number: 2, stats: { points: 264, aces: 28, blocks: 20, digs: 76, attacks: 216 } },
  { id: "p5", name: "Maxwell Holt", position: "Middle Blocker", team: "USA", country: "USA", number: 18, stats: { points: 156, aces: 9, blocks: 48, digs: 22, attacks: 99 } },
  { id: "p6", name: "David Smith", position: "Opposite Hitter", team: "USA", country: "USA", number: 7, stats: { points: 241, aces: 19, blocks: 31, digs: 57, attacks: 191 } },
  { id: "p7", name: "Kawika Shoji", position: "Setter", team: "USA", country: "USA", number: 16, stats: { points: 71, aces: 14, blocks: 4, digs: 98, attacks: 53 } },
  { id: "p8", name: "Erik Shoji", position: "Libero", team: "USA", country: "USA", number: 21, stats: { points: 12, aces: 8, blocks: 0, digs: 198, attacks: 4 } },
];

export const NEWS: NewsItem[] = [
  { id: "n1", title: "Team USA Leads VNL Pool With Six Straight Wins", summary: "The US Men's National Team is on fire this VNL season, dominating Pool A and setting up a thrilling semifinal run as they chase their first VNL title.", category: "VNL 2026", date: "2 hours ago", readTime: 3 },
  { id: "n2", title: "Matt Anderson Named VNL Week 3 MVP", summary: "USA's powerhouse outside hitter recorded 98 points across three matches, earning his fourth career Player of the Week award and cementing his MVP status.", category: "Awards", date: "5 hours ago", readTime: 2 },
  { id: "n3", title: "Breaking Down USA's Semifinal Chances", summary: "With a perfect pool record, analysts break down Team USA's chances of claiming the VNL trophy and what it means for Olympic qualification.", category: "Analysis", date: "Yesterday", readTime: 5 },
  { id: "n4", title: "USA Sweeps Japan 3-0 in Dominant Display", summary: "Team USA showed their championship form with a dominant sweep of Japan, with Anderson and Russell combining for 58 points in the match.", category: "VNL 2026", date: "Yesterday", readTime: 4 },
  { id: "n5", title: "Erik Shoji's Record-Breaking Dig Performance", summary: "USA libero Erik Shoji set a new VNL record for most digs in a single match with 38, anchoring a phenomenal defensive performance against Brazil.", category: "Feature", date: "2 days ago", readTime: 6 },
  { id: "n6", title: "Christenson on USA's Championship Mindset", summary: "Setter Micah Christenson speaks about the team's unified goal heading into the VNL Finals and their preparation for the toughest competition ahead.", category: "Interview", date: "2 days ago", readTime: 4 },
];
