import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Panel, Button, FormGroup, FormControl } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import axios from 'axios';
import DocumentEditor from '../../components/DocumentEditor';
import Loading from '../../components/Loading';
import NotFound from '../NotFound';
import Icon from '../../components/Icon';
import { editTicket as editTicketQuery } from '../../queries/Tickets.gql';

// const EditDocument = ({ data, history }) => (
//   <React.Fragment>
//     {!data.loading ? (
//       <React.Fragment>
//         {data.document ? <DocumentEditor doc={data.document} history={history} /> : <NotFound />}
//       </React.Fragment>
//     ) : (
//       <Loading />
//     )}
//   </React.Fragment>
// );

class EditDocument extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      ans: '',
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(ticket) {
    console.log('submit');
    const text = this.state.ans;
    const payload = {
      user_id: this.props.userId,
      message_id: ticket.message_id,
      text,
      name: 'tatat',
    };
    console.log('payload = ', payload);
    axios
      .post('http://5db587624e41670014ef2a4d.mockapi.io/comments', payload)
      .then((response) => {
        console.log(response);
        alert(`'reply successful'`);
      })
      .catch((error) => {
        alert(`'reply error'`);
        console.log(error);
      });
  }

  render() {
    const { data, history } = this.props;
    const { ticket } = data;
    return !data.loading ? (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <span>Ticket #{ticket._id}</span>
            <span style={{ float: 'right' }}>
              <a href={ticket.url} target="_blank">
                <Icon iconStyle="solid" icon="link" /> Link
              </a>
            </span>
          </Panel.Heading>
          <Panel.Body>
            <span>{moment(ticket.created_time).format('LLL')}</span>
            <p style={{ fontSize: '17px', paddingTop: '12px', paddingBottom: '16px' }}>
              {ticket.description}
            </p>
            <p>
              status:
              {ticket.status}
            </p>
            <p>
              tags:
              {ticket.tags}
            </p>
          </Panel.Body>
        </Panel>
        <form>
          <FormGroup controlId="formans">
            <FormControl
              type="text"
              defaultValue={this.state.ans}
              placeholder="Reply comment"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button bsStyle="primary" onClick={() => this.handleSubmit(ticket)}>
            Submit
          </Button>
        </form>
      </React.Fragment>
    ) : (
        <Loading />
      );
  }
}

EditDocument.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default graphql(editTicketQuery, {
  options: ({ match }) => ({
    variables: {
      _id: match.params._id,
    },
  }),
})(EditDocument);
