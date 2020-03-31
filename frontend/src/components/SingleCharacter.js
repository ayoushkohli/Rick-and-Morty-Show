import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import formatDate from '../utils/helpers';

const WrapperContainer = styled.div`
    border-radius: 0.625rem;
    margin-bottom: 0.625rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 2px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    overflow: hidden;
    height: 100%;
`;
const CardHeader = styled.div`
    max-height: 13rem;
    position: relative;
`;
const CardHeaderdetails = styled.div`
    background-color: rgba(32,35,41,0.8);
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0.3rem 0.5rem;
    box-sizing: border-box;
`;
const Avatar = styled.div`
    width: 100%;
    height: 13rem;
    background-size: cover;
`;
const H3 = styled.h3`
    color: rgb(245,245,245);
    font-size: 1.2rem;
    display: block;
    font-weight: 400;
    margin: 0;
    padding:0;
`;
const Span = styled.span`
    font-size: 0.7rem;
    color: rgb(245,245,245);
    padding: 0;
    margin: 0;
`;
const CardContent = styled.div`
    background-color: rgba(51,51,51,1);
    color: rgb(255, 152, 0);
    padding: 1.2rem;
    height: 100%;
`;
const CardContentUL = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;
const CardContentLI = styled.li`
    padding: 0.75rem 0px 0.375rem;
    border-bottom: 1px solid rgb(68, 68, 68);
    margin: 0;
`;
const CardContentSpanLeft = styled.span`
    text-transform: uppercase;
    color: rgb(158,158,158);
    text-align: left;
    width: 30%;
    display: inline-block;
    font-size: 0.7rem;
    padding-right: 0.8rem;
    box-sizing: border-box;
    font-weight: 400;
    vertical-align: middle;
`;
const CardContentSpanRight = styled.span`
    color: rgb(255, 152, 0);
    text-align: right;
    width: 70%;
    display: inline-block;
    font-size: 0.9rem;
    padding-left: 0.8rem;
    box-sizing: border-box;
    font-weight: 400;
    vertical-align: middle;
`;
const SingleCharacter = (props) => {
  const {
    id, name, image, status, species, gender, created, location, origin,
  } = props.characerList;
  return (
    <Grid item xs={6} sm={3}>
      <WrapperContainer>
        <CardHeader>
          <Avatar style={{ backgroundImage: `url(${image})` }} />
          <CardHeaderdetails>
            <H3>{name}</H3>
            <Span>
              id:
              {' '}
              {id}
              {' '}
              created
              {formatDate(created)}
            </Span>
          </CardHeaderdetails>
        </CardHeader>
        <CardContent>
          <CardContentUL>
            <CardContentLI>
              <CardContentSpanLeft>
                Status
              </CardContentSpanLeft>
              <CardContentSpanRight>
                {status}
              </CardContentSpanRight>
            </CardContentLI>
            <CardContentLI>
              <CardContentSpanLeft>
                Species
              </CardContentSpanLeft>
              <CardContentSpanRight>
                {species}
              </CardContentSpanRight>
            </CardContentLI>
            <CardContentLI>
              <CardContentSpanLeft>
                Gender
              </CardContentSpanLeft>
              <CardContentSpanRight>
                {gender}
              </CardContentSpanRight>
            </CardContentLI>
            <CardContentLI>
              <CardContentSpanLeft>
                Origin
              </CardContentSpanLeft>
              <CardContentSpanRight>
                {origin.name}
              </CardContentSpanRight>
            </CardContentLI>
            <CardContentLI>
              <CardContentSpanLeft>
                Last Location
              </CardContentSpanLeft>
              <CardContentSpanRight>
                {location.name}
              </CardContentSpanRight>
            </CardContentLI>
          </CardContentUL>
        </CardContent>
      </WrapperContainer>
    </Grid>
  );
};
SingleCharacter.propTypes = {
  characerList: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    status: PropTypes.string,
    species: PropTypes.string,
    gender: PropTypes.string,
    created: PropTypes.string,
    location: PropTypes.object,
    origin: PropTypes.object,
  }),
};
export default SingleCharacter;
