import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import formatDate from '../../utils/helpers';
import { WrapperContainer, CardHeader, 
  CardHeaderdetails, Avatar, H3, CardContent, 
  CardContentLI, CardContentUL, CardContentSpanLeft, 
  CardContentSpanRight, Span } from './style';

const SingleCharacter = (props) => {
  const {
    id, name, image, status, species, gender, created, location, origin,
  } = props.characerList;
  return (
    <Grid item xs={6} sm={4} md={3}>
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
