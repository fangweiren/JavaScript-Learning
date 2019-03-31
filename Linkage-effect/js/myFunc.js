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

/**
 * 获取 CSS 样式值
 * @param {object}obj
 * @param {string}attr
 * @returns {string}
 */
function getCssStyleAttr(obj, attr) {
    if(obj.currentStyle){  // IE 和 opera
        return obj.currentStyle[attr];
    }else { // 其他W3C标准浏览器
        return window.getComputedStyle(obj, null)[attr];
    }
}

/**
 * 缓动动画函数
 * @param obj
 * @param json
 * @param fn
 */
function buffer(obj, json, fn) {
    // 1.1 清除定时器
    clearInterval(obj.timer);

    // 1.3 设置定时器
    var begin = 0, target = 0, speed = 0;
    obj.timer = setInterval(function () {
        // 1.3.0 标记
        var flag = true;
        for(var k in json){
            // 1.3.1 求出初始值
            if("opacity" === k){ // 透明度
                console.log(getCssStyleAttr(obj, k));
                begin = Math.round(parseFloat(getCssStyleAttr(obj, k)) * 100) || 100; // 获取 CSS 样式值
                target = parseInt(json[k] * 100);
            }else { // 其他情况
                begin = parseInt(getCssStyleAttr(obj, k)) || 0; // 获取 CSS 样式值
                target = parseInt(json[k]);
            }
            console.log(begin, target);

            // 1.4 求出步长
            // 缓动动画原理：盒子本身的位置 + 步长（不断变化的，由大变小）
            // 步长：begin = begin + (end - begin) * 缓动系数
            speed = (target - begin) * 0.2;

            // 1.6 判断是否向上取整
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

            // 1.5 移动起来
            if("opacity" === k){ // 透明度
                // w3c 的浏览器
                obj.style.opacity = (begin + speed) / 100;
                // ie
                obj.style.filter = "alpha(opacity=" + (begin + speed) +")";
            }else {
                obj.style[k] = begin + speed + "px";
            }


            // 1.7 判断
            if(begin !== target){
                flag = false;
            }
        }
        // 1.8 清除定时器
        if(flag){
            clearInterval(obj.timer);

            // 判断有没有回调函数
            if(fn){
                fn()
            }
        }
    }, 20)
}