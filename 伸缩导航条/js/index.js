/*
    导航条
    1.向下滚动就隐藏，向上滚动就显示
    2.监听鼠标滚轮事件
    3.赋予动画效果
*/

window.onload = function () {
    //IE
    if(document.attachEvent) {
        document.attachEvent("onmousewheel",scrollFun)
    }
    //FireFox
    if(document.addEventListener) {
        window.addEventListener("DOMMouseScroll", scrollFun)
    }
    //chrome Opera
    window.onmousewheel = scrollFun
    
    
}

function scrollFun(event) {
    let header = document.querySelector("header")
    let e = event || window.event
    if(e.wheelDelta) {
        if(e.wheelDelta < 0) {
            addTransition(header)
            setTranslate(header, -60)
        }
        else {
            addTransition(header)
            setTranslate(header, 0)
        }
    }
    else if(e.detail) {
        if(e.detail > 0) {
            addTransition(header)
            setTranslate(header, -60)
        }
        else {
            addTransition(header)
            setTranslate(header, 0)
        }
    }
    
}
function addTransition(el) {
    el.style.transition = "all 1s linear"
}

function setTranslate(el, dis) {
    el.style.transform = 'translateY('+ dis +'px)'
}