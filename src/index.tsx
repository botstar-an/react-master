import ReactDOM from 'react-dom/client';
import './index.scss';
import '@ahaui/css/dist/index.min.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './services/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const ReduxProvider = ({ children, reduxStore }: { children: JSX.Element, reduxStore: any }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

root.render(
  <ReduxProvider reduxStore={store}>
    <App/>
  </ReduxProvider>
);
