import React, { Component } from 'react';

import { AppContainer } from './App.styled';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

class App extends Component {
  state = {
    queryName: '',
  };

  handleFormSubmit = (queryName) => {
    this.setState({queryName,})
  }

  render() {
    const {queryName }= this.state; 

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        <ImageGallery query={queryName}/>
      </AppContainer>
    );
  }
}

export default App;
