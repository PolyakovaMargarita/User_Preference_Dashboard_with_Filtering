export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Dashboard. All rights reserved.
      </div>
    </footer>
  )
}
