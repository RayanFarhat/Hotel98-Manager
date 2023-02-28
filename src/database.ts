import { type Database } from 'better-sqlite3';

const DatabaseConstructor = window.require('better-sqlite3')

export let db: Database;

export function createDB() {

    db = new DatabaseConstructor('data.db', { verbose: console.log });
    console.log(db)
}

export function readDB() {

}

export function addDB() {

}

export function removeDB() {

}

export function updateDB() {

}