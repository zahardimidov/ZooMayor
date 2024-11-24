/* eslint-disable @typescript-eslint/no-explicit-any */
import { editUserRoute, usersRoute } from '@/shared/routes'
import { createRouteView } from 'atomic-router-react'
import { UserPage } from './user'
import { EditUserPage } from './edit'

export const userView = createRouteView({
  route: usersRoute,
  view: UserPage,
})

export const editUserView = createRouteView({
  route: editUserRoute as any,
  view: EditUserPage,
})
