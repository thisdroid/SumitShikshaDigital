import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store.js';
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/common_components/ErrorBoundary.jsx';
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <HelmetProvider>
           <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <App />
        </HelmetProvider>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)