import { createHmac} from 'crypto';

const apiKey = 'y8743OftEsQAKcg2';
const secretKey = '5VHy2Q7B4Y9Fw0RKTb1sykNU-85NaZNR';
const query = '/events?festival=international&size=5&key=' + apiKey;
const signature = createHmac('sha1', secretKey).update(query).digest('hex');
const url = 'https://api.edinburghfestivalcity.com' + query + '&signature=' + signature;

export function fetchShows() {
  return dispatch => {
    dispatch(fetchShowsPending());
    fetch(url)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(fetchShowsSuccess(json));
      return json;
    })
    .catch(error => {
      dispatch(fetchShowsError(error));
    })
  }
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_SHOWS_PENDING = 'FETCH_SHOWS_PENDING';
export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
export const FETCH_SHOWS_ERROR = 'FETCH_SHOWS_ERROR';


export const fetchShowsPending = () => ({
    type: FETCH_SHOWS_PENDING
});

export const fetchShowsSuccess = shows => ({
  type: FETCH_SHOWS_SUCCESS,
  payload: { shows }
});

export const fetchShowsError = error => ({
  type: FETCH_SHOWS_ERROR,
  payload: { error }
});
