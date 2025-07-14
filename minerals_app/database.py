import sqlite3
from pathlib import Path

DB_FILE = Path(__file__).resolve().parent / 'minerals.db'

CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS minerals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    color TEXT,
    location TEXT,
    notes TEXT
);
"""


def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.execute('PRAGMA foreign_keys = ON')
    return conn


def initialize_db():
    with get_connection() as conn:
        conn.execute(CREATE_TABLE_SQL)


def add_mineral(name, color=None, location=None, notes=None):
    with get_connection() as conn:
        conn.execute(
            'INSERT INTO minerals (name, color, location, notes) VALUES (?, ?, ?, ?)',
            (name, color, location, notes)
        )
        conn.commit()


def list_minerals():
    with get_connection() as conn:
        cursor = conn.execute('SELECT id, name, color, location, notes FROM minerals')
        return cursor.fetchall()


def delete_mineral(mineral_id):
    with get_connection() as conn:
        conn.execute('DELETE FROM minerals WHERE id = ?', (mineral_id,))
        conn.commit()


def search_minerals(term):
    with get_connection() as conn:
        cursor = conn.execute(
            'SELECT id, name, color, location, notes FROM minerals WHERE name LIKE ?',
            (f'%{term}%',)
        )
        return cursor.fetchall()
