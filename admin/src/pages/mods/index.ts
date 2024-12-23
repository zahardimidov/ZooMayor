import { editModRoute, modsRoute } from '@/shared/routes'
import { createRouteView } from 'atomic-router-react'
import { ModsPage } from './mods'
import { EditModPage } from './edit'

export const modsView = createRouteView({
  route: modsRoute,
  view: ModsPage,
})

export const editModView = createRouteView({
  route: editModRoute as any,
  view: EditModPage,
})
