import axios from 'axios';

const API_KEY = '27031452-a137835af82b3a6efb2323c99';
const BASE_URL = 'https://pixabay.com/api/';

class API {
  constructor() {
    this.service = axios.create({
      baseURL: BASE_URL,
      params: {
        q: '',
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        page: 1,
        per_page: 12,
      },
    });
  }

  async getQueryImages(q) {
    this.params.q = q;
    return await this.service.get();
  }

  async getPageImage(page) {
    this.params.page = page;
    return await this.service.get();
  }

  get params() {
    return this.service.defaults.params;
  }

  set params(value) {
    this.service.defaults.params = value;
  }
}

export default API;