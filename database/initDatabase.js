import db from './database';

export async function initDatabase() {
  try {

    // tabela usuários
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL
      );
    `);

    // tabela medicamentos
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS medications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        dosagem TEXT NOT NULL,
        horario TEXT NOT NULL,
        user_id INTEGER
      );
    `);

    // tabela lembretes
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        medication_id INTEGER,
        data TEXT,
        status TEXT
      );
    `);

    // tabela registros de saúde
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS health_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT NOT NULL,
        valor TEXT NOT NULL,
        data TEXT,
        user_id INTEGER
      );
    `);

    console.log('Banco inicializado com sucesso!');

  } catch (error) {
    console.log('Erro ao inicializar banco:', error);
  }
}