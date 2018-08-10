// //最原始的迭代器
// function makeIterator(arr) {
//   let nextIndex = 0
//   return {
//     next: () => {
//       if (nextIndex < arr.length) {
//         return {
//           value: arr[nextIndex++],
//           done: false
//         }
//       } else {
//         return { done: true }
//       }
//     }
//   }
// }

// const it = makeIterator(['aa', 'bb', 'cc'])
// console.log('首先', it.next().value)
// console.log('然后', it.next().value)
// console.log('最后', it.next().value)
// console.log('最后', it.next().value)

//生成器
function * makeIterator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

const it = makeIterator(['aa', 'bb', 'cc'])
console.log('首先', it.next().value)
console.log('然后', it.next().value)
console.log('最后', it.next().value)
console.log('最后', it.next().value)
