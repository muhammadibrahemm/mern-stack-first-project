import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TokenContextProvider } from './Hooks/useContext/setToken.jsx'
import { ToastContainer} from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
  <StrictMode>
    <App />
    <ToastContainer 
      bodyClassName="toastBody"
    />
  </StrictMode>,
  </TokenContextProvider>
)
