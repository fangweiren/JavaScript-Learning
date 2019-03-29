## 缓动动画

缓动动画原理：盒子本身的位置 + 步长（不断变化的，由大变小）
步长：begin = begin + (end - begin) * 缓动系数


在开发中，我们想要获得css样式，通常采用：box.style.top，box.style.backgroundColor等，但这种方式只能得到行内样式，而平常用得最多的是页内样式或者外部样式。

**只能获取行内样式**
```python
console.log(box.style.width);
```
**获取页内样式或者外部样式**
```python
getStyleAttr(box, "width")

function getStyleAttr(obj, attr) {
    if(obj.currentStyle){  // IE 和 opera
        return obj.currentStyle[attr];
    }else { // 其他W3C标准浏览器
        return window.getComputedStyle(obj, null)[attr];
    }
}
```
