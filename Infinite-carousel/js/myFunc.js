/*
* 获取滚动的头部距离和左边距离
* scroll().top scroll().left
* */
function scroll() {
    if(window.pageYOffset !== null){
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode === "CSS1Compat"){ // W3C
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }

    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft,
    }
}


function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

function show(obj) {
    return obj.style.display = "block";
}

function hide(obj) {
    return obj.style.display = "";
}

/*
* 获取宽度和高度
* client().width scroll().height
* */
function client() {
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    }
}

/**
 * 匀速动画函数
 * @param {object} obj
 * @param {number} target
 * @param {number} step
 */
function constant(obj, target, step) {
    // 1.清除定时器
    clearInterval(obj.timer);

    // 3.判断方向
    var dir = obj.offsetLeft < target ? step : -step;

    // 2.设置定时器
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + "px";

        if(Math.abs(target - obj.offsetLeft) < Math.abs(dir)) { // 盒子距离目标位置小于步长
            clearInterval(obj.timer);
            obj.style.left = target + "px";
        }
    }, 20);
}