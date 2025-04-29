import { Component, ErrorInfo, ReactNode } from "react";

/**
 * Props for the ErrorBoundary component
 */
type Props = Readonly<{
  /**
   * The components that will be rendered inside the error boundary
   */
  children: ReactNode;

  /**
   * Optional custom UI to display when an error occurs
   * If not provided, a default error message will be shown
   */
  fallback?: ReactNode;

  /**
   * Optional callback function that will be called when an error is caught
   * Useful for logging errors to an external service
   * 
   * @param {Error} error - The error that was thrown
   * @param {ErrorInfo} errorInfo - Additional information about the error
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}>;

/**
 * State for the ErrorBoundary component
 */
interface State {
  /**
   * Indicates whether an error has occurred in a child component
   */
  hasError: boolean;

  /**
   * The error object that was caught, or null if no error has occurred
   */
  error: Error | null;
}

/**
 * A component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * 
 * This component implements the Error Boundary pattern introduced in React 16.
 * It uses the componentDidCatch lifecycle method to catch errors during rendering,
 * in lifecycle methods, and in constructors of the whole tree below it.
 * 
 * @component
 * @example
 * // Basic usage
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * 
 * @example
 * // With custom fallback UI
 * <ErrorBoundary
 *   fallback={<div>Something went wrong. Please try again.</div>}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * 
 * @example
 * // With error handling callback
 * <ErrorBoundary
 *   onError={(error, errorInfo) => {
 *     // Log to error reporting service
 *     logErrorToService(error, errorInfo);
 *   }}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  /**
   * Constructor for the ErrorBoundary component
   * Initializes the state with hasError set to false and error set to null
   * 
   * @param {Props} props - The component props
   */
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Static lifecycle method called when an error is thrown in a descendant component
   * This method is used to update the state so that the next render will show the fallback UI
   * 
   * @param {Error} error - The error that was thrown
   * @returns {State} The updated state object with hasError set to true and the error
   */
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  /**
   * Lifecycle method called after an error has been thrown by a descendant component
   * This method is used for side effects like logging the error
   * 
   * @param {Error} error - The error that was thrown
   * @param {ErrorInfo} errorInfo - Object containing the component stack trace
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * Renders either the children or the fallback UI depending on whether an error has occurred
   * 
   * @returns {ReactNode} The rendered component
   */
  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="p-4 border border-red-300 bg-red-50 rounded-md">
            <h2 className="text-lg font-semibold text-red-800">
              Something went wrong
            </h2>
            <p className="text-red-600 mt-2">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
