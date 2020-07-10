import React from 'react';
import LoaderSpiner from 'react-loader-spinner';

const Loader = () => {
  return (
    <LoaderSpiner
      type="ThreeDots"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
    />
  );
};

export default Loader;
