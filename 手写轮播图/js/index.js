
window.onload = function () {
    Swiper()
}

//轮播图函数
function Swiper() {
    let imgBox = document.querySelector(".ul");
    let width = imgBox.children[0].children[0].offsetWidth;
    let pointBox = document.querySelector(".point");
    let points = pointBox.children;
    let timer = null;
    let index = 1;
    let isMove = false;
    let distanceX = 0;
    //自动播放，2s一次
    timer = setInterval(function () {
        index++;
        addTransition(imgBox, 0.5)
        setTranslate(imgBox, -index*width)
    },2000)
    //添加过渡
    function addTransition(el, time) {
        time = time || 0.5
        el.style.transition = `all ${time}s linear`;
    }
    //清除过渡
    function clearTransition(el) {
        el.style.transition = "none";
    }
    //设置位移
    function setTranslate(el, dis) {
        el.style.transform = 'translateX('+dis+'px)';
    }
    //设置圆点
    function setPoint() {
        for(let i = 0; i < points.length; i++) {
            points[i].className = ""
        }
        points[index - 1].className = "now"       
    }
    //鼠标放到小圆点移动到对应的图
    function selectPoint() {
        for(let i = 0; i < points.length; i++) {
            points[i].onmouseover = function () {
                clearInterval(timer)
                index = i+1
                setTranslate(imgBox, -index*width)
            }
            points[i].onmouseout = function () {
                timer = setInterval(function () {
                    index++;
                    addTransition(imgBox, 0.5)
                    setTranslate(imgBox, -index*width)
                },2000)
            }
        }
        
    }
    selectPoint()
    //监听动画结束事件，为了无缝滚动
    imgBox.addEventListener("transitionend", function () {
        if(index >= 4) {
            //当滚动到最后一张时，瞬间定位到第一张
            index = 1;
            //先清除过渡，再定位
            clearTransition(imgBox)
            setTranslate(imgBox, -index*width)
        }
        else if(index <= 0) {
            index = 3;
            clearTransition(imgBox)
            setTranslate(imgBox, -index*width)
        }
        setPoint()
    })
    imgBox.onmousedown = function (event) {
        //按下鼠标后清除定时器
        clearInterval(timer)
        let e = event || window.event;
        e.preventDefault()
        let x = e.clientX;  
        imgBox.onmousemove = function (event) {
            //移动标志
            isMove = true
            let e = event || window.event;
            distanceX = e.clientX - x;
            //清除过渡，不然移动缓慢
            clearTransition(imgBox)
            setTranslate(imgBox, -index*width+distanceX)
        }
    }

    document.onmouseup = function () {
        if(isMove) {
            //当移动的距离小于图片的三分之一，吸附
            if(Math.abs(distanceX) < width/3) {
                addTransition(imgBox, 0.5)
                setTranslate(imgBox, -index*width)
            }
            //否侧根据移动的方向跳转下一张
            else {
                if(distanceX < 0) {
                    index ++;
                }
                else {
                    index --;
                }
                addTransition(imgBox, 0.5)
                setTranslate(imgBox, -index*width)
            }
        }
        //保证只添加一次定时器
        clearInterval(timer)
        timer = setInterval(function () {
            index++;
            addTransition(imgBox, 0.5)
            setTranslate(imgBox, -index*width)
        },2000)
        imgBox.onmousemove = null;
        isMove = false;
        distanceX = 0;
    }

    //移动端适配
    let x
    let dis
    imgBox.addEventListener("touchstart", function(event) {
        let e = event || window.event;
        x = e.targetTouches[0].clientX;
    })
    imgBox.addEventListener("touchmove", function (event) {
        clearTimeout(timer)
        isMove = true
        let e = event || window.event;
        e.preventDefault()
        dis = e.targetTouches[0].clientX - x
        clearTransition(imgBox)
        setTranslate(imgBox,-index*width+dis)
    })
    imgBox.addEventListener("touchend", function (event) {
        if(isMove) {
            if(Math.abs(dis) < width / 3) {
                addTransition(imgBox);
                setTranslate(imgBox, -index*width)
            }
            else {
                if(dis < 0) {
                    index ++;
                }
                else {
                    index --;
                }
                addTransition(imgBox)
                setTranslate(imgBox, -index*width)
            }
        }
        clearInterval(timer)
        timer = setInterval(function () {
            index++;
            addTransition(imgBox, 0.5)
            setTranslate(imgBox, -index*width)
        },2000)
        isMove = false;
        dis = 0;
    })
}