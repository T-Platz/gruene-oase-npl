import ky, { Options } from 'ky';

interface ApiConfig extends Options {
    // Add custom properties if needed
}

const apiConfig: ApiConfig = {
    mode: 'cors',
    prefixUrl: 'http://localhost:8000',
    credentials: 'include',
    redirect: 'follow'
};

const api = ky.create(apiConfig);

export default api;
