import { Button } from '@ahaui/react';
import { useModalActions } from '../../../hooks/useModal';

export default function AddPhotoToCategory() {
  const { showModal } = useModalActions();
  const openModalCreatePhoto = () => {
    showModal('createPhoto', {
      title: 'Create photo',
      btnSubmitTitle: 'Create'
    });
  };

  return (
    <div className="add-photo-section">
      <div className="content">
        <div className="title">Want to add photo to this category?</div>
        <Button size="small" onClick={openModalCreatePhoto}>Add photo</Button>
      </div>
    </div>
  );
}
