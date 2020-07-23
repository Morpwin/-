class Scroll {
    constructor(el, obj) {
        this.el = el
        this.obj = Object.assign({top: 100, fadeSpeed: 10, speed: 10}, obj)
    }
    fadeOut() {   
        let timer = null, opacity = 100, that = this
        this.setOpacity(100)
        timer = requestAnimationFrame(function fn() {
            that.setOpacity(opacity -= that.obj.fadeSpeed)
            if(opacity > 0) {  
                requestAnimationFrame(fn)
            }
            else {
                cancelAnimationFrame(timer)
            }
        })
    }
    fadeIn() {
        let timer = null, opacity = 0, that = this
        this.setOpacity(0)
        timer = requestAnimationFrame(function fn() {
            that.setOpacity(opacity += that.obj.fadeSpeed)
            if(opacity < 100) {            
                requestAnimationFrame(fn)
            }
            else {
                cancelAnimationFrame(timer)
            }
        })
    }
    setOpacity(opacity) {
        this.el.style.opacity = opacity / 100
        
    }
    getScrollTop() {
        if(window.pageXOffset != null) {
            return {
                left: pageXOffset,
                top: pageYOffset
            }
        }
        else if(document.compatMode === "CSS1Compat") {
            return {
                left:document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            }
        }
        else {
            return {
                left: document.body.scrollLeft,
                top: document.body.scrollTop
            }
        }
    }
    hide() {
        this.setOpacity(0)
        this.status = "hide"
    }
    scrollEvent() {
        let that = this, leader = 0, timer = null, target = 0
        window.addEventListener("scroll", function() {
            if(that.getScrollTop().top > that.obj.top && that.status == 'hide') {
                that.fadeIn()
                that.status = "show"
            }
            else {
                if(that.getScrollTop().top < that.obj.top && that.status == "show") {
                    that.fadeOut()
                    that.status = "hide"
                }
            }
            leader = that.getScrollTop().top
        })
        this.el.addEventListener("click", function() {
            timer = requestAnimationFrame(function fn() {
                leader = leader + (target - leader) / that.obj.speed
                if(leader <= 0) {
                    cancelAnimationFrame(timer)
                }
                else {
                    window.scrollTo(0, leader)
                    requestAnimationFrame(fn);
                }
            })
        })
    }
    
    init() {
        this.hide()
        this.scrollEvent()   
    }
}