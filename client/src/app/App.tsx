import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Loading } from '../shared/ui/Loading'
import { ErrorBoundary } from '../shared/ui/ErrorBoundary'

export function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  )
}
