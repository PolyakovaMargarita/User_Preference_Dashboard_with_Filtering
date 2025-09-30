import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Loading } from '../shared/ui/Loading'
import { ErrorBoundary } from '../shared/ui/ErrorBoundary'
import { Provider } from 'react-redux'
import { store } from '../store'

export function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </Provider>
  )
}
