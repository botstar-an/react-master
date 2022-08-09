import { useDispatch, useSelector } from "react-redux";
import { closeModal, showModal } from "../services/reducers/modal";
import { RootState } from "../services/store";

export const useModal = () => {
  const { show, key, props } = useSelector((state: RootState) => state.modal);

  return {
    show,
    key,
    props,
  };
};

export const useModalActions = () => {
  const dispatch = useDispatch();
  const showModalAction = (key: string, props: any) => {
    dispatch(showModal({
      key,
      props
    }));
  };

  const closeModalAction = () => {
    dispatch(closeModal());
  };

  return {
    showModal: showModalAction,
    closeModal: closeModalAction
  };
};
