import storage from "good-storage";

interface StorageVal {
  value: any;
  expires?: number;
}

export function setStorage(key: string, val: any, ex = 1.8e6) {
  const setVal: StorageVal = {
    expires: Date.now() + ex,
    value: val,
  };
  storage.set(key, setVal);
}

export function getStorage<T=any>(key: string, def: T): T {
  const storeResult: StorageVal = storage.get(key, def);
  if (storeResult.expires! > Date.now()) {
    return storeResult.value;
  }
  removeStorage(key);
  return def;
}

export function removeStorage(key: string) {
  storage.remove(key);
}

export function clearStorage() {
  storage.clear();
}
