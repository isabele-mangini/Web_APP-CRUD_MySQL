import React from 'react';
import './index.css';
import App from './App';
import rootReducer from './reducers'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({ reducer: rootReducer })

const reactRoot = createRoot(document.getElementById('root'));

reactRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
)
