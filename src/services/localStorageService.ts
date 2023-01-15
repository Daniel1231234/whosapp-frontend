
export const storageService = {
  saveToStorage,
  loadFromStorage
}



function saveToStorage(key:string, val:any) {
  var json = JSON.stringify(val)
  localStorage.setItem(key, json)
}

function loadFromStorage(key:string) {
  const json = localStorage.getItem(key)
  if (!json || json.length === 0) return []
  const val = JSON.parse(json)
  return val
}