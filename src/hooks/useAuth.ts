import { useDispatch, useSelector } from "react-redux";
import { User } from "../models/user";
import { fetchUserInfo, setUser } from "../services/reducers/auth";
import { RootState, useTypedDispatch } from "../services/store";

export const useAuth = () => {
  const { user, isProcessing } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const thunkDispatch = useTypedDispatch();

  const setUserAction = (user: User) => {
    dispatch(setUser(user));
  };

  const fetchUserInfoAction = () => {
    thunkDispatch(fetchUserInfo());
  };

  return {
    user,
    isProcessing,
    actions: {
      setUser: setUserAction,
      fetchUserInfo: fetchUserInfoAction
    }
  };
};
