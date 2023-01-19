
export const storageService = {
  saveToStorage,
  loadFromStorage,
  removeItem
}



function saveToStorage(key:string, val:any) {
  var json = JSON.stringify(val)
  sessionStorage.setItem(key, json)
}

function loadFromStorage(key:string) {
  const json = sessionStorage.getItem(key)
  if (!json || json.length === 0) return null
  const val = JSON.parse(json)
  return val
}

function removeItem(key: string) {
  sessionStorage.removeItem(key)
  return loadFromStorage(key)
}