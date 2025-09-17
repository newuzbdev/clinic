import { RouterProvider as RouterProvider } from 'react-router-dom'
import { routes } from '../routes/routes'

export const RouterProviders = () => {
	return <RouterProvider router={routes} />
}