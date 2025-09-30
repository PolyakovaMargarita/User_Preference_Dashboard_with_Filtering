import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Loading } from '../shared/ui/Loading'
import { ErrorBoundary } from '../shared/ui/ErrorBoundary'
import { Provider } from 'react-redux'
import { store } from '../store'
import { ToastProvider } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

export function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <ToastProvider>
            <TooltipProvider>
              <RouterProvider router={router} />
              <Toaster />
            </TooltipProvider>
          </ToastProvider>
        </Suspense>
      </ErrorBoundary>
    </Provider>
  )
}
