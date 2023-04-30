import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './Dashboard';
import ErrorPage from './ErrorPage';
import PyodideProvider from './Python/PyodideProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import InvalidFilePage from './InvalidFilePage';
import ReactGA from 'react-ga4';

ReactGA.initialize("G-R9R6XB11HY");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/invalid",
    element: <InvalidFilePage/>
  },
  {
    path: "/dashboard/:sheet_id",
    element: <PyodideProvider><Dashboard/></PyodideProvider>,
  },
  {
    path: "/dashboard/:sheet_id/:sheet_name",
    element: <PyodideProvider><Dashboard/></PyodideProvider>,
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
