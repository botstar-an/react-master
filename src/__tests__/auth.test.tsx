import "@testing-library/jest-dom";
import mockAxios from 'jest-mock-axios';
import authService from "../services/auth.service";

// function TestLogin() {
//   const history = createMemoryHistory();
//   return (
//     <Provider store={store}>
//       <Router location={history.location} navigator={history}>
//         <Login></Login>
//       </Router>
//     </Provider>
//   );
// }

afterEach(() => {
  mockAxios.reset();
});

describe('[LOGIN PAGE]', () =>  {
  it('should be received error message when login failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Sign up failed'
        },
      }
    };

    try {
      mockAxios.post.mockRejectedValue(error);
      await authService.login({ email: 'admin', password: 'wrong password' });
    } catch (err) {
      expect(err).toEqual(error.response.data.message);
    }
  });

  it('should be received success message when login successfully', async () => {
    const response = {
      data: 'Login success',
    };

    mockAxios.post.mockResolvedValue(response);
    const result = await authService.login({ email: 'email', password: 'password' });
    expect(result).toEqual(response.data);
  });
});

describe('[SIGNUP PAGE]', () =>  {
  it('should be received error message when sign up failed', async () => {
    const error = {
      response: {
        data: {
          message: 'Sign up failed'
        },
      }
    };

    mockAxios.post.mockRejectedValue(error);
    try {
      await authService.signup({ name: 'Man Nguyen', email: 'email', password: 'password' });
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });

  it('should be received success message when sign up successfully', async () => {
    const response = {
      data: 'Sign up success',
    };

    mockAxios.post.mockResolvedValue(response);
    const result = await authService.signup({ name: 'Man', email: 'email', password: 'password' });
    expect(result).toEqual(response.data);
  });
});

describe('[USER INFO]', () => {
  it('should be received user information when send request with access token', async () => {
    const response = {
      data: 'successfully',
    };

    mockAxios.get.mockResolvedValue(response);
    const result = await authService.retrieveUserInfo();
    expect(result).toEqual(response.data);
  });

  it('should be received error when send request without access token', async () => {
    const error = {
      response: {
        data: {
          message: 'Sign up failed'
        },
      }
    };

    mockAxios.get.mockRejectedValue(error);
    try {
      await authService.retrieveUserInfo();
    } catch(err) {
      expect(err).toEqual(error.response.data.message);
    }
  });
});
