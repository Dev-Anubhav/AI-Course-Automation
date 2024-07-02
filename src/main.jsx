import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SearchProvider } from './Components/SearchContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <SearchProvider>
 <App />
    </SearchProvider>
)
