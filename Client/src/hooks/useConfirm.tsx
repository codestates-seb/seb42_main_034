const useConfirm = (
  message: string,
  onConfirm: () => void | Promise<any>,
  onCancel: () => void | Promise<any>,
) => {
  if (!onConfirm || typeof onConfirm !== 'function') {
    return;
  }
  if (onCancel && typeof onCancel !== 'function') {
    return;
  }

  const confirmAction = async () => {
    if (window.confirm(message)) {
      await onConfirm();
    } else {
      await onCancel();
    }
  };

  return confirmAction;
};

export default useConfirm;
