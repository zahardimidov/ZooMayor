import { createEvent, restore } from 'effector'

export const resetEditCard = createEvent()

export const nameChanged = createEvent<string>()
export const $name = restore(nameChanged, '').reset(resetEditCard)

export const rewardChanged = createEvent<number>()
export const $reward = restore(rewardChanged, 0).reset(resetEditCard)

export const hasExpChanged = createEvent<boolean>()
export const $hasExp = restore(hasExpChanged, true).reset(resetEditCard)

export const expChanged = createEvent<number>()
export const $exp = restore(expChanged, 0).reset(hasExpChanged).reset(resetEditCard)

export const hasHourlyChanged = createEvent<boolean>()
export const $hasHourly = restore(hasHourlyChanged, true).reset(resetEditCard)

export const hourlyChanged = createEvent<number>()
export const $hourly = restore(hourlyChanged, 0).reset(hasHourlyChanged).reset(resetEditCard)

export const chanceChanged = createEvent<number>()
export const $chance = restore(chanceChanged, 0).reset(resetEditCard)

export const descriptionChanged = createEvent<string>()
export const $description = restore(descriptionChanged, '').reset(resetEditCard)

export const typeChanged = createEvent<'city' | 'citizen'>()
export const $type = restore(typeChanged, 'city').reset(resetEditCard)

export const notesChanged = createEvent<string>()
export const $notes = restore(notesChanged, '').reset(resetEditCard)

export const ratingChanged = createEvent<number>()
export const $rating = restore(ratingChanged, 0).reset(resetEditCard)
