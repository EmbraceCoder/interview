let arr = [
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 7},
  {id: 8, name: '部门3', pid: 1},
  {id: 9, name: '部门3', pid: 7},
  {id: 4, name: '部门4', pid: 3},
  {id: 1, name: '部门1', pid: 0},
  {id: 7, name: '部门1', pid: 0},
  {id: 5, name: '部门5', pid: 4},
  {id: 6, name: '部门5', pid: 4},
]


function arrayToTree(arr, pid) {
  const _arr = JSON.parse(JSON.stringify(arr))
  const res = []
  const length = _arr.length
  if (length === 0) return []
  for (let i = 0; i < length; i++) {
    const item = _arr[i]
    if (item.pid === pid) {
      res.push({
        id: item.id,
        name: item.name,
        pid: item.pid,
        children: arrayToTree(_arr, item.id)
      })
    }
  }
  return res
}

console.log(arrayToTree(arr, 0));


class SnapshotSanBox {
  windowSnapshot = {}
  modifyPropsMap = {}
  active() {
    for (const prop in window) {
      this.windowSnapshot[prop] = window[prop]
    }
    Object.keys(this.modifyPropsMap).forEach(prop => {
      window[prop] = this.modifyPropsMap[prop]
    })
  }
  inactive() {
    for (const prop in window) {
      if (window[prop] !== this.windowSnapshot[prop]) {
        this.modifyPropsMap[prop] = window[prop]
        window[prop] = this.windowSnapshot[prop]
      }
    }
  }
}


let snapshotSandbox = new SnapshotSanBox()
snapshotSandbox.active()
window.city = "Beijing"
console.log("window.city-01", window.city)
snapshotSandbox.inactive()
console.log("window.city-02", window.city)
snapshotSandbox.active()
console.log("window.city-03", window.city)
snapshotSandbox.inactive()


