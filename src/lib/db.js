import { buildSeedDB } from './seedData'

// v4: cada local tiene su propio logo/banner (campos en "stores"), y el
// "settings" global del Super Admin ahora también tiene banner. Al subir la
// versión se fuerza un reseed automático.
const DB_KEY = 'reparacionestore_db_v4'
const SESSION_KEY = 'reparacionestore_session_v1'

export function generateId(prefix = 'id') {
  const random = Math.random().toString(36).slice(2, 9)
  return `${prefix}-${Date.now().toString(36)}-${random}`
}

export function loadDB() {
  const raw = localStorage.getItem(DB_KEY)
  if (!raw) {
    const seeded = buildSeedDB()
    localStorage.setItem(DB_KEY, JSON.stringify(seeded))
    return seeded
  }
  try {
    return JSON.parse(raw)
  } catch {
    const seeded = buildSeedDB()
    localStorage.setItem(DB_KEY, JSON.stringify(seeded))
    return seeded
  }
}

export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}

export function resetDB() {
  const seeded = buildSeedDB()
  saveDB(seeded)
  return seeded
}

export function getCollection(collection) {
  const db = loadDB()
  return db[collection] || []
}

export function createItem(collection, item) {
  const db = loadDB()
  const newItem = { id: generateId(collection), ...item }
  db[collection] = [...(db[collection] || []), newItem]
  saveDB(db)
  return newItem
}

export function updateItem(collection, id, patch) {
  const db = loadDB()
  db[collection] = (db[collection] || []).map((it) => (it.id === id ? { ...it, ...patch } : it))
  saveDB(db)
  return db[collection].find((it) => it.id === id)
}

export function removeItem(collection, id) {
  const db = loadDB()
  db[collection] = (db[collection] || []).filter((it) => it.id !== id)
  saveDB(db)
}

export function removeWhere(collection, predicate) {
  const db = loadDB()
  db[collection] = (db[collection] || []).filter((it) => !predicate(it))
  saveDB(db)
}

export function getSettings() {
  const db = loadDB()
  return db.settings || {}
}

export function updateSettings(patch) {
  const db = loadDB()
  db.settings = { ...db.settings, ...patch }
  saveDB(db)
  return db.settings
}

// --- Sesión demo ---

export function saveSession(userId) {
  localStorage.setItem(SESSION_KEY, userId)
}

export function loadSession() {
  return localStorage.getItem(SESSION_KEY)
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}
