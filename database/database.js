import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('medcontrol.db');

export default db;