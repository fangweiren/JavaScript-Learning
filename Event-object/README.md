## 01-事件对象
只要触发 DOM 上的某个事件时，会产生一个事件对象event，这个对象中包含着所有与事件有关的信息。IE6-8 只能通过 window.event 获取事件对象。

event 常见属性  
clientX：光标相对于该网页的水平位置  
clientY：光标相对于该网页的垂直位置  
type：事件的类型  
target：该事件被传送到的对象  
screenX：光标相对于该屏幕的水平位置  
screenY：光标相对于该屏幕的垂直位置  
pageX：光标相对于该网页的水平位置（不适用 IE）  
pageY：光标相对于该网页的垂直位置（不适用 IE）  
width：该窗口或框架的宽度  
height：该窗口或框架的高度  
data：返回拖拽对象的 URL 字符串

## 02-常见属性
screenX/screenY 是以屏幕为基准进行测量，即：当前元素距离屏幕的尺寸

pageX 和 pageY 是以当前文档（绝对定位）为基准，不适用于 IE6-8  
滚动条也计算在内

clientX 和 clientY 是以当前可视区域为基准，类似于固定定位。

## 03-动态获取鼠标的位置
![](https://github.com/fangweiren/JavaScript-Learning/blob/master/Event-object/Dynamically%20get%20the%20position%20of%20the%20mouse.gif?raw=true)
