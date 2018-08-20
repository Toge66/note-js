# [生成器](https://github.com/Toge66/note-js/blob/master/koa/test/iterator.js)
* 指针函数，接收一个数组参数，调用函数的`next().value`会依次打印出数组中的元素当到最后一个元素时它的`next().done`是`false`

* [mj/co](https://github.com/tj/co)
[修饰生成器](https://github.com/Toge66/note-js/blob/master/koa/test/co.js)，把生成器的每个`yeild`修饰的元素全部执行，不用调用每一项的`next()`

# `require/import`

* `node`的`module`遵循[`CommonJS`](http://javascript.ruanyifeng.com/nodejs/module.html)规范`CommonJS`中使用`require`引入模块，使用`module.exports`导出接口

* ES6标准发布后，module成为标准，使用`import`引入模块，使用`export`倒出接口

* `import`是编译时的，必须在文件开头，使用格式也是确定的，他不会将整个模块运行后赋值给某个变量，而是只选择`import`的接口进行编译，性能上好很多。`require`是运行时的，会把整个模块运行后赋值给某个变量变量

# [Koa](https://github.com/koajs/koa/)使用