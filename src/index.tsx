import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from "./store";
import {Provider} from "react-redux";

export const DB: Promise<unknown> = openDB('tasks', 1);

async function openDB(dbName: string, dbVersion: number) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = (event: any) => {
            reject('Ошибка при открытии базы данных: ' + event.target.error);
        };

        request.onsuccess = (event: any) => {
            const db = event.target.result;
            resolve(db);
        };

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            const store = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
            store.createIndex('by_id', 'id', { unique: false });
        };
    });
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

