import { useModal } from './useModal';

export default function ModalTest() {
  const { Modal, openModal, closeModal } = useModal();
  return (
    <div>
      <div
        style={{
          position: 'relative',
          zIndex: 999,
          backgroundColor: 'green',
          width: '100px',
          height: '100px',
        }}
      >
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'red',
            width: '55px',
            height: '55px',
          }}
        ></div>
      </div>
      <div style={{ position: 'relative', zIndex: 22 }}>
        <button type='button' onClick={() => openModal('1모달')}>
          xx
        </button>
        <button type='button' onClick={() => openModal('2모달')}>
          xx
        </button>
        <div>----------------------------------</div>
        <Modal type='1모달'>
          <div
            style={{
              backgroundColor: 'white',
              width: '200px',
              height: '200px',
            }}
          >
            <div>모달이 열림</div>
            <button type='button' onClick={closeModal}>
              xx
            </button>
          </div>
        </Modal>
        <Modal type='2모달'>
          <div>
            <div>모달이 열림2</div>
            <button type='button' onClick={closeModal}>
              xx
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
