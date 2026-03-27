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
  { id: "1", name: "Brazil National", shortName: "BRA", country: "Brazil", wins: 22, losses: 3, setsWon: 68, setsLost: 18, points: 66, form: ["W","W","W","L","W"] },
  { id: "2", name: "Poland National", shortName: "POL", country: "Poland", wins: 20, losses: 5, setsWon: 64, setsLost: 22, points: 61, form: ["W","W","L","W","W"] },
  { id: "3", name: "France National", shortName: "FRA", country: "France", wins: 19, losses: 6, setsWon: 60, setsLost: 25, points: 58, form: ["L","W","W","W","W"] },
  { id: "4", name: "Italy National", shortName: "ITA", country: "Italy", wins: 18, losses: 7, setsWon: 58, setsLost: 28, points: 55, form: ["W","L","W","W","L"] },
  { id: "5", name: "USA National", shortName: "USA", country: "USA", wins: 17, losses: 8, setsWon: 55, setsLost: 30, points: 52, form: ["W","W","W","L","W"] },
  { id: "6", name: "Russia National", shortName: "RUS", country: "Russia", wins: 16, losses: 9, setsWon: 52, setsLost: 33, points: 49, form: ["L","L","W","W","W"] },
  { id: "7", name: "Japan National", shortName: "JPN", country: "Japan", wins: 15, losses: 10, setsWon: 49, setsLost: 36, points: 46, form: ["W","L","W","L","W"] },
  { id: "8", name: "Argentina National", shortName: "ARG", country: "Argentina", wins: 14, losses: 11, setsWon: 46, setsLost: 38, points: 43, form: ["L","W","L","W","W"] },
];

export const MATCHES: Match[] = [
  {
    id: "m1",
    homeTeam: "BRA",
    awayTeam: "POL",
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
    homeTeam: "FRA",
    awayTeam: "ITA",
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
    homeTeam: "ARG",
    awayTeam: "RUS",
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
    homeTeam: "BRA",
    awayTeam: "FRA",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    date: "Tomorrow",
    time: "18:00",
    tournament: "VNL 2026",
  },
  {
    id: "m6",
    homeTeam: "POL",
    awayTeam: "USA",
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    date: "Tomorrow",
    time: "21:00",
    tournament: "VNL 2026",
  },
];

export const PLAYERS: Player[] = [
  { id: "p1", name: "Lucão", position: "Middle Blocker", team: "BRA", country: "Brazil", number: 9, stats: { points: 198, aces: 22, blocks: 48, digs: 31, attacks: 128 } },
  { id: "p2", name: "Wilfredo Leon", position: "Outside Hitter", team: "POL", country: "Cuba/Poland", number: 9, stats: { points: 312, aces: 35, blocks: 28, digs: 87, attacks: 249 } },
  { id: "p3", name: "Earvin N'Gapeth", position: "Outside Hitter", team: "FRA", country: "France", number: 9, stats: { points: 287, aces: 31, blocks: 22, digs: 94, attacks: 234 } },
  { id: "p4", name: "Ivan Zaytsev", position: "Opposite Hitter", team: "ITA", country: "Italy", number: 9, stats: { points: 276, aces: 42, blocks: 19, digs: 65, attacks: 215 } },
  { id: "p5", name: "Matt Anderson", position: "Outside Hitter", team: "USA", country: "USA", number: 1, stats: { points: 264, aces: 28, blocks: 24, digs: 88, attacks: 212 } },
  { id: "p6", name: "Wallace de Souza", position: "Opposite Hitter", team: "BRA", country: "Brazil", number: 14, stats: { points: 241, aces: 19, blocks: 31, digs: 57, attacks: 191 } },
  { id: "p7", name: "Micah Christenson", position: "Setter", team: "USA", country: "USA", number: 11, stats: { points: 82, aces: 18, blocks: 6, digs: 112, attacks: 58 } },
  { id: "p8", name: "Yuki Ishikawa", position: "Outside Hitter", team: "JPN", country: "Japan", number: 11, stats: { points: 231, aces: 24, blocks: 18, digs: 92, attacks: 189 } },
];

export const NEWS: NewsItem[] = [
  { id: "n1", title: "Brazil Dominates Pool A After Six Straight Wins", summary: "The Brazilian national team showed their championship pedigree with a flawless run through Pool A, setting up a semifinal clash against France.", category: "VNL 2026", date: "2 hours ago", readTime: 3 },
  { id: "n2", title: "Wilfredo Leon Named MVP of Week 3", summary: "Poland's powerhouse outside hitter recorded 98 points across three matches, earning his fourth consecutive Player of the Week award.", category: "Awards", date: "5 hours ago", readTime: 2 },
  { id: "n3", title: "VNL Finals Draw: A Preview of What's to Come", summary: "With semifinals set and four nations remaining, analysts break down each team's chances of claiming the VNL trophy.", category: "Analysis", date: "Yesterday", readTime: 5 },
  { id: "n4", title: "Italy's Comeback Against Serbia in Five Sets", summary: "In one of the most thrilling matches of the tournament, Italy rallied from two sets down to clinch a vital 3-2 victory.", category: "VNL 2026", date: "Yesterday", readTime: 4 },
  { id: "n5", title: "Japan's Young Stars Making Their Mark Internationally", summary: "A new generation of Japanese talent is taking the volleyball world by storm, with Ishikawa leading the charge for a strong VNL finish.", category: "Feature", date: "2 days ago", readTime: 6 },
  { id: "n6", title: "N'Gapeth Injury Update: France Hopeful For Semis", summary: "French star Earvin N'Gapeth was seen training lightly after missing the last group match, boosting France's semifinals hopes.", category: "Injury", date: "2 days ago", readTime: 2 },
];
