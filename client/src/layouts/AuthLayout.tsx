import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md px-4 py-6">
        <Outlet />
      </div>
    </div>
  )
}
