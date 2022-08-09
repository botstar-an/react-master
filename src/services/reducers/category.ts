/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PaginationData } from "../../models";
import { Category, CategoryForm } from "../../models/category";
import categoryService from "../category.service";

const getAll = createAsyncThunk(
  'categories/getAll',
  async (option: PaginationData) => {
    const items = await categoryService.getAll(option);

    return items;
  }
);

const create = createAsyncThunk(
  'categories/create',
  async (category: CategoryForm) => {
    try {
      const newCategory = await categoryService.create(category);

      console.log(newCategory);
      return newCategory;
    } catch (error) {
      throw error;
    }
  }
);

const getOne = createAsyncThunk(
  'categories/getOne',
  async (id: string) => {
    const category = await categoryService.getOne(id);

    return category;
  }
);

const updateOne = createAsyncThunk(
  'categories/updateOne',
  async (data: { id: string, category: CategoryForm }) => {
    const { id } = data;
    const { category } = data;
    const updatedCategory = await categoryService.updateOne(id, category);

    return updatedCategory;
  }
);

const deleteOne = createAsyncThunk(
  'categories/deleteOne',
  async (id: string) => {
    await categoryService.deleteOne(id);

    return id;
  }
);

interface CategoryState {
  categories: Category[];
  total: number;
  isProcessing: boolean;
  currentCategory?: Category;
}
const initialState : CategoryState = {
  categories: [],
  total: 0,
  isProcessing: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state) => {
      state.isProcessing = true;
    });

    builder.addCase(getAll.fulfilled, (state, action) => {
      state.categories = action.payload.items.map(item => {
        const category = new Category(item);

        return category;
      });
      state.total = action.payload.total_items;
      state.isProcessing = false;
    });

    builder.addCase(create.pending, () => {
      // state.isProcessing = true;
    });

    builder.addCase(create.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload];
      // state.isProcessing = false;
    });

    builder.addCase(create.rejected, (state, action) => {
      const { message } = action.error;

      throw message;
      // state.isProcessing = false;
    });

    builder.addCase(getOne.pending, (state) => {
      state.isProcessing = true;
    });

    builder.addCase(getOne.fulfilled, (state, action) => {
      state.currentCategory = action.payload;
      state.isProcessing = false;
    });

    builder.addCase(updateOne.pending, () => {
      // state.isProcessing = true;
    });

    builder.addCase(updateOne.fulfilled, (state, action) => {
      const updatedCategory = action.payload;

      state.currentCategory = {
        ...state.currentCategory,
        ...updatedCategory
      };
      // state.isProcessing = false;
    });

    builder.addCase(deleteOne.fulfilled, () => {
      // const id = action.payload;
    });
  }
});

export {
  getAll,
  create,
  getOne,
  updateOne,
  deleteOne
};

export default categorySlice.reducer;
