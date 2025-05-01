import './App.css';
import { useEffect, useState } from "react";
import { fetchImages } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchImages(query, page);
        setImages(prev => page === 1 ? data.results : [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error(err);
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
    setPage(prev => prev + 1);
  };

  const openModal = (img) => {
    setSelectedImage(img);
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
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
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

export default App;
