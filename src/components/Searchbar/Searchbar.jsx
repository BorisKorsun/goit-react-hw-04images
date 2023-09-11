import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchBarContainer } from './Searchbar.styled';
import { Formik } from 'formik';
import {
  SearchForm,
  SearchFormBtn,
  BtnLabel,
  Input,
  Icon,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    queryValue: '',
  };

  initialValue = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ queryValue: e.target.value });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { queryValue } = this.state;
    onSubmit(queryValue);
    this.setState({ queryValue: '' });
  };

  render() {
    const { queryValue } = this.state;

    return (
      <SearchBarContainer>
        <Formik initialValues={this.initialValue} onSubmit={this.handleSubmit}>
          <SearchForm>
            <SearchFormBtn type="submit">
              <Icon width="20" height="20" />
              <BtnLabel>Search</BtnLabel>
            </SearchFormBtn>

            <Input
              value={queryValue}
              onChange={this.handleInputChange}
              name="query"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </Formik>
      </SearchBarContainer>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
