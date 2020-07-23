class LazyLoad {
    constructor(el, obj, callback) {
        this.el = el
        this.obj = obj
        this.callback = callback
    }
    loadImg() {
        let ob = new IntersectionObserver((res) => {
            res.forEach(function(data) {
                if(data.intersectionRatio > 0) {
                    data.target.children[0].src = data.target.children[0].dataset.lazyUrl
                    ob.unobserve(data.target)
                }         
            })
        }, this.obj)
        let arr = Array.from(this.el)
        for(let i in arr) {
            ob.observe(this.el[i])
        }
        
    }
    init() {
        this.loadImg()
    }
}