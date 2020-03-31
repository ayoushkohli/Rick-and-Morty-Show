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
    padding: 0.6rem;
    color: #000;
    box-shadow: none;
    width: 15rem;
`;
const SearchButton = styled.button`
    padding: 0.59rem 1rem;
    background-color: #eeeeee;
    border: 1px solid #ccc;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
`;
class SearchCharacter extends Component {
    _handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        this.sendData();
      }
    }

    sendData = () => {
      const inputValue = this.refs.searchInputBox.value;
      inputValue !== '' ? this.props.parentCallback(inputValue) : this.isError = true;
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
