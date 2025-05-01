import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={s.list}>
      {images.map((img) => (
        <li key={img.id} onClick={() => onImageClick(img)}>
          <ImageCard src={img.urls.small} alt={img.alt_description} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;