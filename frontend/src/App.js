// App.js
import React, { Component } from 'react';
import { Container, CircularProgress, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import fetchDataQuery from './services/fetchData';
import Filter from './components/filters/Filters';
import CharcterList from './components/characterList/CharacterList';
import SearchCharacter from './components/searchCharacter/SearchCharacter';
import SortCharacterList from './components/sortCharacter/SortCharacterList';
import SelectedFilters from './components/selectedFilters/SelectedFilters';
import { H2, CharacterListWrapper } from './appStyle';
import appConfig from './config/config';

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
    pageSetting: {
      pageCount: null,
      pages: null,
      currentPage: 1
    }
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
      const fetchedJSONResponse = fetchDataQuery(appConfig.ENDPOINT_URL, value, this.state.pageSetting)
        .then((response) => response.json());
      fetchedJSONResponse.then((responseAsJson) => {
        let pageSetting = this.state.pageSetting;
        if (responseAsJson.data.characters) {
          const PageCount = Math.round(responseAsJson.data.characters.info.count / 20); //20 is the default results provided by the API
          pageSetting.pages = responseAsJson.data.characters.info.pages || 0;
          pageSetting.pageCount = PageCount;
        } else {
          pageSetting.pageCount = 0;
        }
        this.setState({
          loading: false,
          data: responseAsJson.data,
          pageSetting: pageSetting
        });
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
    } else if (filterName === this.originFilterResponse.key) {
      selectedFiltersArray.selectedFilters.selectedLocationFilter = filterValue;
    }
    let pageSetting = this.state.pageSetting;
    pageSetting.currentPage = 1;
    this.setState({ filtersObject: selectedFiltersArray, loading: false, pageSetting });
    this.fetchData(this.state.filtersObject);
  }

  removeFilter = (filterName, referenceFilterName) => {
    const selectedFiltersArray = this.state.filtersObject;
    selectedFiltersArray.selectedFilters[filterName] = null;
    this.resetFilterValue(referenceFilterName);
    let pageSetting = this.state.pageSetting;
    pageSetting.currentPage = 1;
    this.setState({ filtersObject: selectedFiltersArray, loading: false, pageSetting });
    this.fetchData(this.state.filtersObject);
  }
  resetFilterValue = (filterName) => {
    if (filterName === 'speciesRef')
      this.refs.speciesRef.removeFilterHandler();
    else if (filterName === 'genderRef')
      this.refs.genderRef.removeFilterHandler();
    else if (filterName === 'locationRef')
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
  handlePagination = (value) => {
    let prevState = this.state.pageSetting;
    prevState.currentPage = value;
    this.setState({ pageSetting: prevState });
    this.fetchData(this.state.filtersObject);
  }
  render() {
    return (
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3} md={2}>
            <H2>Filters</H2>
            <div className="filter-wrapper">
              <Filter filterResponse={this.speciesFilterResponse} addFilter={this.addFilter} ref="speciesRef" />
              <Filter filterResponse={this.genderFilterResponse} addFilter={this.addFilter} ref='genderRef' />
              <Filter filterResponse={this.originFilterResponse} addFilter={this.addFilter} ref="locationRef" />
            </div>
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
                (!this.state.loading && this.state.data) ?
                  <React.Fragment>
                    <CharcterList data={this.state.data} />
                    {(this.state.pageSetting.pageCount > 0) ?
                      <Pagination id="pagination" count={this.state.pageSetting.pageCount}
                        page={this.state.pageSetting.currentPage} defaultPage={1} boundaryCount={5}
                        color="secondary" variant="outlined" onChange={this.handlePagination} /> : ''}
                  </React.Fragment> :
                  <CircularProgress color="secondary" />
              }
            </CharacterListWrapper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
