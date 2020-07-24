# demos



### [分页](https://morpwin.github.io/demos/%E5%88%86%E9%A1%B5/)
### [导航浮窗](https://morpwin.github.io/demos/%E5%AF%BC%E8%88%AA%E6%B5%AE%E7%AA%97/)
### [轮播图](https://morpwin.github.io/demos/%E8%BD%AE%E6%92%AD%E5%9B%BE/)
### [瀑布流加载图片](https://morpwin.github.io/demos/%E7%80%91%E5%B8%83%E6%B5%81%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87/)(这个图片较多，加载比较慢)
### [返回顶部](https://morpwin.github.io/demos/%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8/)

#### 使用

    <script src="js/index.js"></script>
    
#### 示例

Html

    <div class="goTop">
        <img src="Top.jpg" alt="返回顶部">
    </div>
    
Javascript
    
    var scroll = new Scroll(el, obj, callback)
    scroll.init()

#### 参数

    el: html元素,如这里为document.querySelector(".goTop")
    obj: {
        top: 100,  //距离顶部100px显示，默认100
        fadeSpeed: 10,  //淡入淡出的速度，默认10
        speed: 10  //滚动到顶部的速度，默认10
    }
    callback: 触顶回调函数

    var scroll = new Scroll(document.querySelector(".goTop"), {top: 200, fadeSpeed: 20, speed: 20}, function() {
        console.log("到顶了")
    })
    scroll.init()
    
### [懒加载](https://morpwin.github.io/demos/%E6%87%92%E5%8A%A0%E8%BD%BD/)

这个懒加载使用了比较新的API **[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)**，用其代替传统的scroll事件


#### 使用

    <script src="js/index.js"></script>
    
#### 示例

Html

    <div class="img-box">
        <img src="./images/loading.gif" data-lazy-url="./images/1.jpg">
    </div>
    
src里为默认图片，data-lazy-url里为真正要加载的图片
    
Javascript

    let lazyLoad = new LazyLoad(el, obj, callback)
    lazyLoad.init()
    
#### 参数

    el: html元素,如这里为document.querySelectorAll(".img-box")
    obj为IntersectionObserver API所需的参数，这里列出几个，{
        threshold: [0, 0.25, 0.5, 0.75, 1] , //决定了什么时候触发回调函数,和图片交叉的比例
        root: document.querySelector('.container'), //指定目标元素所在的容器节点,不指定则为浏览器窗口
        rootMargin: "500px 0px"  //交叉区域的大小
    }
    callback: 加载完一张图片则会触发回调函数

    let lazyLoad = new LazyLoad(document.querySelectorAll(".img-box"), {}, function() {
        console.log("加载完了")
    })
    lazyLoad.init()
    
### [上拉加载](https://morpwin.github.io/demos/%E4%B8%8A%E6%8B%89%E5%8A%A0%E8%BD%BD/)

上拉加载和懒加载相同，使用了
**[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)** API

以最下面的loading为目标，当出现loading，则进行加载

#### 使用

    <script src="js/index.js"></script>

#### 示例

Html

    <article class="article">
        <p>There are moments in life when you miss someone so much that you just want to pick them from your dreams and hug them for real! Dream what you want to dream;go where you want to go;be what you want to be,because you have only one life and one chance to do all the things you want to do.</p>
    </article>
    <div class="loading">
        <img src="./images//loading.gif" alt="">
    </div>
    
Javascript

    let pullToLoad = new PullToLoad(container, target, obj, callback) 
    pullToLoad.init()
    
#### 参数

    container: 容器元素，加载的元素会向这个容器添加
    target: 目标元素，使用container.insertBefore(item, target)插入元素
    obj: IntersectionObserver API的参数
    callback: 加载完触发的回调函数
    
