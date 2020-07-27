/*
    导航条
    1.向下滚动就隐藏，向上滚动就显示
    2.监听鼠标滚轮事件
    3.赋予动画效果
*/


class scrollFun {
    constructor(el, distance, time) {
        this.el = el,
        this.distance = distance || 60,
        this.time = time || 0.5
    }
    throttle(fn, wait) {
        let timer = null
        let context = this
        return function() {
            console.log(context)
            let args = Array.prototype.slice.call(arguments)
            if(!timer) {
                clearTimeout(timer)
                setTimeout(function() {
                    fn.apply(context, args)
                },wait)
            }
        }
    }
    init() {
        //IE
        if(document.attachEvent) {
            document.attachEvent("onmousewheel",this.throttle(this.scrollFun, 400))
        }
        //FireFox
        if(document.addEventListener) {
            window.addEventListener("DOMMouseScroll", this.throttle(this.scrollFun, 400))
        }
        //chrome Opera
        window.onmousewheel = this.throttle(this.scrollFun, 400)
    }
    scrollFun(event) {
        let e = event || window.event
        if(e.wheelDelta) {
            if(e.wheelDelta < 0) {
                this.addTransition()
                this.setTranslate(-this.distance)
            }
            else {
                this.addTransition()
                this.setTranslate(0)
            }
        }
        else if(e.detail) {
            if(e.detail > 0) {
                this.addTransition()
                this.setTranslate(-this.distance)
            }
            else {
                this.addTransition()
                this.setTranslate(0)
            }
        }
    }
    addTransition() {
        this.el.style.transition = `all ${this.time}s linear`
    }
    setTranslate(dis) {
        this.el.style.transform = 'translateY('+ dis +'px)'
    }
}