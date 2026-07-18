'use client';

import Modal from '@/shared/components/ui/Modal';
import Button from '@/shared/components/ui/Button';

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  confirmVariant = 'primary',
}) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      {message && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {message}
        </p>
      )}
      <div className="flex items-center justify-end gap-3">
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant={confirmVariant === 'danger' ? 'danger' : 'primary'}
          size="sm"
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
