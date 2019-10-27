import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import moment from 'moment';
import { timeago } from '../../../modules/dates';
import BlankState from '../../components/BlankState';
import { StyledDocuments, DocumentsList, Document } from './styles';

// import { messages } from '../../queries/Messages.gql';
import { messages } from '../../queries/Messages.gql';
// import { documents } from '../../queries/Documents.gql';

const Documents = ({ data, history }) => (
  <StyledDocuments>
    <header className="clearfix">
      <h2>Messages</h2>
    </header>
    {data.messages && data.messages.length ? (
      <ListGroup>
        {data.messages.map(({ _id, description, url, created_time, updated_time, ticket_id }) => (
          <ListGroupItem key={_id} onClick={() => history.push(`/documents/${_id}`)}>
            <p style={{ fontSize: '18px' }}>{description}</p>
            <a href={url} target="_blank">
              {url}
            </a>
            <p>{moment(created_time).format('LLL')}</p>
          </ListGroupItem>
        ))}
      </ListGroup>
    ) : (
      <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="You're plum out of documents, friend!"
        subtitle="Add your first document by clicking the button below."
      />
    )}
  </StyledDocuments>
);

Documents.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(graphql(messages))(Documents);
