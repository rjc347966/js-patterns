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
// 这个publisher就是一个通用的发布者对象，当我们想定制一个发布者的时候，只需要把这个publisher上的方法和subscribes属性遍历添加上去


// 比如我们用paper这个例子，有两个type，daily是日报，mothly是月刊
var paper = {
	daily: function () {
		this.publish("这里是日报");
	},
	mothly: function () {
		this.publish("这里是月刊", "mothly");
	}
}

// 用makePublisher函数遍历添加方法到定制对象上
function makePublisher(obj) {
	for (i in publisher) {
		if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
			obj[i] = publisher[i];
		}
	}
	obj.subscribes = {
		any: []
	};
	return obj;
}

makePublisher(paper);


// 现在paper就被转变为一个发布者了
// 接下来，我们再定制一个订阅者joe，他会在每天早上喝咖啡的看日报，月末的时候看看月刊
var joe = {
	drinkCoffee: function (paper) {
		console.log("喝咖啡的时候" + paper);
	},
	endOfMothe: function (mothly) {
		console.log("月末的时候" + mothly)
	}
}

// 订阅者定制好了，需要向发布者订阅
paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.endOfMothe, "mothly");

// 现在，订阅者和发布者的联系就全部确定了
paper.daily();
paper.mothly();
// 只需要触发daily和mothly方法就可以完成事件的发布了



