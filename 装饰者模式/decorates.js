function Sale(price) {
  this.price = price
  this.decorates_list = []
}

// 装饰器都以构造函数的属性方式存在
Sale.decorate = {}

Sale.decorate.fedtax = {
  getPrice: function (price) {
    // 联邦税算法
    return price += price * 5 / 100
  }
}

Sale.decorate.quebec = {
  getPrice: function (price) {
    return price += price * 7.5 / 100
  }
}

Sale.decorate.money = {
  getPrice: function (price) {
    return '$' + price.toFixed(2)
  }
}

Sale.decorate.rmb = {
  getPrice: function (price) {
    return '￥' + price.toFixed(2) / 6.4
  }
}

Sale.prototype.decorate = function (decorate) {
  this.decorates_list.push(decorate)
}

Sale.prototype.getPrice = function () {
  var price = this.price
  var max = this.decorates_list.length
  var name
  // 循环docorate_list这个数组，调用item的getPrice方法，并把返回的新price作为下一个装饰器的参数
  for (var i = 0;i < max;i++) {
    name = this.decorates_list[i]
    // 这个实例中，getPrice()是唯一的允许装饰的方法，如果想拥有更多方法，那么每个列表都需要重复便利这个装饰器列表
    price = Sale.decorate[name].getPrice(price)
  }
  return price
}