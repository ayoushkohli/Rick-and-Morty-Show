import React, { Component } from 'react';
import { fetchAutoSuggestionQuery } from '../../services/fetchData';
import Autosuggestion from '../Autosuggestion/Autosuggestion';
import appConfig from '../../config/config';
import { SearchWrapper, SearchTitle, SearchInputBox, SearchButton } from './style';

class SearchCharacter extends Component {
  state = {
    typingTimeout: null,
    suggestion: null
  };
  _handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.sendData();
    }
  }
  sendData = () => {
    const inputValue = this.refs.searchInputBox.value;
    inputValue !== '' ? this.props.parentCallback(inputValue) : this.props.parentCallback('');
  }
  onFieldChange = (event) => {
    const value = event.target.value;
    clearTimeout(this.state.typingTimeout);
    this.state.typingTimeout = setTimeout(() => {
      this.setState({suggestion: null});
      const fetchedJSONResponse = fetchAutoSuggestionQuery(appConfig.ENDPOINT_URL, value)
        .then((response) => response.json());
      fetchedJSONResponse.then((responseAsJson) => {
        if(responseAsJson.data.characters) {
          this.setState({suggestion: responseAsJson.data.characters.results});
        }
      });
    }, 300);
  }
  onSelect = (value) =>{
    this.refs.searchInputBox.value = value;
    this.setState({suggestion: null});
    this.sendData();
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
          autoComplete= "off"
          onKeyDown={this._handleKeyDown}
          onChange={this.onFieldChange}
        />
        <SearchButton type="submit" onClick={this.sendData}>Search</SearchButton>
        {(this.state.suggestion) ?
          <Autosuggestion data={this.state.suggestion} handleClick={this.onSelect} />:''
         }
      </SearchWrapper>
    );
  }
}

export default SearchCharacter;
