import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-dvh items-center justify-center bg-zinc-950 p-4 text-white">
          <div className="w-full max-w-sm text-center">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-zinc-400">
              Your saved workouts are safe. Reload the app to continue.
            </p>
            <button
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold active:scale-95"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
