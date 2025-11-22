// IndexedDB wrapper for offline caching

const DB_NAME = 'rihlatul-hudah-offline';
const DB_VERSION = 1;

const STORES = {
  QURAN_DATA: 'quran-data',
  PRAYER_TIMES: 'prayer-times',
  TAFSIR: 'tafsir',
};

class OfflineCache {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains(STORES.QURAN_DATA)) {
          db.createObjectStore(STORES.QURAN_DATA, { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains(STORES.PRAYER_TIMES)) {
          db.createObjectStore(STORES.PRAYER_TIMES, { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains(STORES.TAFSIR)) {
          db.createObjectStore(STORES.TAFSIR, { keyPath: 'key' });
        }
      };
    });
  }

  private async ensureDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.init();
    }
    return this.db!;
  }

  async set(store: string, key: string, value: any): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(store, 'readwrite');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.put({
        key,
        value,
        timestamp: Date.now(),
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async get(store: string, key: string, maxAge?: number): Promise<any> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(store, 'readonly');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result;
        if (!result) {
          resolve(null);
          return;
        }

        // Check if data is too old
        if (maxAge && Date.now() - result.timestamp > maxAge) {
          resolve(null);
          return;
        }

        resolve(result.value);
      };
    });
  }

  async delete(store: string, key: string): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(store, 'readwrite');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(store: string): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(store, 'readwrite');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

// Singleton instance
export const offlineCache = new OfflineCache();

// Cache keys and max ages
export const CACHE_CONFIG = {
  QURAN_SURAH: (surahNumber: number, edition: string) => 
    `surah-${surahNumber}-${edition}`,
  PRAYER_TIMES: (lat: number, lon: number, date: string) =>
    `prayer-${lat.toFixed(2)}-${lon.toFixed(2)}-${date}`,
  TAFSIR: (surah: number, ayah: number, tafsirId: number, abridged: boolean) =>
    `tafsir-${surah}-${ayah}-${tafsirId}-${abridged}`,
  
  // Max ages in milliseconds
  QURAN_MAX_AGE: 30 * 24 * 60 * 60 * 1000, // 30 days - Quran text doesn't change
  PRAYER_TIMES_MAX_AGE: 24 * 60 * 60 * 1000, // 1 day
  TAFSIR_MAX_AGE: 30 * 24 * 60 * 60 * 1000, // 30 days
};

export { STORES };
