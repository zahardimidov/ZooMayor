import { createRoute, redirect } from 'atomic-router'
import { createEvent } from 'effector'

export const homeRoute = createRoute()

export const loginRoute = createRoute()

export const cardsRoute = createRoute()
export const editCardBackRoute = createRoute<{ id: 'new' | string }>()
export const editCardRoute = createRoute<{ id: 'new' | string }>()

export const setsRoute = createRoute()
export const editSetRoute = createRoute<{ id: 'new' | string }>()

export const bonusRoute = createRoute()
export const editBonusRoute = createRoute<{ id: 'new' | string }>()

export const tastsRoute = createRoute()
export const editTaskRoute = createRoute()

export const modsRoute = createRoute()
export const editModRoute = createRoute<{ id: string }>()

export const usersRoute = createRoute()
export const editUserRoute = createRoute<{ id: string }>()

export const goCardsRoute = createEvent()
export const goBonusRoute = createEvent()

redirect({
  clock: goCardsRoute,
  route: cardsRoute,
})

redirect({
  clock: goBonusRoute,
  route: bonusRoute,
})
