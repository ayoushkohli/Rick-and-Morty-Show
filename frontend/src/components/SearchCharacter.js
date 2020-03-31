import React, { Component } from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
`;
const SearchTitle = styled.p`
    font-size: 1rem;
    color: rgb(51,51,51);
`;
const SearchInputBox = styled.input`
    border: 1px solid #ccc;
    padding: 0.62rem;
    color: #000;
    box-shadow: none;
    width: calc(100% - 5rem);
    box-sizing: border-box;
`;
const SearchButton = styled.button`
  padding: 0.63rem 1rem;
  background-color: #eeeeee;
  border: 1px solid #ccc;
  font-weight: 400;
  text-align: center;
  vertical-align: top;
  border-left: 0;
  cursor: pointer;
  width: 5rem;
`;
class SearchCharacter extends Component {
    _handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        this.sendData();
      }
    }
    sendData = () => {
      const inputValue = this.refs.searchInputBox.value;
      inputValue !== '' ? this.props.parentCallback(inputValue) : this.props.parentCallback('');
    }
    render() {
      return (
        <SearchWrapper>
          <SearchTitle>Search by Name</SearchTitle>
          <SearchInputBox
            type="text"
            name="Search"
            placeholder="Search Keyword"
            aria-label="Search"
            ref="searchInputBox"
            onKeyDown={this._handleKeyDown}
          />
          <SearchButton type="submit" onClick={this.sendData}>Search</SearchButton>
        </SearchWrapper>
      );
    }
}

export default SearchCharacter;
