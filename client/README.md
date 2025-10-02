### Project architecture

- Simplified feature-based approach:
  - `features/products` contains everything for the catalog (pages, components, Redux).
  - `shared` stores reusable hooks, utilities and UI.
  - `layouts` prepared for extensibility (e.g. auth).

This approach keeps code easy to scale while staying simple to read.
