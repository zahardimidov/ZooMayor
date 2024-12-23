import { combine, createEvent, createStore, sample } from 'effector'

export interface Card {
  id: number
  title: string
  description: string
  bonus: number
  bonus_per_hour?: number
  exp?: number
  has_bonus_per_hour: boolean
  hasExp: boolean
  chance: number
  type: 'citizen' | 'city'
  category: string
  rating: number
  note: string
  photo: string
}

const mockCard: Omit<Card, 'id'> = {
  title: 'Cool Card but with photo of card back',
  exp: 50,
  description: 'Cool card with decent xp',
  rating: 64,
  note: '',
  hasExp: true,
  has_bonus_per_hour: true,
  photo: '/blue-card-back.png',
  bonus: 1000,
  category: 'Animals',
  chance: 50,
  bonus_per_hour: 1000,
  type: 'city',
}

export const $allCities = createStore<Card[]>(
  Array(10)
    .fill(null)
    .map((_, index) => ({ id: index, ...mockCard })),
)

export const $citySearch = createStore('')
export const citySearchChanged = createEvent<string>()
$citySearch.on(citySearchChanged, (_, value) => value)
export const $searchResultCities = createStore<Card[]>([])
export const citySearched = createEvent()

sample({
  clock: citySearched,
  source: combine([$allCities, $citySearch]),
  filter: ([all, search]) => all.length != 0 && search != '',
  fn: ([all, search]) => all.filter((city) => city.title.toLowerCase().includes(search.toLowerCase())),
  target: $searchResultCities,
})

sample({
  clock: citySearched,
  source: combine([$allCities, $citySearch]),
  filter: ([all, search]) => all.length == 0 || search == '',
  fn: () => [],
  target: $searchResultCities,
})

export const $allResidents = createStore<Card[]>(
  Array(10)
    .fill(null)
    .map((_, index) => ({ id: index, ...mockCard })),
)

export const $residentSearch = createStore('')
export const residentSearchChanged = createEvent<string>()
$residentSearch.on(residentSearchChanged, (_, value) => value)
export const $searchResultResidents = createStore<Card[]>([])
export const residentSearched = createEvent()

sample({
  clock: residentSearched,
  source: combine([$allResidents, $residentSearch]),
  filter: ([all, search]) => all.length != 0 && search != '',
  fn: ([all, search]) => all.filter((resident) => resident.title.toLowerCase().includes(search.toLowerCase())),
  target: $searchResultResidents,
})

sample({
  clock: residentSearched,
  source: combine([$allResidents, $residentSearch]),
  filter: ([all, search]) => all.length == 0 || search == '',
  fn: () => [],
  target: $searchResultResidents,
})
