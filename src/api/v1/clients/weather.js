import axios from 'axios';

const client = axios.create({ timeout: 5000 });

export default client;
