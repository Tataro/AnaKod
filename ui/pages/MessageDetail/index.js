import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Panel, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import axios from 'axios';
import DocumentEditor from '../../components/DocumentEditor';
import Loading from '../../components/Loading';
import NotFound from '../NotFound';
import Icon from '../../components/Icon';
import { editMessage as editMessageQuery } from '../../queries/Messages.gql';

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

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      ans: '',
    };
  }

  handleSubmit(message) {
    console.log('submit');
    console.log('message', message)
    // const text = this.state.ans;
    const payload = {
      message_id: message._id,
      tags: ['การเมือง'],
      area_tag: 'Bangkok'
    };
    console.log('payload = ', payload);
    axios
      .post('http://165.22.103.247:4000/ticket', payload)
      .then((response) => {
        console.log(response);
        alert(`'create ticket successful'`);
      })
      .catch((error) => {
        alert(`'create error'`);
        console.log(error);
      });
  }

  render() {
    const { data, history } = this.props;
    const { message } = data;
    console.log('message', message)
    return !data.loading ? (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <span>Message #{message._id}</span>
            <span style={{ float: 'right' }}>
              <a href={message.url} target="_blank">
                <Icon iconStyle="solid" icon="link" /> Link
              </a>
            </span>
          </Panel.Heading>
          <Panel.Body>
            <span>{moment(message.created_time).format('LLL')}</span>
            <p style={{ fontSize: '17px', paddingTop: '12px', paddingBottom: '16px' }}>
              {message.description}
            </p>
            {message.ticket_id && <p>ticket id: {message.ticket_id}</p>}
          </Panel.Body>
        </Panel>
        <form>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select Assignee</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">จิรายุ</option>
              <option value="other">กิตติทัต</option>
              <option value="ot">ธนาธร</option>
            </FormControl>
          </FormGroup>
          <Button bsStyle="primary" onClick={() => this.handleSubmit(message)}>
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

export default graphql(editMessageQuery, {
  options: ({ match }) => ({
    variables: {
      _id: match.params._id,
    },
  }),
})(EditDocument);
