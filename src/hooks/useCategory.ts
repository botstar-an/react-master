import { useSelector } from "react-redux";
import { PaginationData } from "../models";
import { CategoryForm } from "../models/category";
import { getAll, create, getOne, updateOne, deleteOne } from "../services/reducers/category";
import { RootState, useTypedDispatch } from "../services/store";

export const useCategory = () => {
  const {
    categories,
    total,
    isProcessing,
    currentCategory
  } = useSelector((state: RootState) => state.category);

  return {
    categories,
    total,
    isProcessing,
    currentCategory
  };
};


export const useCategoryAction = () => {
  const thunkDispatch = useTypedDispatch();

  const getAllAction = (option: PaginationData) => {
    thunkDispatch(getAll(option));
  };

  const getOneAction = (id: string) => {
    thunkDispatch(getOne(id));
  };

  const createAction = (category: CategoryForm) => {
    return thunkDispatch(create(category));
  };


  const updateOneAction = (id: string, category: CategoryForm) => {
    thunkDispatch(updateOne({
      id,
      category
    }));
  };

  const deleteOneAction = (id: string) => {
    return thunkDispatch(deleteOne(id));
  };

  return {
    getAll: getAllAction,
    create: createAction,
    getOne: getOneAction,
    updateOne: updateOneAction,
    deleteOne: deleteOneAction
  };
};
