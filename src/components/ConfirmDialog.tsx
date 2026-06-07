// Confirmation dialog shown when the user tries to water a plant
// that was already watered recently
// Prevents accidental overwatering, which the user interview flagged as the
// most common cause of plant death in the scenario

interface ConfirmDialogProps {
  plantName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  plantName,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <>
      {/* Full screen backdrop. Clicking anywhere outside the dialog cancels it */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onCancel}
      >
        {/* Dialog box, stopPropagation so clicking inside does not bubble to the backdrop */}
        <div
          className="bg-surface-800 border border-surface-700 rounded-2xl p-6 max-w-md w-full shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Warning icon */}
          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-400"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-white mb-2">
            Water {plantName} again?
          </h2>

          {/* Body */}
          <p className="text-sm text-gray-300 mb-1">
            This plant was already watered recently and is healthy. Overwatering is the
            most common cause of indoor plant death.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Are you sure you want to water it again?
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-2 rounded-lg bg-surface-700 hover:bg-surface-600 text-gray-100 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors"
            >
              Water Anyway
            </button>
          </div>
        </div>
      </div>
    </>
  );
}