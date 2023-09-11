import { useState, useRef } from 'react';
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

export default function Searchbar({ onSubmit }) {
  const [queryValue, setQueryValue] = useState('');

  const initialValue = useRef({ query: '' });

  const handleInputChange = e => {
    setQueryValue(e.target.value)
  };

  const handleSubmit = () => {
    onSubmit(queryValue);
    setQueryValue('')
  };

  return (
    <SearchBarContainer>
      <Formik initialValues={initialValue.current} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchFormBtn type="submit">
            <Icon width="20" height="20" />
            <BtnLabel>Search</BtnLabel>
          </SearchFormBtn>

          <Input
            value={queryValue}
            onChange={handleInputChange}
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
