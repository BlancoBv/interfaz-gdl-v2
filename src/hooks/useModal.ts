type hook = Pick<HTMLDialogElement, "show" | "showModal" | "close">;

export function useModal(
  id: string,
  config: { useShowModal?: boolean } = { useShowModal: false }
) {
  const dialog: hook = document.getElementById(id) as HTMLDialogElement;
  if (!dialog) {
    return { show: () => {}, close: () => {} };
  }

  /*  if (config.useShowModal) {
    return {
      show: dialog.showModal.bind(dialog),
      close: dialog.close.bind(dialog),
    };
  } */
  return {
    show: dialog.showModal.bind(dialog),
    close: dialog.close.bind(dialog),
  } as const;
}
