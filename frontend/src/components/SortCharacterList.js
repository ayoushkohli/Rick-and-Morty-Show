import React, { Component } from 'react';
import { Select, FormControl, InputLabel } from '@material-ui/core';
import styled from 'styled-components';

const SortWrapper = styled.div`
    max-width: 12rem;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    float: right;
`;
class SortCharacterList extends Component {
    selectedValue = '';

    handleChange = (event) => {
      this.selectedValue = event.target.value;
      this.props.SortCharacterListFn(this.selectedValue);
    }

    render() {
      return (
        <SortWrapper>
          <FormControl variant="filled">
            <InputLabel htmlFor="sort-character-list">Sort</InputLabel>
            <Select
              native
              value={this.selectedValue}
              onChange={this.handleChange}
              inputProps={{
                name: 'sort',
                id: 'sort-character-list',
              }}
            >
              <option value="asc">Ascending</option>
              <option value="dec">Descending</option>
            </Select>
          </FormControl>
        </SortWrapper>
      );
    }
}

export default SortCharacterList;
