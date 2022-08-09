import { PaginationData } from "../models";
import { CategoryForm } from "../models/category";
import { _DELETE_, _getUrl, _GET_, _POST_, _PUT_ } from "./utils/requests";

const getAll = (option?: PaginationData) => {
  return _GET_(_getUrl(['crud', 'tables']), option);
};

const getOne = (id: string) => {
  return _GET_(_getUrl(['categories', id]));
};

const create = (category: CategoryForm) => {
  return _POST_(_getUrl(['categories']), category);
};

const updateOne = (id: string, category: CategoryForm) => {
  return _PUT_(_getUrl(['categories', id]), category);
};

const deleteOne = (id: string) => {
  return _DELETE_(_getUrl(['categories', id]));
};

const categoryService = {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne
};

export default categoryService;
