// Container that stacks toast notifications in the bottom right of the screen
// Toasts are managed by App.tsx, this component just renders the current list

import Toast from './Toast';

// Shape of a toast item as it lives in App state
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
  // Nothing to render if there are no active toasts
  if (toasts.length === 0) return null;

  return (
    // pointer-events-none on the container so clicks pass through empty space
    // pointer-events-auto on each toast so the buttons inside still work
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