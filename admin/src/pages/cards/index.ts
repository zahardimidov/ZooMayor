import { cardsRoute } from '@/shared/routes'
import { createRouteView } from 'atomic-router-react'
import { CardsPage } from './cards'

export const cardsView = createRouteView({
  route: cardsRoute,
  view: CardsPage,
})
