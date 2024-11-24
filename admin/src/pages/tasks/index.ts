import { editTaskRoute, tastsRoute } from '@/shared/routes'
import { createRouteView } from 'atomic-router-react'
import { TasksPage } from './tasts'
import { EditTaskPage } from './edit'

export const tastsView = createRouteView({
  route: tastsRoute,
  view: TasksPage,
})

export const editTaskView = createRouteView({
  route: editTaskRoute,
  view: EditTaskPage,
})
