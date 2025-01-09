import { createPortal } from 'react-dom';
import { useRef, forwardRef, useImperativeHandle } from 'react';

const Modal = forwardRef(({ children }, ref) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    show: () => dialog.current?.showModal(),
    close: () => dialog.current?.close(),
  }));

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal'),
  );
});

export default Modal;
