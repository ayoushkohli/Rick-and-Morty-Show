import React, { Component } from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const SelectedFilterHeading = styled.h3`
    color: #000000;
    font-size: 1.4rem;
    font-weight: 600;   
    display: block;
    margin-bottom: 0.8rem;
`;
const SelectedFilterUL = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;
const SelectedFilterLi = styled.li`
    display: inline-block;
    background-color: #000;
    color: #fff;
    padding: 0.4rem 0.5rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    text-align: center;
    vertical-align: middle;
    font-size: 1rem;
    margin-right: 1rem;
`;
const SPAN = styled.span`
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    padding-left: 0.3rem;
    cursor: pointer;
`;
class SelectedFilters extends Component {
    handleClick = (key) => {
      let referenceFilter = key;
      if(referenceFilter.includes('Species'))
        referenceFilter = 'speciesRef';
      else if (referenceFilter.includes('Gender'))
        referenceFilter = 'genderRef';
      else if (referenceFilter.includes('Location'))
        referenceFilter = 'locationRef';
      this.props.removeFilter(key,referenceFilter);
    }
    render() {
      if (this.props.selectedFilters.selectedSpeciesFilter == null
            && this.props.selectedFilters.selectedGenderFilter == null
            && this.props.selectedFilters.selectedLocationFilter == null
      ) {
        return false;
      }
      return (
        <div className="selected-filter-wrapper">
          <SelectedFilterHeading>Selected Filters</SelectedFilterHeading>
          <SelectedFilterUL>
            {Object.keys(this.props.selectedFilters).map((key) => (
              (this.props.selectedFilters[key] !== null)
                ? (
                  <SelectedFilterLi key={key} index={key}>
                    {this.props.selectedFilters[key]}
                    <SPAN>
                      <CloseIcon style={{ fontSize: 20 }} onClick={() => this.handleClick(key, this.props.selectedFilters[key])} />
                    </SPAN>
                  </SelectedFilterLi>
                )
                : ''
            ))}
          </SelectedFilterUL>
        </div>
      );
    }
}

export default SelectedFilters;
