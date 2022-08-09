import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCategory, useCategoryAction } from "../../hooks/useCategory";
import { usePhoto, usePhotoAction } from "../../hooks/usePhoto";
import UiBreadcrumb, { BreadCrumbPath } from "../../layouts/Breadcrumb";
import Header from "../../layouts/Header";
import PhotoInformation from "./components/PhotoInformation";

function Photo() {
  const { id, photoId } = useParams();
  const { currentCategory: category } = useCategory();
  const { currentPhoto: photo } = usePhoto();
  const actions = usePhotoAction();
  const categoryActions = useCategoryAction();

  useEffect(() => {
    actions.getOne(id, photoId);

    if (!category) {
      categoryActions.getOne(id);
    }
  }, []);

  const breadCrumbPaths: BreadCrumbPath[] = [
    {
      name: 'Categories',
      url: '/'
    },
    {
      name: category?.name,
      url: `/categories/${category?.id}`
    },
    {
      name: photo?.name,
    }
  ];

  return (
    <>
      <div className="individual-photo">
        {
          (category && photo) && <UiBreadcrumb paths={breadCrumbPaths}></UiBreadcrumb>
        }
        <Header title={photo?.name} description={photo?.description}></Header>
        <PhotoInformation/>
      </div>
    </>
  );
}

export default Photo;
