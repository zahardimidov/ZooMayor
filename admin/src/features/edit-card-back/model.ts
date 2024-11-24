import { createEvent, restore } from 'effector'

export const resetEditCardBackFields = createEvent()

export const nameChanged = createEvent<string>()
export const $name = restore(nameChanged, '').reset(resetEditCardBackFields)

export const priceChanged = createEvent<number>()
export const $price = restore(priceChanged, 0)

export const expRewardChanged = createEvent<boolean>()
export const $expReward = restore(expRewardChanged, true).reset(resetEditCardBackFields)

export const experienceChanged = createEvent<number>()
export const $experience = restore(experienceChanged, 0)
  .on(expRewardChanged, () => 0)
  .reset(resetEditCardBackFields)

export const hasRequirementsChanged = createEvent<boolean>()
export const $hasRequirements = restore(hasRequirementsChanged, true)

export const friendsCountChanged = createEvent<number>()
export const $friendsCount = restore(friendsCountChanged, 0)
  .on(hasRequirementsChanged, () => 0)
  .reset(resetEditCardBackFields)

export const levelsCountChanged = createEvent<number>()
export const $levelsCount = restore(levelsCountChanged, 0)
  .on(hasRequirementsChanged, () => 0)
  .reset(resetEditCardBackFields)

export const descriptionChanged = createEvent<string>()
export const $descripition = restore(descriptionChanged, '').reset(resetEditCardBackFields)

export const ratingChanged = createEvent<number>()
export const $rating = restore(ratingChanged, 0).reset(resetEditCardBackFields)

export const notesChanged = createEvent<string>()
export const $notes = restore(notesChanged, '').reset(resetEditCardBackFields)
