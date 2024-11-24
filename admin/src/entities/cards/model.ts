import { combine, createEvent, createStore, sample } from 'effector'

export interface Card {
  id: number
  name: string
  description: string
  bonus: number
  hourlyIncome?: number
  experience?: number
  hasHourlyIncome: boolean
  hasExp: boolean
  reward: string
  chance: number
  type: 'resident' | 'city'
  category: string
  rating: number
  notes: string
  photo: string
}

const mockCard: Omit<Card, 'id'> = {
  name: 'Cool Card but with photo of card back',
  experience: 50,
  description: 'Cool card with decent xp',
  rating: 64,
  notes: '',
  hasExp: true,
  hasHourlyIncome: true,
  photo: '/blue-card-back.png',
  bonus: 1000,
  category: 'Animals',
  chance: 50,
  hourlyIncome: 1000,
  reward: 'cool nick color',
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
  fn: ([all, search]) => all.filter((city) => city.name.toLowerCase().includes(search.toLowerCase())),
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
  fn: ([all, search]) => all.filter((resident) => resident.name.toLowerCase().includes(search.toLowerCase())),
  target: $searchResultResidents,
})

sample({
  clock: residentSearched,
  source: combine([$allResidents, $residentSearch]),
  filter: ([all, search]) => all.length == 0 || search == '',
  fn: () => [],
  target: $searchResultResidents,
})
