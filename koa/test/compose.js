//koa-compose理解小事例, 这是一个伪递归，实现洋葱模型的核心

function a(i) {
  if (i > 3) return
  console.log(i)
  a(i + 1)
  console.log(i)
}

a(0)