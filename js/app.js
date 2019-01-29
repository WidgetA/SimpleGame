var Enemy = function() {
    // random and genRandom is used to generate different enemy in diffrent speed and position
    // reference：https://www.imooc.com/article/details/id/21173
    const randomItem = items => items[Math.random() * items.length | 0];
    const genRandom = (min, max) => (Math.random() * (max - min + 1) | 0) + min;

    this.sprite = 'images/enemy-bug.png';
    this.x = 0
    this.y = randomItem([70, 150, 240])
    this.speed = genRandom(30, 300)
};

Enemy.prototype.update = function(dt) {
    // different enemy should have different speed
    this.x = this.speed * dt + this.x

    // this parts is used to judge if bugs meet the player
    let mid_x2 = player.x + 18 + 35
    let mid_x1 = this.x + 50
    let mid_y2 = player.y + 65 + 35
    let mid_y1 = this.y + 74 +35
    if ((Math.abs(mid_x2 - mid_x1) < 65) && (Math.abs(mid_y2 - mid_y1) < 50)) {
        player.x = 40;
        player.y = 400; 
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 40;
    this.y = 400;
};

Player.prototype.update = function (right, up){
        this.x = this.x + right
        this.y = this.y + up
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

// selector class to chose a role
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

// a class that generates a victory animation
var Winner = function() {
    this.sprite = 'images/Star.png';
    this.x = 200;
    this.y = 275;
    this.time = 4;
    this.win = false;        
};

Winner.prototype.trans = function(dt) {
    if (200 - 50 * (this.time - 1) >= 0 && 275 - 50 * (this.time - 1) >= 50) {
        this.x = 200 - 50 * (this.time - 1)
        this.y = 275 - 50 * (this.time - 1)
        this.time = this.time - dt
    }
    else {
        this.x = 0
        this.y = 50
    }

    if (this.time > 0) {
        ctx.drawImage(Resources.get(this.sprite), 0, 51, 100, 100, this.x, this.y, 100 * this.time, 100 * this.time);
    }
    else {
        this.time = 4
        this.win = false
    }
}

const allEnemies = []
const e1 = new Enemy;
const e2 = new Enemy;
const e3 = new Enemy;
allEnemies.push(e1);
allEnemies.push(e2);
allEnemies.push(e3);

const player = new Player;

const selector = new Selector;
var role = null;

const winner = new Winner;
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
