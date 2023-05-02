import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { FeedProvider } from './feedProvider/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <FeedProvider>
            <App />
        </FeedProvider>
    </React.StrictMode>,
);
