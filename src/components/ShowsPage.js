import React from 'react';
import { connect } from 'react-redux';
import { fetchShows } from '../actions/shows'
import uuid from 'uuid';

class ShowsPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchShows());
  }

  render() {
    const { error, pending, shows } = this.props;

    if(error) {
      return <div>Error! {error.message}</div>;
    }

    if(pending) {
      return <div>Loading...</div>
    }

    return (
      <ul>
        {shows.map(show => (
          <li key={uuid()}>{show.title}</li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  shows: state.shows.shows,
  pending: state.shows.pending,
  error: state.shows.error
});

export default connect(mapStateToProps)(ShowsPage);