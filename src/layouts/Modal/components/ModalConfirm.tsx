import { Modal, Button } from '@ahaui/react';
import { useModalActions } from '../../../hooks/useModal';

export default function ModalConfirm({ title, btnSubmitTitle, description, handleOnSubmit }: {
  title: string,
  btnSubmitTitle: string,
  description: string,
  handleOnSubmit: () => void
}) {
  const { closeModal } = useModalActions();

  const listenOnSubmitBtn = () => {
    closeModal();
    handleOnSubmit();
  };

  return (
    <Modal show={true} centered>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { description }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
        <Button variant="negative" onClick={listenOnSubmitBtn}>{btnSubmitTitle}</Button>
      </Modal.Footer>
    </Modal>
  );
}
