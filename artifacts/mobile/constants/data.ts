export type Discipline =
  | "mens"
  | "womens"
  | "beach"
  | "sitting"
  | "ncaa_mens"
  | "ncaa_womens";

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  mens: "Men's",
  womens: "Women's",
  beach: "Beach",
  sitting: "Sitting",
  ncaa_mens: "NCAA Men's",
  ncaa_womens: "NCAA Women's",
};

export const DISCIPLINE_SHORT: Record<Discipline, string> = {
  mens: "Men's",
  womens: "Women's",
  beach: "Beach",
  sitting: "Sitting",
  ncaa_mens: "NCAA ♂",
  ncaa_womens: "NCAA ♀",
};

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
  discipline: Discipline;
  conference?: string;
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
  discipline: Discipline;
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
  discipline: Discipline;
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
  discipline?: Discipline;
};

// ─── MEN'S INTERNATIONAL (VNL) ────────────────────────────────────────────────
export const MENS_TEAMS: Team[] = [
  { id: "m1", name: "USA", shortName: "USA", country: "United States", wins: 22, losses: 3, setsWon: 68, setsLost: 18, points: 66, form: ["W","W","W","L","W"], discipline: "mens", isFavorite: true },
  { id: "m2", name: "Brazil", shortName: "BRA", country: "Brazil", wins: 20, losses: 5, setsWon: 64, setsLost: 22, points: 61, form: ["W","W","L","W","W"], discipline: "mens" },
  { id: "m3", name: "Poland", shortName: "POL", country: "Poland", wins: 19, losses: 6, setsWon: 60, setsLost: 25, points: 58, form: ["L","W","W","W","W"], discipline: "mens" },
  { id: "m4", name: "France", shortName: "FRA", country: "France", wins: 18, losses: 7, setsWon: 58, setsLost: 28, points: 55, form: ["W","L","W","W","L"], discipline: "mens" },
  { id: "m5", name: "Italy", shortName: "ITA", country: "Italy", wins: 17, losses: 8, setsWon: 55, setsLost: 30, points: 52, form: ["W","W","W","L","W"], discipline: "mens" },
  { id: "m6", name: "Japan", shortName: "JPN", country: "Japan", wins: 16, losses: 9, setsWon: 52, setsLost: 33, points: 49, form: ["L","L","W","W","W"], discipline: "mens" },
  { id: "m7", name: "Argentina", shortName: "ARG", country: "Argentina", wins: 15, losses: 10, setsWon: 49, setsLost: 36, points: 46, form: ["W","L","W","L","W"], discipline: "mens" },
  { id: "m8", name: "Canada", shortName: "CAN", country: "Canada", wins: 14, losses: 11, setsWon: 46, setsLost: 38, points: 43, form: ["L","W","L","W","W"], discipline: "mens" },
];

// ─── WOMEN'S INTERNATIONAL (VNL) ──────────────────────────────────────────────
export const WOMENS_TEAMS: Team[] = [
  { id: "w1", name: "USA", shortName: "USA", country: "United States", wins: 23, losses: 2, setsWon: 70, setsLost: 14, points: 68, form: ["W","W","W","W","W"], discipline: "womens", isFavorite: true },
  { id: "w2", name: "Brazil", shortName: "BRA", country: "Brazil", wins: 21, losses: 4, setsWon: 65, setsLost: 20, points: 63, form: ["W","L","W","W","W"], discipline: "womens" },
  { id: "w3", name: "Turkey", shortName: "TUR", country: "Turkey", wins: 20, losses: 5, setsWon: 62, setsLost: 23, points: 61, form: ["W","W","W","L","W"], discipline: "womens" },
  { id: "w4", name: "Italy", shortName: "ITA", country: "Italy", wins: 19, losses: 6, setsWon: 59, setsLost: 26, points: 58, form: ["L","W","W","W","W"], discipline: "womens" },
  { id: "w5", name: "Serbia", shortName: "SRB", country: "Serbia", wins: 18, losses: 7, setsWon: 56, setsLost: 29, points: 55, form: ["W","W","L","W","W"], discipline: "womens" },
  { id: "w6", name: "China", shortName: "CHN", country: "China", wins: 17, losses: 8, setsWon: 53, setsLost: 32, points: 52, form: ["W","L","W","W","L"], discipline: "womens" },
  { id: "w7", name: "Japan", shortName: "JPN", country: "Japan", wins: 15, losses: 10, setsWon: 48, setsLost: 36, points: 46, form: ["L","W","L","W","W"], discipline: "womens" },
  { id: "w8", name: "Poland", shortName: "POL", country: "Poland", wins: 13, losses: 12, setsWon: 44, setsLost: 40, points: 40, form: ["L","L","W","W","L"], discipline: "womens" },
];

// ─── BEACH VOLLEYBALL ─────────────────────────────────────────────────────────
export const BEACH_TEAMS: Team[] = [
  { id: "b1", name: "Heidrich / Vergé-Dépré", shortName: "SUI", country: "Switzerland", wins: 18, losses: 2, setsWon: 38, setsLost: 6, points: 52, form: ["W","W","W","W","W"], discipline: "beach" },
  { id: "b2", name: "Herrera / Gavira", shortName: "ESP", country: "Spain", wins: 16, losses: 4, setsWon: 34, setsLost: 10, points: 47, form: ["W","W","L","W","W"], discipline: "beach" },
  { id: "b3", name: "Ross / Klineman", shortName: "USA", country: "United States", wins: 15, losses: 5, setsWon: 32, setsLost: 12, points: 44, form: ["W","W","W","L","W"], discipline: "beach", isFavorite: true },
  { id: "b4", name: "Mol / Sørum", shortName: "NOR", country: "Norway", wins: 14, losses: 6, setsWon: 30, setsLost: 14, points: 41, form: ["L","W","W","W","W"], discipline: "beach" },
  { id: "b5", name: "Cherif / Ahmed", shortName: "QAT", country: "Qatar", wins: 12, losses: 8, setsWon: 26, setsLost: 18, points: 36, form: ["W","L","W","L","W"], discipline: "beach" },
  { id: "b6", name: "Krasilnikov / Stoyanovskiy", shortName: "RUS", country: "Russia", wins: 11, losses: 9, setsWon: 24, setsLost: 20, points: 33, form: ["L","W","L","W","W"], discipline: "beach" },
  { id: "b7", name: "Ahman / Hellvig", shortName: "SWE", country: "Sweden", wins: 10, losses: 10, setsWon: 22, setsLost: 22, points: 30, form: ["W","L","W","L","L"], discipline: "beach" },
  { id: "b8", name: "Vieira / Á. Pereira", shortName: "BRA", country: "Brazil", wins: 9, losses: 11, setsWon: 20, setsLost: 24, points: 27, form: ["L","L","W","W","L"], discipline: "beach" },
];

// ─── SITTING VOLLEYBALL ───────────────────────────────────────────────────────
export const SITTING_TEAMS: Team[] = [
  { id: "s1", name: "USA", shortName: "USA", country: "United States", wins: 20, losses: 1, setsWon: 62, setsLost: 8, points: 60, form: ["W","W","W","W","W"], discipline: "sitting", isFavorite: true },
  { id: "s2", name: "Iran", shortName: "IRI", country: "Iran", wins: 18, losses: 3, setsWon: 56, setsLost: 14, points: 55, form: ["W","W","L","W","W"], discipline: "sitting" },
  { id: "s3", name: "Bosnia", shortName: "BIH", country: "Bosnia & Herzegovina", wins: 17, losses: 4, setsWon: 53, setsLost: 17, points: 52, form: ["W","W","W","L","W"], discipline: "sitting" },
  { id: "s4", name: "China", shortName: "CHN", country: "China", wins: 16, losses: 5, setsWon: 50, setsLost: 20, points: 49, form: ["W","L","W","W","W"], discipline: "sitting" },
  { id: "s5", name: "Germany", shortName: "GER", country: "Germany", wins: 12, losses: 9, setsWon: 40, setsLost: 30, points: 37, form: ["L","W","W","L","W"], discipline: "sitting" },
  { id: "s6", name: "Brazil", shortName: "BRA", country: "Brazil", wins: 10, losses: 11, setsWon: 34, setsLost: 36, points: 31, form: ["W","L","L","W","L"], discipline: "sitting" },
];

// ─── NCAA WOMEN'S ─────────────────────────────────────────────────────────────
export const NCAA_WOMENS_TEAMS: Team[] = [
  { id: "nw1", name: "Nebraska Cornhuskers", shortName: "NEB", country: "Big Ten", wins: 28, losses: 3, setsWon: 86, setsLost: 24, points: 83, form: ["W","W","W","W","L"], discipline: "ncaa_womens", conference: "Big Ten" },
  { id: "nw2", name: "Texas Longhorns", shortName: "TEX", country: "Big 12", wins: 27, losses: 4, setsWon: 83, setsLost: 27, points: 80, form: ["W","W","L","W","W"], discipline: "ncaa_womens", conference: "Big 12" },
  { id: "nw3", name: "Stanford Cardinal", shortName: "STAN", country: "ACC", wins: 26, losses: 5, setsWon: 80, setsLost: 30, points: 77, form: ["L","W","W","W","W"], discipline: "ncaa_womens", conference: "ACC" },
  { id: "nw4", name: "Kentucky Wildcats", shortName: "UK", country: "SEC", wins: 25, losses: 6, setsWon: 77, setsLost: 33, points: 74, form: ["W","W","W","L","W"], discipline: "ncaa_womens", conference: "SEC" },
  { id: "nw5", name: "Pittsburgh Panthers", shortName: "PITT", country: "ACC", wins: 24, losses: 7, setsWon: 74, setsLost: 36, points: 71, form: ["W","L","W","W","W"], discipline: "ncaa_womens", conference: "ACC" },
  { id: "nw6", name: "Wisconsin Badgers", shortName: "WIS", country: "Big Ten", wins: 23, losses: 8, setsWon: 71, setsLost: 39, points: 68, form: ["W","W","L","W","L"], discipline: "ncaa_womens", conference: "Big Ten" },
  { id: "nw7", name: "Penn State Nittany Lions", shortName: "PSU", country: "Big Ten", wins: 22, losses: 9, setsWon: 68, setsLost: 42, points: 65, form: ["L","W","W","W","W"], discipline: "ncaa_womens", conference: "Big Ten" },
  { id: "nw8", name: "UCLA Bruins", shortName: "UCLA", country: "Big Ten", wins: 21, losses: 10, setsWon: 65, setsLost: 45, points: 62, form: ["W","W","W","L","L"], discipline: "ncaa_womens", conference: "Big Ten" },
  { id: "nw9", name: "Louisville Cardinals", shortName: "LOU", country: "ACC", wins: 20, losses: 11, setsWon: 62, setsLost: 48, points: 59, form: ["W","L","W","L","W"], discipline: "ncaa_womens", conference: "ACC" },
  { id: "nw10", name: "Ohio State Buckeyes", shortName: "OSU", country: "Big Ten", wins: 19, losses: 12, setsWon: 59, setsLost: 51, points: 56, form: ["L","W","W","L","W"], discipline: "ncaa_womens", conference: "Big Ten" },
];

// ─── NCAA MEN'S ───────────────────────────────────────────────────────────────
export const NCAA_MENS_TEAMS: Team[] = [
  { id: "nm1", name: "BYU Cougars", shortName: "BYU", country: "MPSF", wins: 26, losses: 2, setsWon: 80, setsLost: 18, points: 77, form: ["W","W","W","W","W"], discipline: "ncaa_mens", conference: "MPSF" },
  { id: "nm2", name: "Long Beach State 49ers", shortName: "LBSU", country: "Big West", wins: 24, losses: 4, setsWon: 74, setsLost: 24, points: 71, form: ["W","W","L","W","W"], discipline: "ncaa_mens", conference: "Big West" },
  { id: "nm3", name: "UCLA Bruins", shortName: "UCLA", country: "MPSF", wins: 22, losses: 6, setsWon: 68, setsLost: 30, points: 65, form: ["W","L","W","W","W"], discipline: "ncaa_mens", conference: "MPSF" },
  { id: "nm4", name: "Hawaii Warriors", shortName: "HAW", country: "Big West", wins: 21, losses: 7, setsWon: 65, setsLost: 33, points: 62, form: ["L","W","W","W","L"], discipline: "ncaa_mens", conference: "Big West" },
  { id: "nm5", name: "Stanford Cardinal", shortName: "STAN", country: "MPSF", wins: 20, losses: 8, setsWon: 62, setsLost: 36, points: 59, form: ["W","W","W","L","W"], discipline: "ncaa_mens", conference: "MPSF" },
  { id: "nm6", name: "Pepperdine Waves", shortName: "PEPP", country: "MPSF", wins: 18, losses: 10, setsWon: 57, setsLost: 42, points: 54, form: ["W","L","W","L","W"], discipline: "ncaa_mens", conference: "MPSF" },
  { id: "nm7", name: "Penn State Nittany Lions", shortName: "PSU", country: "EIVA", wins: 17, losses: 11, setsWon: 54, setsLost: 45, points: 51, form: ["L","W","W","L","W"], discipline: "ncaa_mens", conference: "EIVA" },
  { id: "nm8", name: "Grand Canyon Antelopes", shortName: "GCU", country: "Big West", wins: 15, losses: 13, setsWon: 49, setsLost: 51, points: 45, form: ["W","L","L","W","W"], discipline: "ncaa_mens", conference: "Big West" },
];

// Backwards-compatible aggregate export (Men's VNL for existing code)
export const TEAMS: Team[] = MENS_TEAMS;

export const ALL_TEAMS: Team[] = [
  ...MENS_TEAMS,
  ...WOMENS_TEAMS,
  ...BEACH_TEAMS,
  ...SITTING_TEAMS,
  ...NCAA_WOMENS_TEAMS,
  ...NCAA_MENS_TEAMS,
];

// ─── MATCHES ──────────────────────────────────────────────────────────────────
export const MATCHES: Match[] = [
  // Men's
  { id: "mm1", homeTeam: "USA", awayTeam: "BRA", homeScore: 2, awayScore: 1, status: "live", date: "Today", time: "LIVE", tournament: "VNL 2026 Men's", discipline: "mens", sets: [{ home: 25, away: 22 }, { home: 23, away: 25 }, { home: 18, away: 15 }], currentSet: 3 },
  { id: "mm2", homeTeam: "USA", awayTeam: "FRA", homeScore: 0, awayScore: 0, status: "upcoming", date: "Today", time: "20:00", tournament: "VNL 2026 Men's", discipline: "mens" },
  { id: "mm3", homeTeam: "USA", awayTeam: "JPN", homeScore: 3, awayScore: 0, status: "finished", date: "Yesterday", time: "Final", tournament: "VNL 2026 Men's", discipline: "mens", sets: [{ home: 25, away: 20 }, { home: 25, away: 18 }, { home: 25, away: 22 }] },
  { id: "mm4", homeTeam: "POL", awayTeam: "ITA", homeScore: 1, awayScore: 3, status: "finished", date: "Yesterday", time: "Final", tournament: "VNL 2026 Men's", discipline: "mens", sets: [{ home: 22, away: 25 }, { home: 25, away: 23 }, { home: 18, away: 25 }, { home: 20, away: 25 }] },
  { id: "mm5", homeTeam: "USA", awayTeam: "POL", homeScore: 0, awayScore: 0, status: "upcoming", date: "Tomorrow", time: "18:00", tournament: "VNL 2026 Men's", discipline: "mens" },
  // Women's
  { id: "wm1", homeTeam: "USA", awayTeam: "TUR", homeScore: 1, awayScore: 0, status: "live", date: "Today", time: "LIVE", tournament: "VNL 2026 Women's", discipline: "womens", sets: [{ home: 25, away: 21 }], currentSet: 2 },
  { id: "wm2", homeTeam: "BRA", awayTeam: "ITA", homeScore: 3, awayScore: 1, status: "finished", date: "Yesterday", time: "Final", tournament: "VNL 2026 Women's", discipline: "womens", sets: [{ home: 25, away: 20 }, { home: 23, away: 25 }, { home: 25, away: 18 }, { home: 25, away: 22 }] },
  { id: "wm3", homeTeam: "SRB", awayTeam: "CHN", homeScore: 0, awayScore: 0, status: "upcoming", date: "Tomorrow", time: "16:00", tournament: "VNL 2026 Women's", discipline: "womens" },
  // Beach
  { id: "bm1", homeTeam: "Ross / Klineman", awayTeam: "Herrera / Gavira", homeScore: 2, awayScore: 0, status: "finished", date: "Yesterday", time: "Final", tournament: "FIVB Beach Pro Tour", discipline: "beach", sets: [{ home: 21, away: 17 }, { home: 21, away: 18 }] },
  { id: "bm2", homeTeam: "Mol / Sørum", awayTeam: "Ahman / Hellvig", homeScore: 0, awayScore: 0, status: "upcoming", date: "Tomorrow", time: "14:00", tournament: "FIVB Beach Pro Tour", discipline: "beach" },
  // Sitting
  { id: "sm1", homeTeam: "USA", awayTeam: "IRI", homeScore: 3, awayScore: 0, status: "finished", date: "Yesterday", time: "Final", tournament: "World Para Volleyball", discipline: "sitting", sets: [{ home: 25, away: 20 }, { home: 25, away: 18 }, { home: 25, away: 16 }] },
  { id: "sm2", homeTeam: "USA", awayTeam: "BIH", homeScore: 0, awayScore: 0, status: "upcoming", date: "Tomorrow", time: "19:00", tournament: "World Para Volleyball", discipline: "sitting" },
  // NCAA Women's
  { id: "nwm1", homeTeam: "Nebraska", awayTeam: "Wisconsin", homeScore: 3, awayScore: 1, status: "finished", date: "Yesterday", time: "Final", tournament: "Big Ten Conference", discipline: "ncaa_womens", sets: [{ home: 25, away: 22 }, { home: 22, away: 25 }, { home: 25, away: 20 }, { home: 25, away: 18 }] },
  { id: "nwm2", homeTeam: "Texas", awayTeam: "Kentucky", homeScore: 0, awayScore: 0, status: "upcoming", date: "Tomorrow", time: "19:00", tournament: "Big 12 / SEC", discipline: "ncaa_womens" },
  { id: "nwm3", homeTeam: "Stanford", awayTeam: "Pittsburgh", homeScore: 2, awayScore: 1, status: "live", date: "Today", time: "LIVE", tournament: "ACC Championship", discipline: "ncaa_womens", sets: [{ home: 25, away: 22 }, { home: 22, away: 25 }, { home: 20, away: 18 }], currentSet: 3 },
  // NCAA Men's
  { id: "nmm1", homeTeam: "BYU", awayTeam: "Long Beach St", homeScore: 3, awayScore: 0, status: "finished", date: "Yesterday", time: "Final", tournament: "MPSF Conference", discipline: "ncaa_mens", sets: [{ home: 25, away: 21 }, { home: 25, away: 19 }, { home: 25, away: 23 }] },
  { id: "nmm2", homeTeam: "UCLA", awayTeam: "Hawaii", homeScore: 0, awayScore: 0, status: "upcoming", date: "Tomorrow", time: "21:00", tournament: "MPSF Conference", discipline: "ncaa_mens" },
];

// ─── PLAYERS ──────────────────────────────────────────────────────────────────
export const PLAYERS: Player[] = [
  // Men's
  { id: "p1", name: "Matt Anderson", position: "Outside Hitter", team: "USA", country: "USA", number: 1, discipline: "mens", stats: { points: 312, aces: 35, blocks: 24, digs: 88, attacks: 253 } },
  { id: "p2", name: "Micah Christenson", position: "Setter", team: "USA", country: "USA", number: 11, discipline: "mens", stats: { points: 82, aces: 18, blocks: 6, digs: 112, attacks: 58 } },
  { id: "p3", name: "Taylor Averill", position: "Middle Blocker", team: "USA", country: "USA", number: 17, discipline: "mens", stats: { points: 178, aces: 12, blocks: 52, digs: 28, attacks: 114 } },
  { id: "p4", name: "Aaron Russell", position: "Outside Hitter", team: "USA", country: "USA", number: 2, discipline: "mens", stats: { points: 264, aces: 28, blocks: 20, digs: 76, attacks: 216 } },
  // Women's
  { id: "p5", name: "Jordan Larson", position: "Outside Hitter", team: "USA", country: "USA", number: 10, discipline: "womens", stats: { points: 298, aces: 32, blocks: 28, digs: 95, attacks: 238 } },
  { id: "p6", name: "Jordyn Poulter", position: "Setter", team: "USA", country: "USA", number: 9, discipline: "womens", stats: { points: 76, aces: 22, blocks: 8, digs: 118, attacks: 46 } },
  { id: "p7", name: "Foluke Akinradewo", position: "Middle Blocker", team: "USA", country: "USA", number: 16, discipline: "womens", stats: { points: 192, aces: 14, blocks: 62, digs: 30, attacks: 116 } },
  { id: "p8", name: "Kim Hill", position: "Outside Hitter", team: "USA", country: "USA", number: 7, discipline: "womens", stats: { points: 276, aces: 26, blocks: 18, digs: 82, attacks: 232 } },
  // Beach
  { id: "p9", name: "April Ross", position: "Defender", team: "USA", country: "USA", number: 0, discipline: "beach", stats: { points: 188, aces: 8, blocks: 42, digs: 220, attacks: 138 } },
  { id: "p10", name: "Alix Klineman", position: "Blocker", team: "USA", country: "USA", number: 0, discipline: "beach", stats: { points: 196, aces: 12, blocks: 58, digs: 180, attacks: 126 } },
  // Sitting
  { id: "p11", name: "Oktay Durmaz", position: "Outside Hitter", team: "USA", country: "USA", number: 8, discipline: "sitting", stats: { points: 224, aces: 20, blocks: 32, digs: 72, attacks: 172 } },
  { id: "p12", name: "Justin Davis", position: "Setter", team: "USA", country: "USA", number: 5, discipline: "sitting", stats: { points: 68, aces: 14, blocks: 4, digs: 102, attacks: 50 } },
  // NCAA Women's
  { id: "p13", name: "Lexi Sun", position: "Outside Hitter", team: "Nebraska", country: "USA", number: 6, discipline: "ncaa_womens", stats: { points: 412, aces: 44, blocks: 28, digs: 180, attacks: 340 } },
  { id: "p14", name: "Madisen Skinner", position: "Outside Hitter", team: "Texas", country: "USA", number: 10, discipline: "ncaa_womens", stats: { points: 398, aces: 38, blocks: 24, digs: 156, attacks: 336 } },
  { id: "p15", name: "Kathryn Plummer", position: "Outside Hitter", team: "Stanford", country: "USA", number: 14, discipline: "ncaa_womens", stats: { points: 376, aces: 34, blocks: 30, digs: 142, attacks: 312 } },
  // NCAA Men's
  { id: "p16", name: "Gabi García", position: "Outside Hitter", team: "BYU", country: "BRA", number: 7, discipline: "ncaa_mens", stats: { points: 384, aces: 30, blocks: 26, digs: 120, attacks: 328 } },
  { id: "p17", name: "Spencer Wickens", position: "Middle Blocker", team: "Long Beach St", country: "USA", number: 3, discipline: "ncaa_mens", stats: { points: 298, aces: 16, blocks: 78, digs: 44, attacks: 204 } },
];

// ─── OLYMPIC DATA ─────────────────────────────────────────────────────────────
export type OlympicTeam = {
  id: string;
  shortName: string;
  country: string;
  rankingPoints: number;
  rank: number;
  qualificationStatus: "qualified" | "contender" | "at_risk";
  qualificationPath?: string;
  isHost?: boolean;
};

export type OlympicQualPath = {
  id: string;
  name: string;
  spots: number;
  description: string;
  deadline: string;
  teamsQualified: string[];
  isComplete: boolean;
};

export const OLYMPIC_TEAMS: OlympicTeam[] = [
  { id: "o1", shortName: "USA", country: "United States", rankingPoints: 412, rank: 1, qualificationStatus: "qualified", qualificationPath: "Host Nation", isHost: true },
  { id: "o2", shortName: "POL", country: "Poland", rankingPoints: 389, rank: 2, qualificationStatus: "qualified", qualificationPath: "FIVB Ranking" },
  { id: "o3", shortName: "BRA", country: "Brazil", rankingPoints: 374, rank: 3, qualificationStatus: "qualified", qualificationPath: "South American Championship" },
  { id: "o4", shortName: "FRA", country: "France", rankingPoints: 361, rank: 4, qualificationStatus: "qualified", qualificationPath: "FIVB Ranking" },
  { id: "o5", shortName: "ITA", country: "Italy", rankingPoints: 348, rank: 5, qualificationStatus: "contender", qualificationPath: "OQT Pathway" },
  { id: "o6", shortName: "SLO", country: "Slovenia", rankingPoints: 320, rank: 6, qualificationStatus: "contender", qualificationPath: "OQT Pathway" },
  { id: "o7", shortName: "JPN", country: "Japan", rankingPoints: 307, rank: 7, qualificationStatus: "qualified", qualificationPath: "Asian Championship" },
  { id: "o8", shortName: "CUB", country: "Cuba", rankingPoints: 294, rank: 8, qualificationStatus: "contender", qualificationPath: "OQT Pathway" },
  { id: "o9", shortName: "ARG", country: "Argentina", rankingPoints: 278, rank: 9, qualificationStatus: "at_risk", qualificationPath: "OQT Pathway" },
  { id: "o10", shortName: "GER", country: "Germany", rankingPoints: 265, rank: 10, qualificationStatus: "at_risk", qualificationPath: "OQT Pathway" },
  { id: "o11", shortName: "CAN", country: "Canada", rankingPoints: 251, rank: 11, qualificationStatus: "at_risk", qualificationPath: "OQT Pathway" },
  { id: "o12", shortName: "TUN", country: "Tunisia", rankingPoints: 198, rank: 12, qualificationStatus: "at_risk", qualificationPath: "African Championship" },
];

export const OLYMPIC_PATHS: OlympicQualPath[] = [
  { id: "q1", name: "Host Nation", spots: 1, description: "USA qualifies automatically as the host nation for the 2028 Los Angeles Olympics.", deadline: "Confirmed", teamsQualified: ["USA"], isComplete: true },
  { id: "q2", name: "Continental Championships", spots: 5, description: "One team per continent qualifies via their continental championship (CEV, CSV, AVC, NORCECA, CAVB).", deadline: "Jun 2027", teamsQualified: ["BRA", "JPN"], isComplete: false },
  { id: "q3", name: "FIVB World Ranking", spots: 3, description: "Top-ranked teams not yet qualified through other pathways receive automatic berths based on FIVB rankings after VNL 2027.", deadline: "Aug 2027", teamsQualified: ["POL", "FRA"], isComplete: false },
  { id: "q4", name: "Olympic Qualification Tournaments", spots: 3, description: "Three OQT events held globally, each awarding one Olympic berth to the tournament winner.", deadline: "Sep 2027", teamsQualified: [], isComplete: false },
];

// ─── NEWS ─────────────────────────────────────────────────────────────────────
export const NEWS: NewsItem[] = [
  { id: "n1", title: "Team USA Men Lead VNL Pool With Six Straight Wins", summary: "The US Men's National Team is on fire this VNL season, dominating Pool A and setting up a thrilling semifinal run.", category: "VNL 2026", date: "2 hours ago", readTime: 3, discipline: "mens" },
  { id: "n2", title: "USA Women Unbeaten After Five VNL Weekends", summary: "The US Women's squad has been dominant this VNL season, going 23-2 and looking like strong gold medal favorites.", category: "VNL 2026", date: "3 hours ago", readTime: 2, discipline: "womens" },
  { id: "n3", title: "Ross & Klineman Win Beach Pro Tour Gold in Gstaad", summary: "The American beach duo dominated the Gstaad event, capping off a perfect 2-0 set scoreline in the final.", category: "Beach Tour", date: "5 hours ago", readTime: 2, discipline: "beach" },
  { id: "n4", title: "Nebraska Extends Win Streak to 12 in Big Ten Play", summary: "The Cornhuskers continue their dominant stretch, sweeping Wisconsin in a statement Big Ten road win.", category: "NCAA", date: "Yesterday", readTime: 3, discipline: "ncaa_womens" },
  { id: "n5", title: "USA Sitting Volleyball Sweeps Iran at World Para Championships", summary: "The US Paralympic team showed dominance with a clean 3-0 sweep, reaffirming their world #1 ranking.", category: "Para Volleyball", date: "Yesterday", readTime: 4, discipline: "sitting" },
  { id: "n6", title: "BYU Men's Volleyball Locks Up MPSF Regular Season Title", summary: "The Cougars clinch the conference crown early, heading into postseason play as the nation's top-ranked program.", category: "NCAA", date: "2 days ago", readTime: 3, discipline: "ncaa_mens" },
  { id: "n7", title: "Matt Anderson Named VNL Week 3 MVP", summary: "USA's powerhouse outside hitter recorded 98 points across three matches, earning his fourth career Player of the Week award.", category: "Awards", date: "2 days ago", readTime: 2, discipline: "mens" },
];
