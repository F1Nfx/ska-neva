export type MatchStatus = 'finished' | 'upcoming'

export type Team = {
  name: string
  city: string
  short: string
  color: string
}

export type Match = {
  id: number
  tour: number
  tournament: string
  date: string
  time: string
  stadium: string
  isHome: boolean
  opponent: Team
  status: MatchStatus
  scoreUs?: number
  scoreThem?: number
}

export const ourTeam: Team = {
  name: 'СКА-Нева',
  city: 'Санкт-Петербург',
  short: 'СКА',
  color: 'from-ska-red to-ska-blue',
}

export const finishedMatches: Match[] = [
  { id: 10, tour: 10, tournament: 'ФНЛ-3', date: '11 октября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Волга-Тверь', city: 'Тверь', short: 'ВТ', color: 'from-slate-500 to-slate-700' }, status: 'finished', scoreUs: 2, scoreThem: 1 },
  { id: 9, tour: 9, tournament: 'ФНЛ-3', date: '4 октября 2026', time: '17:00', stadium: 'Стадион «Авангард», Выборг', isHome: false, opponent: { name: 'Замок Выборг', city: 'Выборг', short: 'ЗВ', color: 'from-indigo-700 to-indigo-900' }, status: 'finished', scoreUs: 0, scoreThem: 2 },
  { id: 8, tour: 8, tournament: 'ФНЛ-3', date: '27 сентября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Молот Нижний Тагил', city: 'Нижний Тагил', short: 'МН', color: 'from-red-700 to-red-900' }, status: 'finished', scoreUs: 2, scoreThem: 0 },
  { id: 7, tour: 7, tournament: 'ФНЛ-3', date: '20 сентября 2026', time: '16:00', stadium: 'Стадион «Торпедо», Владимир', isHome: false, opponent: { name: 'Лев Владимир', city: 'Владимир', short: 'ЛВ', color: 'from-slate-600 to-slate-800' }, status: 'finished', scoreUs: 1, scoreThem: 2 },
  { id: 6, tour: 6, tournament: 'ФНЛ-3', date: '13 сентября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Шторм', city: 'Санкт-Петербург', short: 'ШТ', color: 'from-sky-500 to-blue-700' }, status: 'finished', scoreUs: 1, scoreThem: 2 },
  { id: 5, tour: 5, tournament: 'ФНЛ-3', date: '6 сентября 2026', time: '19:00', stadium: 'Стадион «Балтика», Калининград', isHome: false, opponent: { name: 'Заря Балтийск', city: 'Балтийск', short: 'ЗБ', color: 'from-sky-700 to-blue-900' }, status: 'finished', scoreUs: 2, scoreThem: 2 },
  { id: 4, tour: 4, tournament: 'ФНЛ-3', date: '30 августа 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Волга-Кострома', city: 'Кострома', short: 'ВК', color: 'from-blue-800 to-blue-950' }, status: 'finished', scoreUs: 2, scoreThem: 0 },
  { id: 3, tour: 3, tournament: 'ФНЛ-3', date: '23 августа 2026', time: '17:00', stadium: 'Стадион «Волга», Тверь', isHome: false, opponent: { name: 'Волга-Тверь', city: 'Тверь', short: 'ВТ', color: 'from-slate-500 to-slate-700' }, status: 'finished', scoreUs: 2, scoreThem: 1 },
  { id: 2, tour: 2, tournament: 'ФНЛ-3', date: '16 августа 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Замок Выборг', city: 'Выборг', short: 'ЗВ', color: 'from-indigo-700 to-indigo-900' }, status: 'finished', scoreUs: 3, scoreThem: 1 },
  { id: 1, tour: 1, tournament: 'ФНЛ-3', date: '9 августа 2026', time: '17:00', stadium: 'Стадион «Локомотив», Москва', isHome: false, opponent: { name: 'Красноярск', city: 'Красноярск', short: 'КЯ', color: 'from-orange-600 to-orange-800' }, status: 'finished', scoreUs: 1, scoreThem: 1 },
]

export const upcomingMatches: Match[] = [
  { id: 11, tour: 11, tournament: 'ФНЛ-3', date: '17 октября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Волга-Кострома', city: 'Кострома', short: 'ВК', color: 'from-blue-800 to-blue-950' }, status: 'upcoming' },
  { id: 12, tour: 12, tournament: 'ФНЛ-3', date: '24 октября 2026', time: '17:00', stadium: 'Стадион «Балтика», Калининград', isHome: false, opponent: { name: 'Заря Балтийск', city: 'Балтийск', short: 'ЗБ', color: 'from-sky-700 to-blue-900' }, status: 'upcoming' },
  { id: 13, tour: 13, tournament: 'ФНЛ-3', date: '31 октября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Шторм', city: 'Санкт-Петербург', short: 'ШТ', color: 'from-sky-500 to-blue-700' }, status: 'upcoming' },
  { id: 14, tour: 14, tournament: 'ФНЛ-3', date: '7 ноября 2026', time: '16:00', stadium: 'Стадион «Торпедо», Владимир', isHome: false, opponent: { name: 'Лев Владимир', city: 'Владимир', short: 'ЛВ', color: 'from-slate-600 to-slate-800' }, status: 'upcoming' },
  { id: 15, tour: 15, tournament: 'ФНЛ-3', date: '14 ноября 2026', time: '18:00', stadium: '«Нева-Арена», Санкт-Петербург', isHome: true, opponent: { name: 'Барс Алания', city: 'Владикавказ', short: 'БА', color: 'from-yellow-600 to-yellow-800' }, status: 'upcoming' },
]

export const allMatches: Match[] = [...upcomingMatches, ...finishedMatches]

export function getMatchById(id: number): Match | undefined {
  return allMatches.find((m) => m.id === id)
}

// Хронология для матча (мок-данные)
export type MatchEvent = {
  minute: number
  type: 'goal' | 'yellow' | 'red' | 'sub'
  team: 'home' | 'away'
  player: string
  note?: string
}

export const matchEvents: Record<number, MatchEvent[]> = {
  10: [
    { minute: 34, type: 'goal', team: 'home', player: 'Никита Иванов', note: 'передача — Кузнецов' },
    { minute: 44, type: 'yellow', team: 'away', player: 'Кузнецов' },
    { minute: 58, type: 'goal', team: 'away', player: 'Кузнецов' },
    { minute: 67, type: 'yellow', team: 'home', player: 'Лукальдини' },
    { minute: 78, type: 'goal', team: 'home', player: 'Иван Петров', note: 'передача — Смирнов' },
    { minute: 90, type: 'yellow', team: 'away', player: 'Смирнов' },
  ],
  8: [
    { minute: 23, type: 'goal', team: 'home', player: 'Иван Петров', note: 'передача — Кузнецов' },
    { minute: 45, type: 'yellow', team: 'away', player: 'Соловьёв' },
    { minute: 61, type: 'goal', team: 'home', player: 'Иван Петров' },
    { minute: 75, type: 'sub', team: 'home', player: 'Снегов', note: 'вместо Соколова' },
  ],
}

// Статистика матча (мок-данные)
export type MatchStats = {
  possession: [number, number]
  shots: [number, number]
  shotsOnTarget: [number, number]
  corners: [number, number]
  fouls: [number, number]
  yellowCards: [number, number]
}

export const matchStats: Record<number, MatchStats> = {
  10: { possession: [58, 42], shots: [14, 9], shotsOnTarget: [7, 4], corners: [6, 3], fouls: [11, 14], yellowCards: [1, 2] },
  8: { possession: [62, 38], shots: [16, 6], shotsOnTarget: [8, 2], corners: [7, 2], fouls: [9, 12], yellowCards: [0, 1] },
}