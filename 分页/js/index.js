//模拟数据
const data = [{title: "第1条数据"},{title: "第2条数据"},{title: "第3条数据"},
{title: "第4条数据"},{title: "第5条数据"},{title: "第6条数据"},
{title: "第7条数据"},{title: "第8条数据"},{title: "第9条数据"},
{title: "第10条数据"},{title: "第11条数据"},{title: "第12条数据"},
{title: "第13条数据"},{title: "第14条数据"},{title: "第15条数据"}]
class Page {
    constructor(el, content, options, callback) {
        this.el = el,
        this.content = content
        this.options = Object.assign({
                pageSize: 2,
                pageNum: 1,
                allNum: 1,
                selectValue: [1, 2, 5, 10, 15, 20],
                select: true,
                first: true,
                prev: true,
                next: true,
                last: true,
                jump: true
            }, options),
            this.callback = callback
    }
    init() {
        this.initSizeSelect()
        this.initJumpBtn()
        this.initSearch()
        this.getData(this.options.pageSize, this.options.pageNum)
    }
    //初始化选择pageSize
    initSizeSelect() {
        if (this.options.select) {
            let div = document.createElement("div")
            div.className = "pageSize"
            let select = document.createElement("select")
            select.addEventListener("change", this.changePageSize.bind(this))
            div.appendChild(select)
            this.options.selectValue.forEach((val) => {
                let option = document.createElement("option")
                option.value = val
                option.innerHTML = val
                select.appendChild(option)
            })
            this.el.appendChild(div)
        }
    }
    //初始化跳转按钮
    initJumpBtn() {
        if (this.options.first) {
            this.createJumpBtn("首页", "first")
        }
        if (this.options.prev) {
            this.createJumpBtn("上一页", "prev")
        }
        let ul = document.createElement("ul")
        ul.className = "num"
        this.el.appendChild(ul)
        if (this.options.next) {
            this.createJumpBtn("下一页", "next")
        }
        if (this.options.prev) {
            this.createJumpBtn("尾页", "last")
        }

    }
    initSearch() {
        if (this.options.jump) {
            let div = document.createElement("div")
            div.className = "jump"
            let input = document.createElement("input")
            input.maxLength = "3"
            input.type = "text"
            div.appendChild(input)
            let btn = document.createElement("button")
            btn.innerHTML = "跳转"
            btn.addEventListener("click", this.jump.bind(this,"input"))
            div.appendChild(btn)
            this.el.appendChild(div)
        }
    }
    //创建跳转按钮
    createJumpBtn(name, className) {
        let div = document.createElement("div")
        div.innerHTML = name
        div.className = className
        div.addEventListener("click", this.jump.bind(this,className))
        this.el.appendChild(div)
    }
    //获取数据，这里模拟获取本地的数据，真实向后台请求数据可以把相关参数传递给后台，获取后台返回的数据数组和总页数
    getData(size, num) {
        let arr = []
        let add = size
        arr = data.filter((v, i) => {
            if (i >= (num - 1) * size && add) {
                add--
                return i >= (num - 1) * size

            } else {
                return
            }
        })
        this.options.allNum = Math.ceil(data.length / size)
        this.render(arr, this.options.allNum)
    }
    //渲染
    render(data, allnum) {
        let num = document.querySelector(".num")
        let insertContent = ""
        let fragment = document.createDocumentFragment()
        let pageNum = this.options.pageNum
        data.forEach((v, i) => {
            let str = `
                <p>${v.title}</p>
            `
            insertContent += str
        })
        if (allnum <= 5) {
            for (let i = 0; i < allnum; i++) {
                if (i == pageNum - 1) {
                    fragment.appendChild(this.createNum(i + 1, "now"))
                } else {
                    fragment.appendChild(this.createNum(i + 1))
                }
            }
        } else {
            for (let i = 0; i < 5; i++) {
                if (pageNum <= 3) {
                    if (i == pageNum - 1) {
                        fragment.appendChild(this.createNum(i + 1, "now"))
                    } else {
                        fragment.appendChild(this.createNum(i + 1))
                    }
                } else if (pageNum >= allnum - 2) {
                    if (allnum - 4 + i == pageNum) {
                        fragment.appendChild(this.createNum(allnum - 4 + i, "now"))
                    } else {
                        fragment.appendChild(this.createNum(allnum - 4 + i))
                    }
                } else {
                    if (i == 2) {
                        fragment.appendChild(this.createNum(pageNum - 2 + i, "now"))
                    } else {
                        fragment.appendChild(this.createNum(pageNum - 2 + i))
                    }
                }

            }
        }
        num.innerHTML = ""
        num.appendChild(fragment)
        this.content.innerHTML = insertContent
        this.callback(`当前页码${pageNum}  每页${this.options.pageSize}条数据 总共${allnum}页`)
    }
    createNum(num, className) {
        let li = document.createElement("li")
        li.innerHTML = num
        if (className) {
            li.className = className
        }
        li.addEventListener("click", this.jump.bind(this, num))
        return li

    }
    changePageSize() {
        let selectPageSize = document.querySelector("select");
        this.options.pageSize = selectPageSize.value;
        this.getData(this.options.pageSize,this.options.pageNum)
    }
    jump(str) {
        switch (str) {
            case "first":
                this.options.pageNum = 1;
                this.getData(this.options.pageSize, this.options.pageNum);
                break;
            case "prev":
                if (this.options.pageNum != 1) {
                    this.options.pageNum--;
                    this.getData(this.options.pageSize, this.options.pageNum);
                } else {
                    alert("没有上一页了")
                }
                break;
            case "next":
                if (this.options.pageNum != this.options.allNum) {
                    this.options.pageNum++;
                    this.getData(this.options.pageSize, this.options.pageNum);
                } else {
                    alert("没有下一页了")
                }
                break;
            case "last":
                this.options.pageNum = this.options.allNum;
                this.getData(this.options.pageSize, this.options.pageNum);
                break;
            case "input":
                let jumpNum = document.querySelector("input").value
                if (jumpNum <= 0 || jumpNum > this.options.allNum) {
                    alert("没有找到该页")
                } else {
                    this.options.pageNum = jumpNum;
                    this.getData(this.options.pageSize, this.options.pageNum);
                }
                break;
            default:
                this.options.pageNum = str;
                this.getData(this.options.pageSize, this.options.pageNum);
        }
    }
}