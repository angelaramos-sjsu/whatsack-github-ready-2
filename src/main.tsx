import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import './styles/quiet-canvas.css';
import './styles/read-aloud.css';
import './styles/design-system.css';
import './styles/companion.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
