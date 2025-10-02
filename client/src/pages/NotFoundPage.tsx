import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <div>
        <p className="text-8xl font-bold leading-none">404</p>
        <p className="text-muted-foreground mt-2 text-lg">Page not found</p>
      </div>
      <div className="mt-4 flex gap-2">
        <Button asChild>
          <Link to="/">Go home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/catalog">Catalog</Link>
        </Button>
      </div>
    </section>
  )
}
