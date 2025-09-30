export default function App() {
  return (
    <main className="min-h-dvh bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl font-bold tracking-tight">Vite + React + Tailwind</h1>
        <p className="text-muted-foreground mt-2">Tailwind подключён и работает.</p>
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">
            Кнопка
          </button>
          <a
            className="px-4 py-2 rounded-md border hover:bg-accent hover:text-accent-foreground transition"
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer"
          >
            Документация Tailwind
          </a>
        </div>
      </div>
    </main>
  )
}
