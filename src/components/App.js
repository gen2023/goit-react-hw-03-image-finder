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
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    isModal: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { images, query } = this.state;
    const { images: prevImage, query: prevQuery } = prevState;

    if (prevQuery !== query) {
      return this.fetchImages();
    }

    if (prevImage.length !== '' && prevImage !== images) {
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
    this.setState({ query: query, images: [], page: 1, error: null });
  };
  fetchImages = () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true });
    const options = {
      query,
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
