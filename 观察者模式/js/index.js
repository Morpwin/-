class EventEmitter {
    constructor() {
        this.events = {}
    }
    isFunction(fn) {
        if(typeof fn !== "function") {
            return false
        }
        else {
            return true
        }
    }
    indexOf(array, item) {
        let index = -1
        array.forEach((v, i) => {
            if(v.fn === item) {
                index = i
            }
        })
        return index
    }
    /*  key: 事件名称
        fn: 绑定的事件
        once: 是否只执行一次
    */
    addEvent(key, fn, once = false) {
        if(!this.isFunction(fn)) {
            throw new Error("添加的必须是函数")
        }
        let events = this.events
        if(events[key]) {
            if(this.indexOf(events[key], fn) === -1) {
                events[key].push({
                    fn: fn,
                    once: once
                })
            }
        }
        else {
            events[key] = [{
                fn: fn,
                once: once
            }]
        }
        return this
    }
    removeEvent(key, fn) {
        let events = this.events
        if(!events[key]) {
            throw new Error("没有找到该事件")
        }
        if(!fn) {
            events[key].length = 0
            return
        }
        let index = this.indexOf(events[key], fn)
        if(index === -1) {
            throw new Error("这个方法还没添加，也删不了")
        } 
        else {
            events[key].splice(index, 1)
        }
        return this
    }
    once(key, fn) {
        this.addEvent(key, fn, true)
        return this
    }
    emit(key, fn, ...args) {
        let events = this.events
        if(fn) {
            if(!this.isFunction(fn)) {
                throw new Error("第二个参数必须是需要触发的函数或者null")
            }
            let index = this.indexOf(events[key], fn)
            if(index === -1) {
                throw new Error("该方法不存在")
            }
            fn(...args)
            if(events[key][index].once) {
                this.removeEvent(key, events[key][index].fn)
            }
        }
        else {            
            for(let i  = 0; i < events[key].length; i++) {
                events[key][i].fn(...args)
                if(events[key][i].once) {
                    this.removeEvent(key, events[key][i].fn)
                    //删除了一项之后下标变化了，这里手动把下标减一
                    i--
                }
            }
        }
        return this
    }
}