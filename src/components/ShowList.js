import React from 'react';
import { connect } from 'react-redux';
import { fetchShows } from '../actions/shows';
// import ShowListItem from './ShowListItem';
import uuid from 'uuid';

class ShowList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchShows());
  };

  render() {
    const { error, pending, shows } = this.props;

    if(error) {
      return <div>Error! {error.message}</div>;
    }

    if(pending) {
      return <div>Loading...</div>
    }
    
    const task = shows.map(show => {
      const imageHash = Object.keys(show.images)[0];
      const title = show.title;
      const image = show.images[`${imageHash}`].versions.original.url;
      const artist = show.artist;
      const teaser = show.description_teaser;
      return (
        <div>
          <img src={image} alt="thumbnail"/>
          <h3>{title}</h3>
          <p>{artist}</p>
          <p>{teaser}</p>
        </div>
    )
    })

    return <div>{task}</div>
  }
}

const mapStateToProps = state => ({
  shows: state.shows.shows,
  pending: state.shows.pending,
  error: state.shows.error
});

export default connect(mapStateToProps)(ShowList);