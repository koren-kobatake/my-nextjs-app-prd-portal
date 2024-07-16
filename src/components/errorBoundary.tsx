'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * ErrorBoundaryクラス
 * 
 * Reactアプリケーション内でエラーをキャッチし、
 * フォールバックUIを表示するためのエラーバウンダリコンポーネントです。
 * 
 * 主な役割:
 * 1. エラーキャッチ:
 *    - 子コンポーネントで発生したエラーをキャッチし、コンポーネントの破壊を防ぎます。
 * 
 * 2. フォールバックUIの表示:
 *    - エラーが発生した場合、ユーザーに表示するフォールバックUIを提供します。
 * 
 * 使用例:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * 
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundaryでエラーがキャッチされました", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary-message">システムエラーが発生しました</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
