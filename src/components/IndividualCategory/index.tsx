/* eslint-disable react/display-name */
import Header from "../../layouts/Header";
import { useEffect } from "react";
import { useCategory, useCategoryAction } from "../../hooks/useCategory";
import Loading from "../../layouts/Loading";
import { useParams } from "react-router-dom";
import CategoryInformation from "./components/CategoryInformation";
import UiBreadcrumb, { BreadCrumbPath } from "../../layouts/Breadcrumb";
import AddPhotoToCategory from "./components/AddPhotoToCategory";
import ListPhotos from "../ListPhotos";

function Category() {
  const { id } = useParams();
  const { currentCategory: category, isProcessing } = useCategory();
  const actions = useCategoryAction();
  const breadCrumbPaths: BreadCrumbPath[] = [
    {
      name: 'Categories',
      url: '/'
    },
    {
      name: category?.name,
      // url: `/categories/${category?.name}`
    }
  ];

  useEffect(() => {
    actions.getOne(id);
  }, []);

  if (isProcessing) {
    return <Loading />;
  }

  return (
    <>
      <div className="individual-category">
        <UiBreadcrumb paths={breadCrumbPaths}></UiBreadcrumb>
        <Header title={category?.name} description={category?.description}></Header>
        <CategoryInformation/>
        <ListPhotos/>
      </div>
      <AddPhotoToCategory/>
    </>
  );
}

export default Category;
