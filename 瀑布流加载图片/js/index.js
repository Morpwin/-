/* 
    瀑布流分析
    1. 给每张图设定一个left和top进行排列
    2. left值是前一张图片的下标*(图片宽度 + 间隔)
    3. top值分两种，如果是第一行，则top全为0，然后获取到第一行中高度最小的那个图片，然后第二行的第一张图的高度为minHeight+间隔，第二张类似计算
    4. 滚动滚动条，获取图片库的图片数量，进行节点的创建
*/
//全局定义变量，data为模拟数据
var arrHeight = []
var data = [{
    img: "1.jpg"}, {img: "2.jpg"}, {img: "3.jpg"}, { img: "4.jpg"}, 
    {img: "5.jpg"}, {img: "6.jpg"}, {img: "7.jpg"}, {img: "8.jpg"}, { img: "9.jpg"}, {img: "10.jpg"}
]
window.onload = function () {
    fall()    
    //避免一开始没有出现滚动条，可以根据情况设定
    if(checkFlag()) {
        createImg()
    }
    window.onscroll = function () {
        if(checkFlag()) {
            createImg()
        }
    }

}
//判断是否加载图片
function checkFlag() {
    //获取到高度最大的一列
    let maxHeight = Math.max.apply(Math, this.arrHeight)
    //可视窗口高度
    let pageTop = document.documentElement.clientHeight || document.body.clientHeight
    //滚动了的高度
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let sum = pageTop + scrollTop
    if (maxHeight <=  sum + 100) {
        return true
    } else {
        return false
    }
}
//创建图片
function createImg() {
    let imgBox = document.querySelector(".imgBox");
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li")
        imgBox.appendChild(li)
        let img = document.createElement("img")
        img.src = `./images/${data[i].img}`
        li.appendChild(img)
    }
    fall()
}
//瀑布流排序，接收左右间距和上下间距两个参数
function fall(marginLeft, marginTop) {
    let container = document.querySelector(".container")
    let imgBox = document.querySelector(".imgBox");
    let boxWidth = imgBox.offsetWidth;
    let imgLis = imgBox.children
    let imgWidth = imgBox.children[0].offsetWidth;
    let gapLeft = marginLeft || 20
    let gapTop = marginTop || 10
    //求出一行可以放多少张图片
    let imgNum = Math.floor((boxWidth + gapLeft) / (imgWidth + gapLeft))
    container.style.width = imgNum*(imgWidth+gapLeft) - gapLeft + "px"
    let imgHeight = 0;
    let imgLeft = 0;
    for (let i = 0, len = imgLis.length; i < len; i++) {
        //第一行
        if (i < imgNum) {
            imgLeft = i * (imgWidth + gapLeft)
            imgHeight = imgLis[i].offsetHeight
            imgLis[i].style.left = imgLeft + "px"
            //保存第一行每张图片的高度
            arrHeight[i] = imgHeight
        } else {  //其他行
            //计算最小的图片高度
            let minHeight = Math.min.apply(Math, arrHeight)
            //获取其下标
            let index = getMinHeightIndex(arrHeight, minHeight)
            imgLeft = imgLis[index].offsetLeft;
            imgLis[i].style.left = imgLeft + "px"
            imgLis[i].style.top = arrHeight[index] + gapTop + "px"
            imgHeight = imgLis[i].offsetHeight + gapTop;
            //将图片插入最小高度处，最后要将插入的图片高度添加到数组中
            arrHeight[index] += imgHeight

        }
    }
}
//获取最小高度图片的下标
function getMinHeightIndex(arr, min) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == min) {
            return i
        }
    }
}