import React, { useState, useEffect, useRef } from 'react';
import { Wrapper } from './App.styled';
import fetchImages from '../Api/API';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (value === '') return;
    setIsLoading(true);
    fetchImages(value, page)
      .then(({ data }) => setImages(prevState => [...prevState, ...data.hits]))
      .catch(err => alert(err.message))
      .finally(() => setIsLoading(false));
  }, [page, value]);

  const newImageRef = useRef(null);

  useEffect(() => {
    if (images.length <= 12) return;
    newImageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [images]);

  const handleSearchbarSubmit = value => {
    setPage(1);
    setValue(value);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const changeModalData = modalData => {
    setModalData(modalData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Searchbar onFormSubmit={handleSearchbarSubmit} />
      <Wrapper>
        <ImageGallery
          images={images}
          onImageClick={changeModalData}
          newImageRef={newImageRef}
        />
      </Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        images.length > 0 && <Button onClick={onLoadMore} />
      )}
      {isModalOpen && (
        <Modal modalData={modalData} onModalClose={handleModalClose} />
      )}
    </>
  );
}
