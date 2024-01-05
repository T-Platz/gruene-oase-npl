import ky, { Options } from 'ky';

// Define an interface for your API configuration options if needed
interface ApiConfig extends Options {
    // Add any custom properties you might need
}

const apiConfig: ApiConfig = {
    mode: 'cors',
    prefixUrl: 'http://localhost:8000', // Your backend URL
    // referrerPolicy: 'origin-when-cross-origin', // Uncomment if needed
    // hooks: 'interceptors', // Adjust this if you have specific interceptors
    credentials: 'include',
    redirect: 'follow'
};

const api = ky.create(apiConfig);

export default api;
