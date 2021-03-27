let BASE_URL = 'http://47.98.152.179';
if (process.env.NODE_ENV === 'DEV') {
  BASE_URL = '';
}

export default BASE_URL;
