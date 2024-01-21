import ky, { Options } from 'ky';

interface ApiConfig extends Options {
    // Add custom properties if needed
}

const apiConfig: ApiConfig = {
    mode: 'cors',
    prefixUrl: `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`,
    credentials: 'include',
    redirect: 'follow'
};

const api = ky.create(apiConfig);

export default api;
