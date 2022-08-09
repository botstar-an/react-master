import "@testing-library/jest-dom";
import mockAxios from 'jest-mock-axios';
import { Photo } from "../models/photo";
import photoService from '../services/photo.service';

afterEach(() => {
  mockAxios.reset();
});

describe('[PHOTO]', () => {
  it('should be received photos when load photos successfully', async () => {
    const response = {
      data: ['sample photo', 'sample photo', 'sample photo']
    };

    mockAxios.get.mockResolvedValue(response);
    const result = await photoService.getAll('sample categoryId');

    expect(result).toEqual(response.data);
  });

  it('should be received error when load photos failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Load failed'
        },
      }
    };

    mockAxios.get.mockRejectedValue(error);
    try {
      await photoService.getAll('sample categoryId');
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });

  it('should be received the photo when load photo by id successfully', async () => {
    const response = {
      data: 'i am sample photo'
    };

    mockAxios.get.mockResolvedValue(response);
    const result = await photoService.getOne('sample categoryId', 'sample photoId');

    expect(result).toEqual(response.data);
  });

  it('should be received the photo when load photo by id failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Load failed'
        },
      }
    };

    mockAxios.get.mockResolvedValue(error);
    try {
      await photoService.getOne('sample categoryId', 'sample photoId');
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });

  it('should be received the photo when create photo successfully', async () => {
    const response = {
      data: 'i am sample category'
    };
    const samplePhoto: Photo = {
      id: '1',
      name: 'Name',
      description: 'Description',
      image_url: 'url'
    };

    mockAxios.post.mockResolvedValue(response);
    const result = await photoService.create('sample categoryId', samplePhoto);

    expect(result).toEqual(response.data);
  });

  it('should be received the photo when create photo failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Create failed'
        },
      }
    };
    const samplePhoto: Photo = {
      id: '1',
      name: 'Name',
      description: 'Description',
      image_url: 'url'
    };

    mockAxios.post.mockRejectedValue(error);
    try {
      await photoService.create('sample categoryId', samplePhoto);
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });

  it('should be received the photo when update photo successfully', async () => {
    const response = {
      data: 'i am sample photo'
    };
    const samplePhoto = {
      name: 'Name',
      description: 'Description',
      image_url: 'url'
    };

    mockAxios.put.mockResolvedValue(response);
    const result = await photoService.updateOne('sample categoryId', 'sample photoId', samplePhoto);

    expect(result).toEqual(response.data);
  });

  it('should be received the photo when update photo failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Update failed'
        },
      }
    };
    const samplePhoto = {
      name: 'Name',
      description: 'Description',
      image_url: 'url'
    };

    mockAxios.put.mockRejectedValue(error);
    try {
      await photoService.updateOne('sample categoryId', 'sample photoId', samplePhoto);
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });

  it('should be received the photo when update photo successfully', async () => {
    const response = {
      data: 'delete successfully'
    };

    mockAxios.delete.mockResolvedValue(response);
    const result = await photoService.deleteOne('sample categoryId', 'sample photoId');

    expect(result).toEqual(response.data);
  });

  it('should be received the photo when delete photo failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Create failed'
        },
      }
    };

    mockAxios.delete.mockRejectedValue(error);
    try {
      await photoService.deleteOne('sample categoryId', 'sample photoId');
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });
});
