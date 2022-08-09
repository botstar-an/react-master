import { PaginationData } from "../models";
import { PhotoForm } from "../models/photo";
import { _DELETE_, _getUrl, _GET_, _POST_, _PUT_ } from "./utils/requests";

const getAll = (categoryId: string, option?: PaginationData) => {
  return _GET_(_getUrl(['categories', categoryId, 'items']), option);
};

const getOne = (categoryId: string, photoId: string) => {
  return _GET_(_getUrl(['categories', categoryId, 'items', photoId]));
};

const create = (categoryId: string, photo: PhotoForm) => {
  return _POST_(_getUrl(['categories', categoryId, 'items']), photo);
};

const updateOne = (categoryId: string, photoId: string, photo: PhotoForm) => {
  return _PUT_(_getUrl(['categories', categoryId, 'items', photoId]), photo);
};

const deleteOne = (categoryId: string, photoId: string) => {
  return _DELETE_(_getUrl(['categories', categoryId, 'items', photoId]));
};

const photoService = {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne
};

export default photoService;