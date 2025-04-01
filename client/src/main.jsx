import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { store } from '../src/redux/store.js'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51R4hf92Er7q94asNK09OhlpBxLnJtU2f03w3LuXJkSIh3pU3pU44Qv59bCBgmoJaDhuc5hDadJVX6ziVYYiYgRIU00hG5GKGr5');
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <Elements stripe={stripePromise}>
    <App />
    </Elements>,
    </Provider>
  </StrictMode>,
)
