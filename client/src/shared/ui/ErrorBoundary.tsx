import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = { children: ReactNode }
type ErrorBoundaryState = { hasError: boolean; error?: unknown }

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    // Можно подключить логирование
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-6 text-red-600">An error occurred. Please refresh the page.</div>
    }
    return this.props.children
  }
}
