import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.jsx'
import{ BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthProvider.jsx'
import { SocketContextProvider } from './context/socketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <SocketContextProvider>
    <App />
    </SocketContextProvider>
    </AuthProvider>
  </BrowserRouter>
)
