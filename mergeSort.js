
function sort(arr) {
    if (arr.length === 1) {
      return arr;
    }
  
    return merge(sort(arr.splice(0, arr.length / 2)), sort(arr));
  }
  
  function merge(arr1, arr2) {
    let retArr = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        retArr.push(arr1[i]);
        i += 1;
      } else {
        retArr.push(arr2[j]);
        j += 1;
      }
    }
    while(i < arr1.length){
      retArr.push(arr1[i]);
        i += 1;
    }
    while(j < arr2.length){
      retArr.push(arr2[j]);
        j += 1;
    }
    return retArr;
  }

  module.exports.sort = sort;