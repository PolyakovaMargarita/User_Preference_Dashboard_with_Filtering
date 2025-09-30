export function isDevEnv(): boolean {
  return import.meta.env.DEV
}

export function isProdEnv(): boolean {
  return import.meta.env.PROD
}

export function getEnvName(): 'development' | 'production' | 'test' {
  if (import.meta.env.DEV) return 'development'
  if (import.meta.env.PROD) return 'production'
  return 'test'
}
