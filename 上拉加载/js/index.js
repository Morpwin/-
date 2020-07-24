class PullToLoad {
    constructor(container, target, obj, callback) {
        this.container = container
        console.log(this.container)
        this.target = target,
        this.obj = obj,
        this.callback = callback
    }
    loadItem() {
        let that = this
        let content = document.querySelector("p").innerHTML
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                for(let i = 0; i < 3; i++) {
                    let item  = document.createElement("p");
                    item.innerHTML = content
                    if(that.target) {
                        that.container.insertBefore(item, that.target)
                    }
                    else {
                        that.container.appendChild(item)
                    }
                    
                }
                resolve()
            },2000)
        })   
    }
    load() {
        let loading = document.querySelector(".loading")
        let that = this
        this.loading = false
        let ob = new IntersectionObserver((res) => {
            if(res[0].intersectionRatio >= 0) {
                if(!that.loading) {
                    loading.style.opacity = 1
                    that.loading = true  
                    that.loadItem().then(() => {
                        loading.style.opacity = 0
                        that.loading = false
                        that.callback()
                    })
                }
            }
            else {
                return
            }
        }, Object.assign({threshold: [0.25]}, that.obj))
        ob.observe(target)
    }
    init() {
        this.load()
    }
}