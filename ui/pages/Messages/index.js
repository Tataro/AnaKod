import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import moment from 'moment';
import { timeago } from '../../../modules/dates';
import BlankState from '../../components/BlankState';
import { StyledDocuments, DocumentsList, Document } from './styles';
import Icon from '../../components/Icon';
import { tickets } from '../../queries/Tickets.gql';
import { messages } from '../../queries/Messages.gql';
// import { documents } from '../../queries/Documents.gql';

const Documents = ({ messageQ, ticketQ, history }) => {
  console.log('messageQ', messageQ);
  console.log('ticketQ', ticketQ);
  return (
    <StyledDocuments>
      <header className="clearfix">
        <h2>Messages</h2>
      </header>
      {messageQ.messages && messageQ.messages.length ? (
        <div style={{ maxHeight: '380px', overflow: 'scroll' }}>
          <ListGroup>
            {messageQ.messages.map(
              ({ _id, description, url, created_time, updated_time, ticket_id }) => (
                <ListGroupItem key={_id} onClick={() => history.push(`/messages/${_id}`)}>
                  <p style={{ fontSize: '18px' }}>{description}</p>
                  <a href={url} target="_blank">
                    {url}
                  </a>
                  <p>{moment(created_time).format('LLL')}</p>
                </ListGroupItem>
              ),
            )}
          </ListGroup>
        </div>
      ) : (
        <BlankState
          icon={{ style: 'solid', symbol: 'file-alt' }}
          title="You're plum out of documents, friend!"
          subtitle="Add your first document by clicking the button below."
        />
      )}
      <div className="clearfix">
        <h2>Tickets</h2>
        {ticketQ.tickets && ticketQ.tickets.length ? (
          <div style={{ maxHeight: '380px', overflow: 'scroll' }}>
            <ListGroup>
              {ticketQ.tickets.map(({ _id, description, url, created_time }) => (
                <ListGroupItem key={_id} onClick={() => history.push(`/tickets/${_id}`)}>
                  <div>
                    <span style={{ float: 'right' }}>#{_id}</span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '18px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {description}
                    </p>
                    <a href={url} target="_blank">
                      {url}
                    </a>
                    <p>{moment(created_time).format('LLL')}</p>
                  </div>
                  <p style={{ position: 'absolute', bottom: 0, right: '15px' }}>
                    <Icon iconStyle="solid" icon="user" /> ธนาธร จึงรุ่งเรืองกิจ
                  </p>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        ) : (
          <BlankState
            icon={{ style: 'solid', symbol: 'file-alt' }}
            title="You're plum out of documents, friend!"
            subtitle="Add your first document by clicking the button below."
          />
        )}
      </div>
    </StyledDocuments>
  );
};

Documents.propTypes = {
  // data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  graphql(messages, { name: 'messageQ' }),
  graphql(tickets, { name: 'ticketQ' }),
)(Documents);
