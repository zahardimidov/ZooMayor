import { homeRoute } from '@/shared/routes'
import { createRouteView } from 'atomic-router-react'
import { HomePage } from './home'

export const homeView = createRouteView({
  route: homeRoute,
  view: HomePage,
})
