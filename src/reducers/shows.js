import { FETCH_SHOWS_PENDING, FETCH_SHOWS_SUCCESS, FETCH_SHOWS_ERROR } from '../actions/shows';

const initialState = {
  shows: [],
  pending: false,
  error: null
}

export default function showsReducer(
  state = initialState,
  action
) {
  switch(action.type) {
    case FETCH_SHOWS_PENDING:
      return {
        ...state,
        pending: true,
        error: null
      }
    case FETCH_SHOWS_SUCCESS:
      return {
        ...state,
        pending: false,
        shows: action.payload.shows
      }
    case FETCH_SHOWS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
        shows: []
      }
    default:
      return state;
  }
}