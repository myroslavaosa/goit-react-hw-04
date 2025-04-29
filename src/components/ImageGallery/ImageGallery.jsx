import { useEffect, useState } from "react";
import { fetchImages } from "../../services/api";
import SearchBar from "../SearchBar/SearchBar";
import ImageCard from "../ImageGallery/ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import s from "./ImageGallery.module.css";

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadImages = async () => {
      if (!query) return;
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(query, page);

        setImages((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to load images:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (img) => {
    setSelectedImage({
      url: img.urls.regular,
      alt: img.alt_description,
      downloads: img.downloads,
      views: img.views,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      <ul className={s.list}>
        {images.map((img) => (
          <li key={img.id} onClick={() => openModal(img)}>
            <ImageCard src={img.urls.small} alt={img.alt_description} />
          </li>
        ))}
      </ul>
      {loading && <Loader loading={loading} />}
      {!loading && images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          imageUrl={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
          downloads={selectedImage.downloads}
          views={selectedImage.views}
        />
      )}
    </>
  );
}

export default ImageGallery;
