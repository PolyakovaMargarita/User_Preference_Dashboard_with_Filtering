import * as React from 'react'

export type ToastItem = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
}

type ToastContextValue = {
  toasts: ToastItem[]
  toast: (t: Omit<ToastItem, 'id'>) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const toast = React.useCallback((t: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, ...t }])
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 2500)
  }, [])

  return <ToastContext.Provider value={{ toasts, toast }}>{children}</ToastContext.Provider>
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export { Toast, ToastViewport, ToastTitle, ToastDescription, ToastClose } from './toast'
