import { defer } from 'react-router-dom';
import { KeyRequisationForm } from './data';

export const appLoader = () => {
  return defer({
    user: new Promise((resolve, reject) => {
      fetch('/api/user/atuny0')
        .then((res) => {
          res.json().then((data) => {
            resolve(data);
          });
        })
        .catch((reason) => reject(reason));
    }),
  });
};

export const homeLoader = () => {
  return defer({
    stats: new Promise((resolve, reject) => {
      fetch('/api/stats/atuny0')
        .then((res) => {
          res.json().then((data) => {
            resolve(data);
          });
        })
        .catch((reason) => reject(reason));
    }),
    requests: [],
  });
};

export const formLoader = ({ request, params }: any) => {
  return defer({
    form: new Promise((resolve, reject) => {
      fetch('/api/forms')
        .then((res) => {
          res.json().then((data) => {
            setTimeout(() => {
              resolve(KeyRequisationForm);
            }, 1000 * 5);
          });
        })
        .catch((reason) => reject(reason));
    }),
  });
};
