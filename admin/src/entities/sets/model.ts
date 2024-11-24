import { combine, createEvent, createStore, sample } from 'effector'

export interface Set {
  id: number
  name: string
  description: string
  bonus: number
  hourlyIncome: number
  cardReward?: number
  hourlyReward?: number
  minLevel: number
  minFriends: number
  activation: boolean
  experience: number
  reward: string
  chance: number
  type: 'resident' | 'city'
  category: string
  rating: number
  notes: string
  photo: string
  cards: number[]
}

const mockSet: Omit<Set, 'id'> = {
  name: 'Cool Set but with photo of card back',
  experience: 50,
  description: 'Cool Set with decent xp',
  rating: 64,
  notes: '',
  photo: '/blue-card-back.png',
  bonus: 1000,
  category: 'Animals',
  chance: 50,
  hourlyIncome: 1000,
  reward: 'cool nick color',
  type: 'city',
  cards: [0, 1, 2, 3],
  activation: true,
  minFriends: 10,
  minLevel: 12,
  cardReward: 2,
}

export const $allResidentSets = createStore<Set[]>(
  Array(10)
    .fill(null)
    .map((_, index) => ({ id: index, ...mockSet })),
)
export const $residentSetSearch = createStore('')
export const residentSetSearchChanged = createEvent<string>()
$residentSetSearch.on(residentSetSearchChanged, (_, value) => value)
export const $searhcResultResidentSets = createStore<Set[]>([])
export const residentSetSearched = createEvent()

sample({
  clock: residentSetSearched,
  source: combine([$allResidentSets, $residentSetSearch]),
  filter: ([all, search]) => all.length != 0 && search != '',
  fn: ([all, search]) => all.filter((reisdentSet) => reisdentSet.name.toLowerCase().includes(search.toLowerCase())),
  target: $searhcResultResidentSets,
})

sample({
  clock: residentSetSearched,
  source: combine([$allResidentSets, $residentSetSearch]),
  filter: ([all, search]) => all.length == 0 || search == '',
  fn: () => [],
  target: $searhcResultResidentSets,
})

export const $allCitySets = createStore<Set[]>(
  Array(10)
    .fill(null)
    .map((_, index) => ({ id: index, ...mockSet })),
)
export const $citySetSearch = createStore('')
export const citySetSearchChanged = createEvent<string>()
$citySetSearch.on(citySetSearchChanged, (_, value) => value)
export const $searchResultCitySets = createStore<Set[]>([])
export const citySetSearched = createEvent()

sample({
  clock: citySetSearched,
  source: combine([$allCitySets, $citySetSearch]),
  filter: ([all, search]) => all.length != 0 && search != '',
  fn: ([all, search]) => all.filter((citySet) => citySet.name.toLowerCase().includes(search.toLowerCase())),
  target: $searchResultCitySets,
})

sample({
  clock: citySetSearched,
  source: combine([$allCitySets, $citySetSearch]),
  filter: ([all, search]) => all.length == 0 || search == '',
  fn: () => [],
  target: $searchResultCitySets,
})
