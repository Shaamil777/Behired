import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google'

const clientId = '755075472737-ffnon2789mba6uvq0eo0nftcounhl4eg.apps.googleusercontent.com'

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={clientId}>
        <App />
    </GoogleOAuthProvider>
)
