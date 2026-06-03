// Container for stacked toast notifications in the bottom right
// Each toast manages its own auto-dismiss timer

import Toast from './Toast';

interface ToastItem {
  id: string;
  message: string;
  onUndo: () => void;
}

interface ToastStackProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export default function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            message={toast.message}
            onUndo={toast.onUndo}
            onDismiss={() => onDismiss(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}