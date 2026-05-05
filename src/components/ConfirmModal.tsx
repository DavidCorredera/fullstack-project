import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="secondary">
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={danger ? '' : 'secondary'}
            style={danger ? { background: '#ef4444' } : undefined}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const useConfirm = () => {
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    danger?: boolean;
  } | null>(null);

  const confirm = (title: string, message: string, onConfirm: () => void, danger = true) => {
    setConfirmState({ isOpen: true, title, message, onConfirm, danger });
  };

  const handleConfirm = () => {
    confirmState?.onConfirm();
    setConfirmState(null);
  };

  const handleCancel = () => {
    setConfirmState(null);
  };

  return { confirm, modal: confirmState ? (
    <ConfirmModal
      isOpen={confirmState.isOpen}
      title={confirmState.title}
      message={confirmState.message}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      danger={confirmState.danger}
    />
  ) : null };
};