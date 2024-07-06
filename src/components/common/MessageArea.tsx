import React from 'react';
import classNames from 'classnames';

export type MessageType = 'error' | 'success' | 'warning' | 'info';

type MessageAreaProps = {
  message: string;
  type: MessageType;
};

export function MessageArea({ message, type }: MessageAreaProps) {
  if (!message) return null;

  const messageClass = classNames(
    'p-4 mb-1 rounded w-full max-w-4xl mx-auto border shadow-lg',
    {
      'bg-red-200': type === 'error',
      'bg-green-200': type === 'success',
      'bg-yellow-200': type === 'warning',
      'bg-white': type === 'info',
    }
  );

  return (
    <div className={messageClass}>
      {message}
    </div>
  );
}
