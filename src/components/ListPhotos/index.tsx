/* eslint-disable react/display-name */
import { useEffect } from "react";
import { useCategory } from "../../hooks/useCategory";
import Loading from "../../layouts/Loading";
import { useSearchParams } from "react-router-dom";
import { usePhoto, usePhotoAction } from "../../hooks/usePhoto";
import PhotoItem from "./components/PhotoItem";
import { Photo } from "../../models/photo";
import UiPagination from "../../layouts/Pagination";

const dividePhotosIntoFourPart = (photos: Photo[]) => {

  if (!photos.length) {
    return;
  }

  const firstPart = [];
  const secondPart = [];
  const thirdPart = [];
  const lastPart = [];

  for (let i = 1; i <= photos.length; i++) {
    const photo = photos[i - 1];
    if (i % 4 === 1) {
      firstPart.push(photo);
    } else if (i % 4 === 2) {
      secondPart.push(photo);
    } else if (i % 4 === 3) {
      thirdPart.push(photo);
    } else if (i % 4 === 0) {
      lastPart.push(photo);
    }
  }

  return [
    firstPart,
    secondPart,
    thirdPart,
    lastPart
  ];
};

function ListPhotos() {
  const { currentCategory } = useCategory();
  if (!currentCategory) {
    return null;
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = +searchParams.get('limit') || 10;
  const page = +searchParams.get('page') || 1;
  const actions = usePhotoAction();

  useEffect(() => {
    const offset = (page - 1) * limit;

    actions.getAll(currentCategory.id, {
      limit,
      offset
    });
  }, [page]);

  const { isProcessing, photos, total } = usePhoto();
  if (isProcessing) {
    return <Loading />;
  }

  const dividedPhotos = dividePhotosIntoFourPart(photos);

  const FlexibleHeightPhotos = dividedPhotos && (
    <>
      <div className="photos-col photos-col-1">
        { dividedPhotos[0]?.length && dividedPhotos[0].map(photo => <PhotoItem key={photo.id} photo={photo}/>) }
      </div>
      <div className="photos-col photos-col-2">
        { dividedPhotos[1]?.length && dividedPhotos[1].map(photo => <PhotoItem key={photo.id} photo={photo}/>) }
      </div>
      <div className="photos-col photos-col-3">
        { dividedPhotos[2]?.length && dividedPhotos[2].map(photo => <PhotoItem key={photo.id} photo={photo}/>) }
      </div>
      <div className="photos-col photos-col-4">
        { dividedPhotos[3]?.length && dividedPhotos[3].map(photo => <PhotoItem key={photo.id} photo={photo}/>) }
      </div>
    </>
  );

  const NormalHeightPhotos = (
    <>
      {
        photos.map(photo => <PhotoItem key={photo.id} photo={photo}/>)
      }
    </>
  );

  const PhotosShowing = () => photos.length >= 4 ? FlexibleHeightPhotos : NormalHeightPhotos;

  return (
    <>
      <div className="list-photos-wrapper">
        <div className="list-photos">
          <PhotosShowing/>
        </div>
        {
          !!total && <UiPagination total={total}/>
        }
      </div>
    </>
  );
}

export default ListPhotos;
