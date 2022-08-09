/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PaginationData } from "../../models";
import { Category } from "../../models/category";
import { Photo, PhotoForm } from "../../models/photo";
import photoService from "../photo.service";

const getAll = createAsyncThunk(
  'photos/getAll',
  async (data: { categoryId: string, option?: PaginationData }) => {
    const { categoryId, option } = data;
    const photos = await photoService.getAll(categoryId, option);

    return photos;
  }
);

const getOne = createAsyncThunk(
  'photos/getOne',
  async (data: { categoryId: string, photoId: string }) => {
    const { categoryId, photoId } = data;
    const photo = await photoService.getOne(categoryId, photoId);

    return photo;
  }
);

const create = createAsyncThunk(
  'photos/create',
  async (data: { photo: PhotoForm, categoryId: string }) => {
    const { photo, categoryId } = data;
    try {
      const newPhoto = await photoService.create(categoryId, photo);

      return newPhoto;
    } catch (error) {
      throw error;
    }
  }
);

const updateOne = createAsyncThunk(
  'photos/updateOne',
  async (data: { categoryId: string, photoId: string, photo: PhotoForm }) => {
    const { photo, categoryId, photoId } = data;
    try {
      const updatedPhoto = await photoService.updateOne(categoryId, photoId, photo);

      return updatedPhoto;
    } catch (error) {
      throw error;
    }
  }
);

const deleteOne = createAsyncThunk(
  'photos/deleteOne',
  async (data: { categoryId: string, photoId: string }) => {
    const { categoryId, photoId } = data;

    try {
      await photoService.deleteOne(categoryId, photoId);

      return photoId;
    } catch (error) {
      throw error;
    }
  }
);

interface PhotoState {
  photos: Category[];
  total: number;
  isProcessing: boolean;
  currentPhoto?: Category;
}
const initialState : PhotoState = {
  photos: [],
  total: 0,
  isProcessing: false,
};

export const photoSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state) => {
      state.isProcessing = true;
    });

    builder.addCase(getAll.fulfilled, (state, action) => {
      state.photos = action.payload.items.map(item => {
        const photo = new Photo(item);

        return photo;
      });
      state.total = action.payload.total_items;
      state.isProcessing = false;
    });

    builder.addCase(create.pending, () => {
      // state.isProcessing = true;
    });

    builder.addCase(create.fulfilled, (state, action) => {
      state.photos = [...state.photos, action.payload];
      // state.isProcessing = false;
    });

    builder.addCase(create.rejected, (state, action) => {
      const { message } = action.error;

      throw message;
    });

    builder.addCase(getOne.fulfilled, (state, action) => {
      state.currentPhoto = action.payload;
    });

    builder.addCase(updateOne.fulfilled, (state, action) => {
      const updatedPhoto = action.payload;

      state.currentPhoto = {
        ...state.currentPhoto,
        ...updatedPhoto
      };
    });

    builder.addCase(deleteOne.fulfilled, () => {
      // const deletePhotoId = action.payload;
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

export default photoSlice.reducer;
