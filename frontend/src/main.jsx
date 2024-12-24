import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';

import { legacy_createStore as createStore } from 'redux';
import reducer from './redux/redux';
const store = createStore(reducer);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <App />
  </Provider>,
)
