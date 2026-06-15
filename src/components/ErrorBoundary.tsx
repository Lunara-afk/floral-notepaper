import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center h-screen text-ink-faint select-none">
            <div className="text-center">
              <div className="text-[48px] mb-4">🌸</div>
              <p className="text-sm">应用遇到错误</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-1.5 rounded text-sm bg-paper-deep/50 text-ink-soft hover:bg-paper-deep/70 hover:text-ink transition-all cursor-pointer"
              >
                重新加载
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
