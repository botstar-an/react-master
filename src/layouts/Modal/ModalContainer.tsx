import { useModal } from '../../hooks/useModal';
import ModalConfirm from './components/ModalConfirm';
import ModalCreateCategory from './components/ModalCreateCategory';
import ModalCreatePhoto from './components/ModalCreatePhoto';

const ModalsType = {
  createCategory: (props) => <ModalCreateCategory {...props} ></ModalCreateCategory>,
  confirmDelete: (props) => <ModalConfirm {...props} ></ModalConfirm>,
  createPhoto: (props) => <ModalCreatePhoto {...props} ></ModalCreatePhoto>
};

function ModalContainer() {
  const { show, key, props } = useModal();

  if (show) {
    return ModalsType[key](props);
  }

  return null;
}

export default ModalContainer;
