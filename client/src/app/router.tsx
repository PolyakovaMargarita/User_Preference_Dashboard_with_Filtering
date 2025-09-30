import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '../shared/constants/routes'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { RouteError } from '../shared/ui/RouteError'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to={ROUTES.ADD_PRODUCT} replace /> },
      {
        path: ROUTES.ADD_PRODUCT,
        async lazy() {
          const { AddProductPage } = await import('../pages/AddProductPage')
          return { Component: AddProductPage }
        },
      },
      {
        path: ROUTES.CATALOG,
        async lazy() {
          const { CatalogPage } = await import('../pages/CatalogPage')
          return { Component: CatalogPage }
        },
      },
    ],
  },
])
