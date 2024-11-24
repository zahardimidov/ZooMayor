import { createEvent, restore } from 'effector'

export const resetEditBonus = createEvent()

export const nameChanged = createEvent<string>()
export const $name = restore(nameChanged, '').reset(resetEditBonus)

export const hasLinkChanged = createEvent<boolean>()
export const $hasLink = restore(hasLinkChanged, true).reset(resetEditBonus)

export const linkChanged = createEvent<string>()
export const $link = restore(linkChanged, '').reset(hasLinkChanged).reset(resetEditBonus)

export const rewardTypeChanged = createEvent<'one-time' | 'hourly' | 'xp'>()
export const $rewardType = restore(rewardTypeChanged, null).reset(resetEditBonus)

export const oneTimeChanged = createEvent<string>()
export const $oneTime = restore(oneTimeChanged, '').reset(resetEditBonus)

export const hourlyChanged = createEvent<string>()
export const $hourly = restore(hourlyChanged, '').reset(resetEditBonus)

export const xpChanged = createEvent<string>()
export const $xp = restore(xpChanged, '').reset(resetEditBonus)
