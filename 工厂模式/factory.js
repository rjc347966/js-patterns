// 工厂模式的目的就是为了创建对象，它的设计目标有两个
// 1. 在创建相似对象时执行重复操作
// 2.在编译时不知道具体类型的情况下，给工厂客户提供一种创建对象的接口

var CarMaker = {}

// 根据收到的参数去找对应的生产函数
CarMaker.factory = function (type) {
	var constr = type;
	// 不存在对应的构造函数就抛出一个错误
	if (typeof CarMaker[constr] !== "function") {
		throw {
			name: 'error',
			message: `${constr} dont exist`
		}
	}

	if (typeof CarMaker[constr].prototype.drive !== "function") {
		CarMaker[constr].prototype.drive = function () {
			return `我有${this.doors}个车门`;
		}
	}
	newcar = new CarMaker[constr]();
	return newcar;
}
// 定义几个特定的制造商
CarMaker.Compact = function () {
	this.doors = 4;
}
CarMaker.Convertible = function () {
	this.doors = 2;
}
CarMaker.Suv = function () {
	this.doors = 24;
}