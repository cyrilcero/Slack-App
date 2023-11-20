export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function setLocalStorage(key, object) {
  return localStorage.setItem(key, JSON.stringify(object));
}

export function deleteLocalStorage(key) {
  return localStorage.removeItem(key);
}
