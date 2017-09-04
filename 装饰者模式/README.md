# 装饰者模式

装饰者模式，总结说就是： 
> 在运行时动态添加附加功能到对象中去 


比如说要实现一个功能，但是你想在每次执行这个函数的时候打印出函数执行的时间，在不改变函数代码的前提下，就可以用装饰模式来实现

下面这个用例的场景是一个销售商品的web应用，每一笔销售都是一个新的sale对象，这个sale对象记录了每个商品的价格
还可以调用sale.getPrice()返回价格

需求出现了，sale记录的价格只是单纯的价格，可是客户买商品是需要缴各种不同的税的，那我们就可以用装饰模式来实现

```
var sale = new Sale(100)
// 增加联邦税
sale.decorate('fedtax')
// 增加省级税
sale.decorate('quebec')
// 格式化为美元货币格式
sale.decorate('money')
sale.getPrice()
```

但是如果用户是在不需缴纳联邦税只需要省级税，并且用人民币来付款的场景下呐？

```
var sale = new Sale(100)
sale.decorate('quebec')
sale.decorate('rmb')
sale.getPrice()
```

怎么样，这样可定制化的操作方式还算优雅吧

其实在最后一步sale.getPrice()的时候，它所拿到的sale对象已经是执行了货币转换装饰后的对象，而货币装换的sale拿的又是他上一级的对象，这样一层一层的找上去，关系如果所示：
![image](http://ojuzc6ch8.bkt.clouddn.com/221951522630534065.png)

** decorate.js这个文件就是上面代码的具体实现 **