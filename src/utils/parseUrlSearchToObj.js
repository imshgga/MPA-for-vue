// 将给定url,默认为window.location.href,的查询字符串转换为对象
export default function parseUrlSearchToObj(url) {
  url = decodeURI(url || window.location.href)
  let searchStr = /\?([^#]*)/.exec(url)[1] || ''

  let queryArr = searchStr.split('&')
  let result = {
    searchStr
  }
  queryArr.forEach(item => {
    let temp = item.split('=')
    if (temp[1]) {
      result[temp[0]] = temp[1]
    }
  })
  return result
}
