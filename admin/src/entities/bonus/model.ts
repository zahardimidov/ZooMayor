import { createStore } from 'effector'

export interface Bonus {
  id: number
  name: string
  all: string
  used: string
  left: string
  creator: string
  date: string
  reward: string
  lasts: string
  note: string
  status: boolean
  hasLink: boolean
  link?: string
}

const mockBonus: Omit<Bonus, 'id'> = {
  name: 'Bonus 1',
  all: '100',
  creator: 'Admin Ivan',
  date: '14.08.2024',
  lasts: '30д',
  left: '30',
  note: 'Особых критериаев нет.',
  reward: 'Карта (Название карты и ID)/Монеты 1 000 000/Опыт 100 000',
  status: true,
  used: '70',
  hasLink: false,
}

export const $internalBonuses = createStore<Bonus[]>(
  Array(2)
    .fill(null)
    .map((_, index) => ({ id: index, ...mockBonus })),
)

export const $externalBonuses = createStore<Bonus[]>(
  Array(2)
    .fill(null)
    .map((_, index) => ({ id: index, ...mockBonus })),
)
