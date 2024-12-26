import { loginRoute } from '@/shared/routes'
import { createRouteView } from 'atomic-router-react'
import { LoginPage } from './login'

export const loginView = createRouteView({
  route: loginRoute,
  view: LoginPage,
})
