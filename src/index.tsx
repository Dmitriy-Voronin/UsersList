import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter, HashRouter } from "react-router-dom";

import { store } from './store/store';
import { Provider } from 'react-redux';

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <HashRouter basename="/">
        <App />
      </HashRouter>
    </Provider>
  );
};


