import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        https: {
            key: fs.readFileSync('C:/Users/Admin/key.pem'),
            cert: fs.readFileSync('C:/Users/Admin/cert.pem'),
        },
    },
});
