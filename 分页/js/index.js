/*
    分页
    1.点击相应的按钮，给后台传递一个pageSize(每页展示数量)和pageNum(页码),进行查询
    2.后台返回数据，包括展示的数据，和总页数或者是总共分了多少页，后台数据用自定义的模拟
    3.根据分的页数，创建页码，一行最多展示5个页码按钮，
*/
const data = [{title: "第1条数据"},{title: "第2条数据"},{title: "第3条数据"},
{title: "第4条数据"},{title: "第5条数据"},{title: "第6条数据"},
{title: "第7条数据"},{title: "第8条数据"},{title: "第9条数据"},
{title: "第10条数据"},{title: "第11条数据"},{title: "第12条数据"},
{title: "第13条数据"},{title: "第14条数据"},{title: "第15条数据"}]


let pageSize = 2;
let pageNum = 1;
let allNum = 1;
window.onload = function () {
    changePageSize()
}

function getData(size, num) {
    let arr = []
    let add = size;
    arr = data.filter((v, i) => {
        if (i >= (num - 1) * size && add) {
            add--
            return i >= (num - 1) * size

        } else {
            return
        }

    })
    allNum = Math.ceil(data.length / size)
    render(arr, allNum)
}

function render(data, allNum) {
    let content = document.querySelector(".content");
    let num = document.querySelector(".num")
    let insertStr = "";
    let insertNum = "";
    for (let i = 0; i < data.length; i++) {
        let str = `
            <p>${data[i].title}</p>
        `
        insertStr += str


    }
    if (allNum <= 5) {
        for (let i = 0; i < allNum; i++) {
            if (i == pageNum - 1) {
                str = `
                    <li class="now" onclick="jump(${i+1})">${i+1}</li>
                `
            } else {
                str = `
                    <li onclick="jump(${i+1})">${i+1}</li>
            `
            }
            insertNum += str
        }
    } else {
        for (let i = 0; i < 5; i++) {
            let str = ""
            if (pageNum <= 3) {
                if (i == pageNum - 1) {
                    str = `
                            <li class="now" onclick="jump(${i+1})">${i+1}</li>
                        `
                } else {
                    str = `
                            <li onclick="jump(${i+1})">${i+1}</li>
                    `
                }
                insertNum += str
            } else if (pageNum >= allNum - 2) {
                if (allNum - 4 + i == pageNum) {
                    str = `
                            <li class="now" onclick="jump(${allNum - 4 + i})">${allNum - 4 + i}</li>
                        `
                } else {
                    str = `
                            <li onclick="jump(${allNum - 4 + i})">${allNum - 4 + i}</li>
                    `
                }
                insertNum += str
            } else {
                if (i == 2) {
                    str = `
                            <li class="now" onclick="jump(${pageNum - 2 + i})">${pageNum - 2 + i}</li>
                        `
                } else {
                    str = `
                            <li onclick="jump(${pageNum - 2 + i})">${pageNum - 2 + i}</li>
                    `
                }
                insertNum += str
            }

        }
    }
    content.innerHTML = insertStr
    num.innerHTML = insertNum
}

function jump(str) {
    let jumpNum = document.querySelector("input").value
    switch(str) {
        case "first": pageNum = 1;
        getData(pageSize, pageNum);
        break;
        case "prev": if(pageNum != 1) {
            pageNum --;
            getData(pageSize, pageNum);
        } else {
            alert("没有上一页了")
        }
        break;
        case "next": if(pageNum != allNum) {
            pageNum ++;
            getData(pageSize, pageNum);
        } else {
            alert("没有下一页了")
        }
        break;
        case "last": pageNum = allNum;
        getData(pageSize, pageNum);
        break;
        case "input": if(jumpNum <= 0 || jumpNum > allNum) {
            alert("没有找到该页")
        } else {
            pageNum = jumpNum;
            getData(pageSize, pageNum);
        }
        break;
        default: pageNum = str;
        getData(pageSize, pageNum);
    }
}

function changePageSize() {
    let selectPageSize = document.querySelector("select");
    pageSize = selectPageSize.value;
    getData(pageSize,pageNum)
}