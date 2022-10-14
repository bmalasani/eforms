import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Example from './views/Example';
import Home from './views/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    loader:undefined,
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'contact',
        element: <Example />,
      },
      {
        path: 'dashboard',
        element: <Example />,
        loader: ({ request }) =>
          fetch('/api/dashboard.json', {
            signal: request.signal,
          }),
      },
    ],
  },
]);
