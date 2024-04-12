import { ReactNode, useCallback, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  type: string;
  children: ReactNode;
}
export const useModal = () => {
  // 모달의 열림/닫힘 상태를 관리하는 state
  const [modalType, setModalType] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달을 열기 위한 함수
  const openModal = (type: string) => {
    document.body.style.overflow = 'hidden';
    setModalType(type);
    document.addEventListener('mousedown', handleClickOutside);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    document.body.style.overflow = 'unset';
    setModalType('');
    document.removeEventListener('mousedown', handleClickOutside);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    console.log(modalRef && modalRef.current?.contains(event.target as Node));
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  }, []);

  // index.html에 root div 형제인 id가 modal인 div를 참조
  // createPortal을 이용하여 z-index 쌓임맥락으로 인한 예상치 못한 레이아웃 문제 해결
  const modalRoot = document.querySelector('#modal') as HTMLElement;

  const Modal = ({ type, children }: ModalProps) => {
    return ReactDOM.createPortal(
      <>
        {type === modalType && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div ref={modalRef}>{children}</div>
          </div>
        )}
      </>,
      modalRoot
    );
  };

  // 상태 및 제어 함수를 포함하는 객체 반환
  return { Modal, openModal, closeModal };
};
