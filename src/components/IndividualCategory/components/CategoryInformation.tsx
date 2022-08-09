import { useCategory, useCategoryAction } from "../../../hooks/useCategory";
import { Form, Button } from '@ahaui/react';
import { useFormik } from "formik";
import { useModalActions } from "../../../hooks/useModal";
import ModalContainer from "../../../layouts/Modal/ModalContainer";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function CategoryInformation() {
  const { currentCategory: category } = useCategory();
  const actions = useCategoryAction();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { showModal } = useModalActions();

  if (!category) {
    return null;
  }

  const isPermission = user.id === category.author.id;

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: category.name,
      description: category.description,
      image_url: category.image_url
    },
    onSubmit: async values => {
      actions.updateOne(category.id, values);
    }
  });

  const handleDeleteCategory = () => {
    actions.deleteOne(category.id).then(() => {
      navigate('/');
    });
  };

  const openModalDelete = (e) => {
    e.preventDefault();
    showModal('confirmDelete', {
      title: 'Delete Category',
      btnSubmitTitle: 'Delete',
      description: 'Do you want to delete this category?',
      handleOnSubmit: handleDeleteCategory
    });
  };

  return (
    <div className="item-information">
      <ModalContainer/>
      <img className="image" src={category.image_url}/>
      <div className="details">
        <Form className="form" onSubmit={form.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="category-name">Name</Form.Label>
            <Form.Input
              id="category-name"
              type="text"
              name="name"
              disabled={!isPermission}
              defaultValue={category.name}
              onChange={form.handleChange}
            />
            <Form.Label htmlFor="category-description">Description</Form.Label>
            <Form.Input
              id="category-description"
              type="text"
              name="description"
              disabled={!isPermission}
              defaultValue={category.description}
              onChange={form.handleChange}
            />
            <Form.Label htmlFor="category-imageUrl">Image URL</Form.Label>
            <Form.Input
              id="category-imageUrl"
              type="text"
              name="image_url"
              disabled={!isPermission}
              defaultValue={category.image_url}
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
