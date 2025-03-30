"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  const portalTarget = document.getElementById('modal')
  if (!portalTarget) return null // avoid error if target is still missing

  return createPortal(
    <dialog ref={dialog} onClose={onClose} className={className}>
      {children}
    </dialog>,
    portalTarget
  );
}
