import "@testing-library/jest-dom";
import mockAxios from 'jest-mock-axios';
import categoryService from '../services/category.service';

afterEach(() => {
  mockAxios.reset();
});

describe('[CATEGORY]', () => {
  it('should be received categories when load categories successfully', async () => {
    const response = {
      data: ['sample category', 'sample category', 'sample category']
    };

    mockAxios.get.mockResolvedValue(response);
    const result = await categoryService.getAll();

    expect(result).toEqual(response.data);
  });

  it('should be received error when load categories failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Load failed'
        },
      }
    };

    mockAxios.get.mockRejectedValue(error);
    try {
      await categoryService.getAll();
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });

  it('should be received the category when load category by id successfully', async () => {
    const response = {
      data: 'i am sample category'
    };

    mockAxios.get.mockResolvedValue(response);
    const result = await categoryService.getOne('sample id');

    expect(result).toEqual(response.data);
  });

  it('should be received the category when load category by id failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Load failed'
        },
      }
    };

    mockAxios.get.mockResolvedValue(error);
    try {
      await categoryService.getOne('sample id');
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });

  it('should be received the category when create category successfully', async () => {
    const response = {
      data: 'i am sample category'
    };

    mockAxios.post.mockResolvedValue(response);
    const result = await categoryService.create({
      name: 'name',
      description: 'description',
      image_url: 'link'
    });

    expect(result).toEqual(response.data);
  });

  it('should be received the category when create category failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Create failed'
        },
      }
    };

    mockAxios.post.mockRejectedValue(error);
    try {
      await categoryService.create({
        name: 'name',
        description: 'description',
        image_url: 'link'
      });
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });

  it('should be received the category when update category successfully', async () => {
    const response = {
      data: 'i am sample category'
    };

    mockAxios.put.mockResolvedValue(response);
    const result = await categoryService.updateOne('sample id', {
      name: 'name',
      description: 'description',
      image_url: 'link'
    });

    expect(result).toEqual(response.data);
  });

  it('should be received the category when update category failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Update failed'
        },
      }
    };

    mockAxios.put.mockRejectedValue(error);
    try {
      await categoryService.updateOne('sample id', {
        name: 'name',
        description: 'description',
        image_url: 'link'
      });
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });

  it('should be received the category when delete category successfully', async () => {
    const response = {
      data: 'delete successfully'
    };

    mockAxios.delete.mockResolvedValue(response);
    const result = await categoryService.deleteOne('sample id');

    expect(result).toEqual(response.data);
  });

  it('should be received the category when delete category failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Create failed'
        },
      }
    };

    mockAxios.delete.mockRejectedValue(error);
    try {
      await categoryService.deleteOne('sample id');
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });
});
