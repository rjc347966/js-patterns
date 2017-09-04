		发布订阅模式是js中比较常见的设计模式
		比如vue中的$on,$emit等东西，都是用了订阅发布，还有双向绑定的部分等等

		如果你觉得obverse.js这个文件太复杂不想读的话，还有简单版的例子



		var publisher = {
			publish () {
				dep.notify();
			}
		}
		#### 这里发布者就定制好了，用于给订阅者发布消息

		var sub1 = {
			update () {
				console.log("接收到发布消息了1");
			}
		}

		var sub2 = {
			update () {
				console.log("接收到发布消息了2");
			}
		}
		####  再定义两个订阅者

		function Dep () {
			this.subscribes = [sub1, sub2];
		}
		#### 这里把主体对象和发布者分开了
		Dep.prototype.notify = function () {
			this.subscribes.forEach(function (sub) {
				sub.update();
			})
		}

		var dep = new Dep();
		publisher.publish();


		##### 额，。。。。。，好像除了没有类型之外，也并没有很简单。😒