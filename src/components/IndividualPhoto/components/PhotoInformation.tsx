import { useCategory } from "../../../hooks/useCategory";
import { Form, Button } from '@ahaui/react';
import { useFormik } from "formik";
import { useModalActions } from "../../../hooks/useModal";
import ModalContainer from "../../../layouts/Modal/ModalContainer";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { usePhoto, usePhotoAction } from "../../../hooks/usePhoto";

export default function PhotoInformation() {
  const { currentPhoto: photo } = usePhoto();
  const { currentCategory: category } = useCategory();
  const actions = usePhotoAction();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showModal } = useModalActions();

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: photo?.name,
      description: photo?.description,
      image_url: photo?.image_url
    },
    onSubmit: async values => {
      actions.updateOne(category.id, photo.id, values);
    }
  });

  if (!photo) {
    return null;
  }


  const isPermission = user.id === photo.author.id;

  const handleDeletePhoto = () => {
    actions.deleteOne(category.id, photo.id).then(() => {
      navigate(`/categories/${category.id}`);
    });
  };

  const openModalDelete = () => {
    showModal('confirmDelete', {
      title: 'Delete Photo',
      btnSubmitTitle: 'Delete',
      description: 'Do you want to delete this photo?',
      handleOnSubmit: handleDeletePhoto
    });
  };

  return (
    <div className="item-information">
      <ModalContainer/>
      <img className="image" src={photo.image_url}/>
      <div className="details">
        <Form className="form" onSubmit={form.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="category-name">Name</Form.Label>
            <Form.Input
              id="category-name"
              type="text"
              name="name"
              disabled={!isPermission}
              defaultValue={photo.name}
              onChange={form.handleChange}
            />
            <Form.Label htmlFor="category-description">Description</Form.Label>
            <Form.Input
              id="category-description"
              type="text"
              name="description"
              disabled={!isPermission}
              defaultValue={photo.description}
              onChange={form.handleChange}
            />
            <Form.Label htmlFor="category-imageUrl">Image URL</Form.Label>
            <Form.Input
              id="category-imageUrl"
              type="text"
              name="image_url"
              disabled={!isPermission}
              defaultValue={photo.image_url}
              onChange={form.handleChange}
            />
          </Form.Group>
          <div className="buttons">
            <Button className="btn-update" disabled={!isPermission} type="submit">Update</Button>
            <Button
              className="btn-delete"
              variant="negative"
              disabled={!isPermission}
              onClick={openModalDelete}
            >Delete</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
