import { createEvent, createStore, restore } from 'effector'

export const resetEditSet = createEvent()

export const cardAdded = createEvent()
export const $cards = createStore([0, 1, 2, 3])
  .reset(resetEditSet)
  .on(cardAdded, (cards) => [...cards, cards.length])

export const nameChanged = createEvent<string>()
export const $name = restore(nameChanged, '').reset(resetEditSet)

export const rewardChanged = createEvent<number>()
export const $reward = restore(rewardChanged, 0).reset(resetEditSet)

export const expChanged = createEvent<number>()
export const $exp = restore(expChanged, 0).reset(resetEditSet)

export const hourlyChanged = createEvent<number>()
export const $hourly = restore(hourlyChanged, 0).reset(resetEditSet)

export const minFriendsChanged = createEvent<number>()
export const $minFriends = restore(minFriendsChanged, 0).reset(resetEditSet)

export const minLevelsChanged = createEvent<number>()
export const $minLevels = restore(minLevelsChanged, 0).reset(resetEditSet)

export const descriptionChanged = createEvent<string>()
export const $description = restore(descriptionChanged, '').reset(resetEditSet)

export const typeChanged = createEvent<'city' | 'resident'>()
export const $type = restore(typeChanged, 'city').reset(resetEditSet)

export const activationChanged = createEvent<boolean>()
export const $activation = restore(activationChanged, false).reset(resetEditSet)

export const notesChanged = createEvent<string>()
export const $notes = restore(notesChanged, '').reset(resetEditSet)
