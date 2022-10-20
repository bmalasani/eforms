import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { appLoader, formLoader, homeLoader } from './utils/loaders';
import FormBuilder from './views/FormBuilder';
import FormViewer from './views/FormViewer';
import Home from './views/Home';

export const Router = createBrowserRouter([
  {
    path: '/',
    loader: appLoader,
    element: <App />,
    children: [
      {
        path: '/',
        loader: homeLoader,
        element: <Home />,
      },
      {
        path: 'form',
        element: <FormBuilder />,
      },
      {
        path: 'form/:formId',
        loader: formLoader,
        element: <FormViewer />,
      },
    ],
  },
]);
