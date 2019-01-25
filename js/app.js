// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里 101*171 (0, 74, 101, 70)
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    const randomItem = items => items[Math.random() * items.length | 0];
    const genRandom = (min, max) => (Math.random() * (max - min + 1) | 0) + min;

    this.sprite = 'images/enemy-bug.png';
    this.x = 0
    this.y = randomItem([70, 150, 240])
    this.speed = genRandom(30, 300)
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    
    this.x = this.speed * dt + this.x
    let mid_x2 = player.x + 18 + 35
    let mid_x1 = this.x + 50
    let mid_y2 = player.y + 65 + 35
    let mid_y1 = this.y + 74 +35
    if ((Math.abs(mid_x2 - mid_x1) < 65) && (Math.abs(mid_y2 - mid_y1) < 50)) {
        player.x = 40;
        player.y = 400; 
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数， 101*171 ((18, 65, 67, 71))
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 40;
    this.y = 400;
};

Player.prototype.update = function (right, up){
        this.x = this.x + right
        this.y = this.y + up
        if (this.y + 65 + 71 < 180) {
            this.x = 40
            this.y = 400
        }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    function rangeIn(x, y, dx, dy) {
        if (x + dx <= 505 && y + dy <= 606 && x + dx >= 0 && y + dy >= 0) {
            return true
        }
        else {
            return false
        }
    }
    if (key == "up" && rangeIn(this.x, this.y, 0, -40)) {
        this.update(0, -40);
    }
    else if (key == "down" && rangeIn(this.x, this.y, 0, 208)) {
        this.update(0, 40);
    }
    else if (key == "left" && rangeIn(this.x, this.y, -40, 0)) {
        this.update(-40, 0);
    }
    else if (key == "right" && rangeIn(this.x, this.y, 110, 0)) {
        this.update(40, 0);
    }
}

var Selector = function() {
    this.sprite = 'images/Selector.png';
    this.x = 15
    this.y = 395
}

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Selector.prototype.handleInput = function (key) {
    if (key == "left" && this.x > 15) {
        this.x  = this.x - 90
    }
    else if (key == "right" && this.x < 375) {
        this.x  = this.x + 90
    }
    else if (key == 'Enter') {
        if (this.x == 15) {
            role = 'images/char-boy.png'
        }
        else if (this.x == 105) {
            role = 'images/char-cat-girl.png'
        }
        else if (this.x == 195) {
            role = 'images/char-horn-girl.png'
        }
        else if (this.x == 285) {
            role = 'images/char-pink-girl.png'
        }
        else if (this.x == 375) {
            role = 'images/char-princess-girl.png'
        }
    }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
const allEnemies = []
const e1 = new Enemy;
const e2 = new Enemy;
const e3 = new Enemy;
allEnemies.push(e1);
allEnemies.push(e2);
allEnemies.push(e3);

const player = new Player;
const selector = new Selector;
var role = null

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'Enter'

    };
    selector.handleInput(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});
