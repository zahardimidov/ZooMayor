import { Route, RouterProvider } from 'atomic-router-react'
import { createHistoryRouter } from 'atomic-router'
import { createBrowserHistory } from 'history'
import {
  bonusRoute,
  cardsRoute,
  editBonusRoute,
  editCardBackRoute,
  editCardRoute,
  editModRoute,
  editSetRoute,
  editTaskRoute,
  editUserRoute,
  homeRoute,
  modsRoute,
  setsRoute,
  tastsRoute,
  usersRoute,
} from '@/shared/routes'
import { homeView } from '@/pages/home'
import { cardsView } from '@/pages/cards'
import { editCardBackView, editCardView } from '@/pages/edit'
import { bonusView, editBonusView } from '@/pages/bonus'
import { editSetView, setsView } from '@/pages/sets'
import { editTaskView, tastsView } from '@/pages/tasks'
import { editModView, modsView } from '@/pages/mods'
import { editUserView, userView } from '@/pages/user'

const router = createHistoryRouter({
  routes: [
    { route: homeRoute, path: '/' },
    { route: cardsRoute, path: '/cards' },
    { route: editCardBackRoute, path: '/cards/edit/card-back/:id' },
    { route: editCardRoute, path: '/cards/edit/card/:id' },
    { route: bonusRoute, path: '/bonus' },
    { route: editBonusRoute, path: '/bonus/edit/:id' },
    { route: setsRoute, path: '/sets' },
    { route: editSetRoute, path: '/sets/edit/:id' },
    { route: tastsRoute, path: '/tasks' },
    { route: editTaskRoute, path: '/tasks/edit/:id' },
    { route: modsRoute, path: '/mods' },
    { route: editModRoute, path: '/mods/edit/:id' },
    { route: usersRoute, path: '/users' },
    { route: editUserRoute, path: '/users/edit/:id' },
  ],
})

router.setHistory(createBrowserHistory())

export function WithRouter() {
  return (
    <RouterProvider router={router}>
      <Route route={homeRoute} view={homeView} />
      <Route route={cardsRoute} view={cardsView} />
      <Route route={editCardBackRoute} view={editCardBackView} />
      <Route route={editSetRoute} view={editSetView} />
      <Route route={editCardRoute} view={editCardView} />
      <Route route={bonusRoute} view={bonusView} />
      <Route route={editBonusRoute} view={editBonusView} />
      <Route route={setsRoute} view={setsView} />
      <Route route={tastsRoute} view={tastsView} />
      <Route route={editTaskRoute} view={editTaskView} />
      <Route route={modsRoute} view={modsView} />
      <Route route={editModRoute} view={editModView} />
      <Route route={usersRoute} view={userView} />
      <Route route={editUserRoute} view={editUserView} />
    </RouterProvider>
  )
}
