import { useSelector } from "react-redux";
import { PaginationData } from "../models";
import { PhotoForm } from "../models/photo";
import { create, deleteOne, getAll, getOne, updateOne } from "../services/reducers/photo";
import { RootState, useTypedDispatch } from "../services/store";

export const usePhoto = () => {
  const {
    photos,
    total,
    isProcessing,
    currentPhoto
  } = useSelector((state: RootState) => state.photo);

  return {
    photos,
    total,
    isProcessing,
    currentPhoto
  };
};

export const usePhotoAction = () => {
  const thunkDispatch = useTypedDispatch();

  const getAllAction = (categoryId: string, option?: PaginationData) => {
    thunkDispatch(getAll({
      categoryId,
      option
    }));
  };

  const getOneAction = (categoryId: string, photoId: string) => {
    thunkDispatch(getOne({
      categoryId,
      photoId
    }));
  };

  const createAction = (categoryId: string, photo: PhotoForm) => {
    return thunkDispatch(create({
      photo,
      categoryId
    }));
  };

  const updateOneAction = (categoryId: string, photoId: string, photo: PhotoForm) => {
    thunkDispatch(updateOne({
      categoryId,
      photoId,
      photo
    }));
  };

  const deleteOneAction = (categoryId: string, photoId: string) => {
    return thunkDispatch(deleteOne({
      categoryId,
      photoId
    }));
  };

  return {
    getAll: getAllAction,
    create: createAction,
    getOne: getOneAction,
    updateOne: updateOneAction,
    deleteOne: deleteOneAction
  };
};
