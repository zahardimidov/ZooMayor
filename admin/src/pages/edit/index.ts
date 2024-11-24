/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRouteView } from 'atomic-router-react'
import { EditCardBackPage } from './card-back'
import { editCardBackRoute, editCardRoute } from '@/shared/routes'
import { EditCardPage } from './card'

export const editCardBackView = createRouteView({
  route: editCardBackRoute as any,
  view: EditCardBackPage,
})

export const editCardView = createRouteView({
  route: editCardRoute as any,
  view: EditCardPage,
})
