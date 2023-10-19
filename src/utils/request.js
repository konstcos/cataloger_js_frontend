import axios from 'axios';
import settings from '@/settings'

const request = axios.create({
    baseURL: settings.baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
});

export default request;
