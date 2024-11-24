/* eslint-disable @typescript-eslint/no-explicit-any */
import { editSetRoute, setsRoute } from '@/shared/routes'
import { createRouteView } from 'atomic-router-react'
import { SetsPage } from './sets'
import { EditSetPage } from './edit'

export const setsView = createRouteView({
  route: setsRoute,
  view: SetsPage,
})

export const editSetView = createRouteView({
  route: editSetRoute as any,
  view: EditSetPage,
})
