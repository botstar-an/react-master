import { LoginInfo } from "../models/user";
import { _getUrl, _GET_, _POST_ } from "./utils/requests";

const signup = (data: LoginInfo) => {
  return _POST_(_getUrl(['auth', 'register']), data);
};

const login = (data: LoginInfo) => {
  return _POST_(_getUrl(['auth', 'login']), data);
};

const retrieveUserInfo = () => {
  return _GET_(_getUrl(['user', 'infor']));
};

const authService = {
  signup,
  login,
  retrieveUserInfo
};

export default authService;
