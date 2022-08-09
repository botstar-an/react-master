import { useFormik } from "formik";
import { Form } from '@ahaui/react';
import { Ref, useImperativeHandle, useState } from "react";
import React from "react";
import { useCategoryAction } from "../../../hooks/useCategory";

type FormCreateCategoryProps = {
  closeModal: () => void;
}

type FormCreateCategoryRef = {
  createCategory: () => void;
}

export const FormCreateCategory = (props: FormCreateCategoryProps, ref: Ref<FormCreateCategoryRef>) => {
  const [error, setErorr] = useState('');
  const { closeModal } = props;
  const actions = useCategoryAction();

  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
      image_url: ''
    },
    onSubmit: values => {
      actions.create(values).then(() => {
        closeModal();
      }).catch(err => {
        setErorr(err);
      });
    }
  });


  useImperativeHandle(ref, () => ({
    createCategory() {
      form.handleSubmit();
    }
  }));

  return (
    <Form className="form" onSubmit={form.handleSubmit}>
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
  );
};

export default React.forwardRef(FormCreateCategory);
