import axios from 'axios';

const $publicHost = axios.create({
  baseURL: "https://connections-api.herokuapp.com/",
  headers: {
    'Content-Type': 'application/json',
  },
});

const $privateHost = axios.create({
  baseURL: "https://connections-api.herokuapp.com/",
  headers: {
    'Content-Type': 'application/json',
  },
});

const authInterceptor = config => {
  config.headers['Authorization'] = localStorage.getItem('token');
  return config;
};

$privateHost.interceptors.request.use(authInterceptor);

// {
//     baseURL: "https://connections-api.herokuapp.com/",
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': localStorage.getItem('token'),
//     },
//  }

export const UserAPI = {
  async register(formData) {
    const { data } = await $publicHost.post(`users/signup`, formData);
    return await data;
  },
  async login(formData) {
    const { data } = await $publicHost.post(`users/login`, formData);
    return await data;
  },
  async getUserDetailsRequest(signal) {
    const { data } = await $privateHost.get(`/users/current`, { signal });
    return await data;
  },
  async userLogOutRequest() {
    const { data } = await $privateHost.post(`/users/logout`);
    return await data;
  },
};

export const ContactsAPI = {
  async getContactsRequest(signal) {
    const { data } = await $privateHost.get(`/contacts`, { signal });
    return await data;
  },
  async addContactRequest(contactData) {
    const { data } = await $privateHost.post(`/contacts`, { ...contactData });
    return await data;
  },
  async deleteContactRequest(contactId) {
    const { data } = await $privateHost.delete(`/contacts/${contactId}`);
    return await data;
  },
};