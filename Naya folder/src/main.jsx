import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
<GoogleOAuthProvider clientId="425667843411-tuka88pdkmcrhnjj1k53b2pu8ka4s3di.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>

    
  </StrictMode>,
)
