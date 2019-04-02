window.onload = function () {
    // 1.获取需要的标签
    var slider = $("slider");
    var slider_main = $("slider_main");
    var slider_main_img = slider_main.children;
    var slider_control = slider.children[1];

    // 5.3 全局索引
    var imgIndex = 0;

    // 2.动态创建指示器(图片下方的原点)
    for(var i=0; i<slider_main_img.length; i++){
        var span = document.createElement("span"); // 创建 span 标签
        span.className = "iconfont icon-yuan"; // 空心圆

        // 5.4 给 span 绑定个索引
        var x = slider_main_img.length - i - 1;
        span.setAttribute("data-index", x);

        slider_control.insertBefore(span, slider_control.children[1]); // 将 span 插入到第二个元素之前
    }

    // 3.默认选中第一个(即实心圆)
    slider_control.children[1].className = "iconfont icon-iconfontyuan";

    // 4.除了第一张图片外，其余的都移到右边隐藏起来
    var scroll_W = slider.offsetWidth;
    for(var j=1; j<slider_main_img.length; j++){
        slider_main_img[j].style.left = scroll_W + "px";
    }

    // 5.遍历监听操作
    var slider_control_child = slider_control.children;
    for(var i=0; i<slider_control_child.length; i++){
        // 5.1 监听点击
        slider_control_child[i].onclick = function () {
            // 5.2 判断
            if(this.className === "iconfont icon-zuo"){ // 左边
                /*
                * 1.当前可视区域的图片快速右移
                * 2.上一张图片快速出现在可视区域的左边
                * 3.让这张图片做动画进入
                */
                buffer(slider_main_img[imgIndex], {"left": scroll_W});
                imgIndex--;
                if(imgIndex < 0){
                    imgIndex = slider_main_img.length - 1;
                }
                slider_main_img[imgIndex].style.left = -scroll_W + "px";
                buffer(slider_main_img[imgIndex], {"left": 0});
            }else if(this.className === "iconfont icon-you"){ // 右边
                /*
                * 1.当前可视区域的图片快速左移
                * 2.下一张图片快速出现在可视区域的右边
                * 3.让这张图片做动画进入
                */
                buffer(slider_main_img[imgIndex], {"left": -scroll_W});
                imgIndex++;
                if(imgIndex >= slider_main_img.length){
                    imgIndex = 0;
                }
                slider_main_img[imgIndex].style.left = scroll_W + "px";
                buffer(slider_main_img[imgIndex], {"left": 0});
            }else { // 下边
                /*
                * 1.用当前点击的索引和选中的索引对比
                * 2.点击的索引 > 选中的索引,相当于点击了右边的按钮
                * 3.点击的索引 < 选中的索引,相当于点击了左边的按钮
                */
                // 5.5 获取索引
                var index = parseInt(this.getAttribute("data-index")); // 获取自定义的元素的属性

                // 5.6 对比
                if(index > imgIndex){ // 右边
                    buffer(slider_main_img[imgIndex], {"left": -scroll_W});
                    slider_main_img[index].style.left = scroll_W + "px";
                    imgIndex = index;
                    buffer(slider_main_img[imgIndex], {"left": 0});
                }else if(index < imgIndex){ // 左边
                    buffer(slider_main_img[imgIndex], {"left": scroll_W});
                    slider_main_img[index].style.left = -scroll_W + "px";
                    imgIndex = index;
                    buffer(slider_main_img[imgIndex], {"left": 0});
                }
            }
            // 6.1 调用函数
            changeIndex()
        }
    }

    // 7.自动轮播(也就是每隔1秒点击一下向右的按钮)
    var timer = setInterval(autoPlay, 1500);

    // 8.设置和清除定时器
    slider.onmouseover = function () {
        clearInterval(timer)
    };
    slider.onmouseout = function () {
        timer = setInterval(autoPlay, 1500);
    };

    // 7.1 自动轮播函数
    function autoPlay() {
        /*
        * 1.当前可视区域的图片快速左移
        * 2.下一张图片快速出现在可视区域的右边
        * 3.让这张图片做动画进入
        */
        buffer(slider_main_img[imgIndex], {"left": -scroll_W});
        imgIndex++;
        if(imgIndex >= slider_main_img.length){
            imgIndex = 0;
        }
        slider_main_img[imgIndex].style.left = scroll_W + "px";
        buffer(slider_main_img[imgIndex], {"left": 0});

        // 同样的，指示器的索引也要变
        changeIndex()
    }

    // 6.切换指示器的索引
    function changeIndex() {
        for(var i=1; i<slider_control_child.length-1; i++){
            slider_control_child[i].className = "iconfont icon-yuan";
        }
        slider_control_child[imgIndex+1].className = "iconfont icon-iconfontyuan";
    }
};