import React, { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import imageApi from './services/imageApi';
import Modal from './Modal';
import Loader from './Loader/Loader';
import Button from './Button';

import './index.css';

export default class App extends Component {
  state = {
    images: [],
    tempQuery: '',
    page: 1,
    isLoading: false,
    error: null,
    isModal: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevTempQuery = prevState.tempQuery;
    const nextTempQuery = this.state.tempQuery;
    const prevImages = prevState.images;
    const nextImages = this.state.images;

    if (prevTempQuery !== nextTempQuery) {
      return this.fetchImages();
    }

    if (prevImages.length !== '' && prevImages !== nextImages) {
      this.scrol();
    }
  }

  scrol = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  onSubmitForm = query => {
    this.setState({ tempQuery: query, images: [], page: 1, error: null });
  };
  fetchImages = () => {
    const { page, tempQuery } = this.state;
    this.setState({ isLoading: true });
    const options = {
      tempQuery,
      page,
    };
    imageApi
      .imageAxios(options)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = image => {
    this.setState(prevState => ({
      isModal: !prevState.isModal,
      currentImage: prevState.isModal ? null : image,
    }));
  };

  handleImageClick = image => {
    this.toggleModal(image);
  };

  render() {
    const { images, isLoading, error, isModal, currentImage } = this.state;

    return (
      <>
        {isModal && <Modal image={currentImage} onToggle={this.toggleModal} />}
        {error && <h1>ERROR</h1>}
        <Searchbar onSubmitForm={this.onSubmitForm} />

        <ImageGallery images={images} onClick={this.handleImageClick} />
        <div className="button_and_loader">
          {isLoading && <Loader />}
          {images.length > 0 && !isLoading && (
            <Button onClick={this.fetchImages} />
          )}
        </div>
      </>
    );
  }
}
