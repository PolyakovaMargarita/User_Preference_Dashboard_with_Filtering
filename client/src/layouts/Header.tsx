import { NavLink } from 'react-router-dom'
import { ROUTES } from '../shared/constants/routes'

export function Header() {
  return (
    <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center gap-2 justify-center sm:justify-between">
        <div className="text-lg font-semibold w-full text-center sm:w-auto sm:text-left">
          User Preference Dashboard
        </div>
        <nav className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
          <NavLink
            to={ROUTES.ADD_PRODUCT}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md border transition hover:bg-accent hover:text-accent-foreground ${
                isActive ? 'bg-accent text-accent-foreground' : ''
              }`
            }
          >
            Add Product
          </NavLink>
          <NavLink
            to={ROUTES.CATALOG}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md border transition hover:bg-accent hover:text-accent-foreground ${
                isActive ? 'bg-accent text-accent-foreground' : ''
              }`
            }
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
