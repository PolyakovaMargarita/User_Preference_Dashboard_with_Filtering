import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export function RouteError() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Error {error.status}</h1>
        <p className="text-muted-foreground mt-2">{error.statusText}</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground mt-2">Please try again later.</p>
    </div>
  )
}
