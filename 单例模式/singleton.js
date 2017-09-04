// 单例模式又叫做单体模式或者单子模式
// 单例模式指的是一个类只能返回一个实例，并且永远是同一个
// 本来主要是相对静态语言中的类常用的模式，js中并没有类（es6中新增的class实质也只是构造函数的语法糖），js中看起来相等的两个对象也不是相等的，也就是说是两个单例子
// 比如 { age: 23, name: 'leon'} === { age: 23, name: 'leon'}  ，这两个对象就不是相等的

// 单例模式的目标是，var test1 = new Test(); var test2 = new Test(); test1 === test2 // true，也就是说他们是同一对象的不同引用

// 那在es5中，我们通过构造函数生成一个实例的时候，步骤是怎么样的呐？
// 使用new操作符创建对象，这个对象如果在构造函数中就已经被缓存了，那么，实例的对象是不是就是同一个对象的引用了呐？
// 现在问题就简单了，在构造函数中缓存一个对象实例，有几个方法？
// 1.使用全局对象存储实例，后面就不用说了，现在都不提倡污染全局变量。
// 2.在构造函数的静态方法中缓存该实例对象，，缺点是这个静态属性是公开的，外部可以修改（es6中能用poxy拦截修改）
// 3.将这个实例包裹在闭包中，这就保证了私有性and不被外部修改，缺点是增加了闭包开销


// 我们先试一下第二种方法
function Universe() {
	// 先判断一下有没有现有的实例
	if (typeof Universe.instance === "object") {
		return Universe.instance;
	}

	this.age = 23;
	this.name = 'leon';

	// 缓存这个实例
	Universe.instance = this;
	return this;
}

// 第三种方法
// 这种方法里，第一次运行时正常的从头走到尾，但是第二次第三次的时候，就会走重写之后的方法
function single1() {
	var instance = this;
	this.age = 23;
	this.name = 'leon';
	single1 = function () {
		return instance;
	}
}
// 这种写法会产生一个问题，就是你如果往single1这个函数上添加原型属性，都不会链接到创建的实例上（除非在第一次调用之前）
// 当你用 实例.constructor.name结果会是single1，这会使开发者困惑，那么，就需要调整

function single() {
	var instance;
	single = function single() {
		return instance;
	};
	single.prototype = this;
	instance = new single;
	instance.constructor = single;
	instance.age = 23;
	instance.name = 'leon';
	return instance;
}



