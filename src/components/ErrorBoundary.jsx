import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Keyingi render uchun xatolik holatini o‘zgartirish
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Xatolarni loglash
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="text-center p-4 text-red-600">
          <h1>Ma'lumot yuklashda xatolik yuz berdi!</h1>
          <p>Iltimos, biroz keyin qayta urining yoki administrator bilan bog‘laning.</p>
          {this.state.errorInfo && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;