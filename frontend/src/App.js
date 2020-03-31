// App.js
import React, { Component } from 'react';
import { Container, CircularProgress, Grid } from '@material-ui/core';
import styled from 'styled-components';
import fetchDataQuery from './components/fetchData';
import Filter from './components/Filters';
import CharcterList from './components/CharacterList';
import SearchCharacter from './components/SearchCharacter';
import SortCharacterList from './components/SortCharacterList';
import SelectedFilters from './components/SelectedFilters';
import ENDPOINT_URL from './config/config';

const H2 = styled.h2`
  color: #000;
  font-size: 1.4rem;
  font-weight: 600;
`;
const CharacterListWrapper = styled.div`
  background: rgb(32, 35, 41);
  padding: 0.5rem;
  height: calc(100% - 8.5rem);
`;

class App extends Component {
  state = {
    loading: false,
    data: null,
    filtersObject: {
      selectedFilters: {
        selectedSpeciesFilter: null,
        selectedGenderFilter: null,
        selectedLocationFilter: null,
      },
      searchValue: null,
    },
  };

  speciesFilterResponse = {
    key: 'Species',
    value: ['Human', 'Mytholog', 'Alien'],
  }

  genderFilterResponse = {
    key: 'Human',
    value: ['Male', 'Female'],
  }

  originFilterResponse = {
    key: 'Status',
    value: ['Alive', 'Dead', 'Unknown'],
  }

  fetchData = (value) => {
    this.setState({ loading: true }, () => {
      const fetchedJSONResponse = fetchDataQuery(ENDPOINT_URL, value)
        .then((response) => response.json());
      fetchedJSONResponse.then((responseAsJson) => {
        this.setState({ loading: false, data: responseAsJson.data });
      });
    });
  }

  componentDidMount() {
    this.fetchData(this.state.filtersObject);
  }

  addFilter = (filterValue, filterName) => {
    const selectedFiltersArray = this.state.filtersObject;
    if (filterName === this.speciesFilterResponse.key) {
      selectedFiltersArray.selectedFilters.selectedSpeciesFilter = filterValue;
    } else if (filterName === this.genderFilterResponse.key) {
      selectedFiltersArray.selectedFilters.selectedGenderFilter = filterValue;
    }else if (filterName === this.originFilterResponse.key) {
      selectedFiltersArray.selectedFilters.selectedLocationFilter = filterValue;
    }
    this.setState({ filtersObject: selectedFiltersArray, loading: false });
    this.fetchData(this.state.filtersObject);
  }

  removeFilter = (filterName,referenceFilterName) => {
    const selectedFiltersArray = this.state.filtersObject;
    selectedFiltersArray.selectedFilters[filterName] = null;
    this.resetFilterValue(referenceFilterName);
    this.setState({ filtersObject: selectedFiltersArray, loading: false });
    this.fetchData(this.state.filtersObject);
  }
  resetFilterValue = (filterName) => {
    if(filterName === 'speciesRef')
      this.refs.speciesRef.removeFilterHandler();
    else if(filterName === 'genderRef')
      this.refs.genderRef.removeFilterHandler();
    else if(filterName === 'locationRef')
      this.refs.locationRef.removeFilterHandler();
  }
  
  searchCharacterFn = (childData) => {
    const selectedFiltersArray = this.state.filtersObject;
    selectedFiltersArray.searchValue = childData;
    this.setState({ loading: false, filtersObject: selectedFiltersArray });
    this.fetchData(this.state.filtersObject);
  }

  sortCharacterList = (order) => {
    const state = this.state.data;
    state.characters.results.reverse();
    this.setState({ data: state });
  }

  render() {
    return (
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3} md={2}>
            <H2>Filters</H2>
            <Filter filterResponse={this.speciesFilterResponse} addFilter={this.addFilter} ref="speciesRef"/>
            <Filter filterResponse={this.genderFilterResponse} addFilter={this.addFilter} ref='genderRef'/>
            <Filter filterResponse={this.originFilterResponse} addFilter={this.addFilter} ref="locationRef"/>
          </Grid>
          <Grid item xs={12} sm={9} md={10}>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <SelectedFilters selectedFilters={this.state.filtersObject.selectedFilters} 
                  removeFilter={this.removeFilter} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SearchCharacter parentCallback={this.searchCharacterFn} />
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <SortCharacterList SortCharacterListFn={this.sortCharacterList} />
              </Grid>
            </Grid>
            <CharacterListWrapper>
              {
                (!this.state.loading && this.state.data)
                  ? <CharcterList data={this.state.data} /> : <CircularProgress color="secondary" />
              }
            </CharacterListWrapper>

          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
