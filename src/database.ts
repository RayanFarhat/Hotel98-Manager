import { type Database } from 'better-sqlite3';

export let db: Database;

// typescript can't find db prop in window
declare global {
    interface Window {
        db: any;
    }
}

export async function createDB() {
    await window.db.create();
}

export async function readDB() {
    await window.db.read();
}

export async function addDB() {
    await window.db.add();
}

export async function removeDB() {
    await window.db.remove();
}

export async function updateDB() {
    await window.db.update();
}