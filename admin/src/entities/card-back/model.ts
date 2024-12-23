import { combine, createEvent, createStore, sample } from 'effector'

export interface CardBack {
  id: number
  name: string
  price: number
  experience?: number
  friendsCount?: number
  levelsCount?: number
  hasRequirements: boolean
  description: string
  rating: number
  notes: string
  photo: string
  codePurchase: boolean
  taskPurchase: boolean
  expReward: boolean
}

const mockCardBack: Omit<CardBack, 'id'> = {
  name: 'Blue Card Back',
  price: 100000,
  experience: 50,
  friendsCount: 3,
  levelsCount: 0,
  hasRequirements: true,
  description: 'Beautiful blue colored card back',
  rating: 64,
  notes: '',
  photo: '/blue-card-back.png',
  codePurchase: true,
  taskPurchase: false,
  expReward: true,
}

export const $allCardBacks = createStore<CardBack[]>(
  Array(10)
    .fill(null)
    .map((_, index) => ({ id: index, ...mockCardBack })),
)

export const $cardBacksSearch = createStore('')
export const cardBacksSearchChanged = createEvent<string>()
$cardBacksSearch.on(cardBacksSearchChanged, (_, value) => value)
export const $searchResultscardBacks = createStore<CardBack[]>([])
export const cardBacksSearched = createEvent()

sample({
  clock: cardBacksSearched,
  source: combine([$allCardBacks, $cardBacksSearch]),
  filter: ([all, search]) => all.length != 0 && search != '',
  fn: ([all, search]) => all.filter((card) => card.name.toLowerCase().includes(search.toLowerCase())),
  target: $searchResultscardBacks,
})

sample({
  clock: cardBacksSearched,
  source: combine([$allCardBacks, $cardBacksSearch]),
  filter: ([all, search]) => all.length == 0 || search == '',
  fn: () => [],
  target: $searchResultscardBacks,
})
