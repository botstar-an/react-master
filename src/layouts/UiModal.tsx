import { Modal, Button } from '@ahaui/react';

function UiModal({
  show,
  setShow,
  children,
  title,
  btnSubmitTitle = 'Save',
  handleOnSubmit
}: {
  show: boolean,
  setShow: any,
  children: any,
  title: string,
  btnSubmitTitle?: string,
  handleOnSubmit: any
}) {
  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { children }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
        <Button variant="primary" onClick={handleOnSubmit}>{btnSubmitTitle}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UiModal;
