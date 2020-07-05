import React, { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import imageApi from './services/imageApi';
import Modal from './Modal';

import Loader from 'react-loader-spinner';
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

    if (prevTempQuery !== nextTempQuery) {
      return this.fetchImages();
    }
  }

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
          {isLoading && (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000}
            />
          )}
          {images.length > 0 && !isLoading && (
            <button className="Button" type="button" onClick={this.fetchImages}>
              Next
            </button>
          )}
        </div>
      </>
    );
  }
}
