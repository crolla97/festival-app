const apiKey = 'y8743OftEsQAKcg2';
const secretKey = '5VHy2Q7B4Y9Fw0RKTb1sykNU-85NaZNR';
const query = '/events?festival=international&size=100&key=' + apiKey;
const signature = createHmac('sha1', secretKey).update(query).digest('hex');
const url = 'https://api.edinburghfestivalcity.com' + query + '&signature=' + signature;

onSubmit = (e) => {
  e.preventDefault();

  fetch(url)
    .then(res => res.json())
    .then(json => this.setState({ genre: json.genre }));
}