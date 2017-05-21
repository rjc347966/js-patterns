// 订阅发布模式又叫做观察者模式
// 主要的优点是松散耦合，不再是传统的一个对象订阅另一个对象的特定活动并在状态改变后获得通知
// 主要角色有订阅者，发布者，订阅者也被叫做观察者，被观察的对象就叫发布者或者叫做主题，当一个事件发生的时候，发布者会通知所有的订阅者



// 书上用的是一个杂志订阅的例子，假设有一个发布者paper（每天发布报纸），一个订阅者joe（有新闻的时候通知他）
// paper对象有一个subscribers属性（存储所有的订阅者，订阅行为就是加入这个数组）,当一个“新闻”发生的时候，paper便利sub属性，挨个通知他们（就是调用订阅者的某个方法）
// subscribe方法，将订阅者加入到数组中，并提供自己的“联系方式”
// 相应的还有unsubscribe方法，就是解绑订阅者
// publish方法就是便利订阅者数组，并调用他们注册时提供的方法（每人不同的联系方式）,还可以给他们都加一个type属性，这样就可以分开不同的事件

var publisher = {
	subscribes: {
		any: []
		// type属性为any
	},
	subscribe (fn, type) {
		// es6也可以直接写type='any'缺省值这种写法,这里用的es5写法
		type = type || 'any';
		if (typeof this.subscribes[type] === "undefined") {
			this.subscribes[type] = [];
		}
		this.subscribes[type].push(fn);
		// 例如subscribe(joe, news)，先在subscribes中创建news类型，然后把joe push进去
	},
	unsubscribe (fn, type) {
		this.visitSubscribers('unsubscribe', fn, type);
	},
	publish (publication, type) {
		this.visitSubscribers('publish', publication, type);
	},
	visitSubscribers (action, arg, type) {
		var pubtype = type || 'any';
		var subscribes = this.subscribes[pubtype];
		var max = subscribes.length;
		for (var i = 0;i < max;i += 1) {
			if (action === 'publish') {
				subscribes[i](arg);
				// 还是以(joe, news)为例，action为publish时，就是走joe的publication方法，发布消息
			} else {
				if (subscribes[i] === arg) {
					subscribes.splice(i, 1);
					// 解绑订阅者
				}
			}
		}
	}
}