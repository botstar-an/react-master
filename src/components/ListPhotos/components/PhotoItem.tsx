import { useNavigate } from "react-router-dom";
import { Photo } from "../../../models/photo";

export default function PhotoItem({ photo }: { photo: Photo }) {
  const navigate = useNavigate();

  const navigateToPhoto = () => {
    navigate(`photos/${photo.id}`);
  };

  return (
    <div className="photo-item" onClick={navigateToPhoto}>
      <div className="image">
        <img src={photo.image_url}/>
      </div>
      <div className="name">{photo.name}</div>
    </div>
  );
}
