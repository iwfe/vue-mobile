export default {
  /*
  遍历数组中每个对象，找到有value值的item并返回
  */
  findItem (array, key, value) {
    let ret
    for (let i = 0, len = array.length; i < len; i++) {
      const item = array[i]
      if (item[key].toLowerCase() === value) {
        ret = item
        break
      }
    }
    return ret
  }
}
