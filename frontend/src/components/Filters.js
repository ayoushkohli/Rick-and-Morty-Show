import React, { Component } from 'react';
import {
  Radio, FormControlLabel, Grid, RadioGroup, FormControl,
} from '@material-ui/core';
import styled from 'styled-components';

const GridContainer = styled.div`
    border: 1px solid #000;
    margin-top: 1rem;
    padding: 0.7rem;
    background: #fff;
`;
const H4 = styled.h4`
    color: #000;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
    padding-bottom: 0.5rem;
    width: 100%;
`;
class Filter extends Component {
    selectedOption = '';

    handleChange = (event) => {
      this.selectedOption = event.target.value;
      this.props.addFilter(event.target.value, event.target.name);
    }

    render() {
      const { key, value } = this.props.filterResponse;
      return (
        <GridContainer className="filter-wrapper">
          <Grid container item xs={12} sm={12}>
            <H4>{key}</H4>
            <FormControl>
              <RadioGroup aria-label={key} name={key} value={this.selectedOption} onChange={this.handleChange}>
                {value.map((item, index) => (
                  <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </GridContainer>
      );
    }
}

export default Filter;
