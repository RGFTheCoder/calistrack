import { openDB, type IDBPDatabase } from 'idb'

const DB_NAME = 'calistrack'
const DB_VERSION = 1
const STORE = 'kv'

let dbPromise: Promise<IDBPDatabase> | null = null
let useFallback = false

function tryOpenDb(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE)
        }
      },
    }).catch(err => {
      console.warn('IDB unavailable, falling back to localStorage', err)
      useFallback = true
      throw err
    })
  }
  return dbPromise
}

function lsGet<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(`calistrack:${key}`)
    return raw ? (JSON.parse(raw) as T) : undefined
  } catch {
    return undefined
  }
}

function lsSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`calistrack:${key}`, JSON.stringify(value))
  } catch (err) {
    console.warn('localStorage set failed', err)
  }
}

export async function loadKey<T>(key: string): Promise<T | undefined> {
  if (useFallback) return lsGet<T>(key)
  try {
    const db = await tryOpenDb()
    const v = await db.get(STORE, key)
    return v as T | undefined
  } catch {
    return lsGet<T>(key)
  }
}

export async function saveKey<T>(key: string, value: T): Promise<void> {
  if (useFallback) {
    lsSet(key, value)
    return
  }
  try {
    const db = await tryOpenDb()
    await db.put(STORE, value, key)
  } catch {
    lsSet(key, value)
  }
}
