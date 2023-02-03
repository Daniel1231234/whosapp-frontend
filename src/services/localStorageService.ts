
export const storageService = {
  saveToStorage,
  loadFromStorage,
  removeItem,
  loadFromSessinal
}



function saveToStorage(key:string, val:any) {
  var json = JSON.stringify(val)
  localStorage.setItem(key, json)
}

function loadFromStorage(key:string) {
  const json = localStorage.getItem(key)
  if (!json || json.length === 0) return null
  const val = JSON.parse(json)
  return val
}

function loadFromSessinal(key:string) {
  const json = sessionStorage.getItem(key)
  if (!json || json.length === 0) return null
  const val = JSON.parse(json)
  return val
}

function removeItem(key: string) {
  localStorage.removeItem(key)
  return loadFromStorage(key)
}