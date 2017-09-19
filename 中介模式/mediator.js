// 先定义一个计分板对象，它没有保存任何一个接口，只是显示mediator传给它的数值。
var scoreboard = {
  // updata方法，每个玩家游戏结束后，mediator对象会调用这个方法
  update: function (score) {
    var i
    var msg = ''
    for (i in score) {
      msg += `<p><storg>${i}</storg>: ${score[i]}</p>`
    }
    document.getElementById('results').innerHTML = msg
  }
}
// 再定义mediator对象，它的任务要先初始化游戏
var mediator = {
  players: {},
  // setup方法创建player对象，把这些player对象记录到自己的players属性中
  setup: function () {
    var players = this.players
    players.player1 = new Player('Player1')
    players.player2 = new Player('Player2')
  },
  // played方法在每轮游戏结束后由player调用
  played: function () {
    var players = this.players
    var score = {
      player1: players.player1.point,
      player2: players.player2.point
    }
    scoreboard.update(score)
  },
  // keypress方法用于处理键盘事件，确定每个玩家前进了一回合然后通知该玩家
  keypress: function (e) {
    e = e || window.event
    if (e.which === 49) {
      mediator.players.player1.play()
      return
    }
    if (e.which === 48) {
      mediator.players.player2.play()
      return
    }
  }
}
// player由Player()构造函数创建
function Player(name) {
  this.point = 0
  this.name = name
}

Player.prototype.play = function () {
  this.point += 1
  mediator.played()
}

// 启动游戏
mediator.setup()
window.onkeypress = mediator.keypress

// 设定游戏结束时间
setTimeout(function () {
  window.onkeypress = null
  alert('Game over')
}, 30000)