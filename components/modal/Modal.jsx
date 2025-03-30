'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ children, open, onClose, className }) {
  const dialogRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  if (!mounted) return null // wait until document exists

  const portalTarget = document.getElementById('modal')
  if (!portalTarget) return null // avoid error if target is still missing

  return createPortal(
    <dialog ref={dialogRef} onClose={onClose} className={className}>
      {children}
    </dialog>,
    portalTarget
  )
}

