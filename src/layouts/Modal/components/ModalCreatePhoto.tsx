import { Modal, Button, Form } from '@ahaui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useCategory } from '../../../hooks/useCategory';
import { useModalActions } from '../../../hooks/useModal';
import { usePhotoAction } from '../../../hooks/usePhoto';

export default function ModalCreatePhoto({ title, btnSubmitTitle = 'Submit' }: {
  title: string,
  btnSubmitTitle: string
}) {
  const [error, setError] = useState('');
  const { closeModal } = useModalActions();
  const { currentCategory } = useCategory();
  const actions = usePhotoAction();

  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
      image_url: ''
    },
    onSubmit: values => {
      actions.create(currentCategory.id, values).then(() => {
        closeModal();
      }).catch(err => {
        setError(err);
      });
    }
  });

  return (
    <Modal show={true} centered>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="form">
          <Form.Group>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter name"
              isInvalid={!!error}
              onChange={form.handleChange}
            />
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Input
              id="description"
              type="text"
              name="description"
              placeholder="Enter description"
              isInvalid={!!error}
              onChange={form.handleChange}
            />
            <Form.Label htmlFor="image_url">Image URL</Form.Label>
            <Form.Input
              id="image_url"
              type="text"
              name="image_url"
              placeholder="Image URL"
              isInvalid={!!error}
              onChange={form.handleChange}
            />
            <Form.Feedback role="alert" type="invalid">{error}</Form.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
        <Button variant="primary" onClick={form.handleSubmit}>{btnSubmitTitle}</Button>
      </Modal.Footer>
    </Modal>
  );
}
