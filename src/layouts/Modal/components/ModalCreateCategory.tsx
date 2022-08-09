import FormCreateCategory from "../../../components/Home/components/FormCreateCategory";
import { Modal, Button } from '@ahaui/react';
import { useModalActions } from "../../../hooks/useModal";
import { useRef } from "react";


export default function ModalCreateCategory(props: {
  title: string,
  btnSubmitTitle: string,
}) {
  const { title, btnSubmitTitle = 'Save' } = props;
  const { closeModal } = useModalActions();
  type FormCreateCategoryHandle = React.ElementRef<typeof FormCreateCategory>;
  const formRef = useRef<FormCreateCategoryHandle>(null);

  const handleOnSubmit = () => {
    formRef.current.createCategory();
  };

  return (
    <Modal show={true} centered>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormCreateCategory ref={formRef} closeModal={closeModal}></FormCreateCategory>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
        <Button variant="primary" onClick={handleOnSubmit}>{btnSubmitTitle}</Button>
      </Modal.Footer>
    </Modal>
  );
}
