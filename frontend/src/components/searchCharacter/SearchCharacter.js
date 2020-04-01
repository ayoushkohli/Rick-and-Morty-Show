import React, { Component } from 'react';
import { SearchWrapper, SearchTitle, SearchInputBox, SearchButton } from './style';

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
