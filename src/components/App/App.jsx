import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppContainer } from './App.styled';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

class App extends Component {
  state = {
    queryName: '',
  };

  handleFormSubmit = queryName => {
    if (!queryName) {
      toast.error('Please enter your query');
    }
    this.setState({ queryName });
  };

  render() {
    const { queryName } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <AppContainer>
          <ToastContainer />

          <ImageGallery query={queryName} />
        </AppContainer>
      </>
    );
  }
}

export default App;
