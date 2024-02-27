import ReactDOM from 'react-dom/client';
import Root from './Root';
import { BrowserRouter } from 'react-router-dom';
import '@styles/reset.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/zipplanet-frontend">
    <Root />
  </BrowserRouter>
);
