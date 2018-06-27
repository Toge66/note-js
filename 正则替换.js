
let a = 'sjfi+lsj[fdoi{sldjfo*lsjdfio'

let b = ['^', '+', '{', '}', '[', ']', '$', '/', '*']

b.forEach(e => {
	if (!!~a.indexOf(e)) {
		console.log(e);
		a.replace(/{/, `\\${e}`)
	}
})

a.startWith("sj")
