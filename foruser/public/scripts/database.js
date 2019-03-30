var dbPromise;

const DB_NAME = 'db_events_1';
const STORE_NAME = 'store_events';

/**
 * it inits the database
 */
function initDatabase() {
    dbPromise = idb.openDb(DB_NAME, 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains(STORE_NAME)) {
            var forecastDB = upgradeDb.createObjectStore(STORE_NAME, {keyPath: 'id', autoIncrement: true});
            forecastDB.createIndex('location', 'location', {unique: false, multiEntry: true});
        }
    });
}