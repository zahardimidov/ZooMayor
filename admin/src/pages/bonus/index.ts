import { bonusRoute, editBonusRoute } from '@/shared/routes'
import { createRouteView } from 'atomic-router-react'
import { BonusPage } from './bonus'
import { EditBonusPage } from './edit'

export const bonusView = createRouteView({
  route: bonusRoute,
  view: BonusPage,
})

export const editBonusView = createRouteView({
  route: editBonusRoute,
  view: EditBonusPage,
})
