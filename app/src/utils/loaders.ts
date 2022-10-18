import { defer } from 'react-router-dom';

export const appLoader = () => {
  return defer({
    user: new Promise((resolve, reject) => {
      fetch('/api/user/nani')
        .then((res) => {
          res.json().then((data) => {
            setTimeout(() => {
              resolve(data);
            }, 1000 * 1);
          });
        })
        .catch((reason) => reject(reason));
    }),
  });
};

export const homeLoader = () => {
  return defer({
    stats: new Promise((resolve, reject) => {
      fetch('/api/stats/nani')
        .then((res) => {
          res.json().then((data) => {
            setTimeout(() => {
              resolve(data);
            }, 1000 * 5);
          });
        })
        .catch((reason) => reject(reason));
    }),
    requests: fetch('/api/requests').then((res) => res.json()),
  });
};
