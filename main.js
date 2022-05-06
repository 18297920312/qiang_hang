let $siteList = $('.siteList');
let $li;
let $lastLi = $siteList.find('.addButton');
const x = localStorage.getItem('x'); //从本地存储里面取出 x
const xObject = JSON.parse(x);  //把字符串变成对象
const hashMap = xObject || [  //如果 x 为空字符串，那么hashMap的值为数组
    {logo:'A',name:'acfun.com',url:'https://www.acfun.com'},
    {logo:'B',name:'bilibili.com',url:'https://www.bilibili.com'}
];



const simplify = (name) => {// 简化字符
    // console.log(url);
    return name.replace("https://","")
                .replace("htttp://","")
                .replace("www.","")
};



const render = () => { // 页面渲染 
    $siteList.find('li:not(.addButton)').remove();
    hashMap.forEach((node,index) => {
        $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${node.name}</div>
                <div class="close">
                            <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                            </svg>
                </div>
            </div>
        </li>
        `).insertBefore($lastLi);

        $li.on('click','.close',(e) => { // 点击叉叉关闭按钮
            console.log('被点击了');
            e.stopPropagation();
            hashMap.splice(index,1);
            render();
        })

        $li.on('click',() => { // 点击打开链接
            window.open(node.url);
        })
    }) 
    // let num = document.querySelectorAll('main li');
    // console.log(num.length);
    // if(num.length === 2){
    //     $siteList.attr('display','none');
    // }
}

render();




$('.addButton')
    .on('click',() => {
        let link = window.prompt('请输入网址：');
        if(link === ''){ // 防止用户输入字符为空
            return;
        }
        else if (link.indexOf('http') !== 0){ // 规范网址
            link = 'https://' + link;
        }
        let upCase = simplify(link);
        upCase = upCase[0].toUpperCase();
        hashMap.push({ 
            logo: upCase,
            name: simplify(link),
            url: link, 
        });
        render();
        console.log(hashMap);
    });

    window.onbeforeunload = () => {
        const string = JSON.stringify(hashMap); // 将对象保存为字符串
        localStorage.setItem('x',string); // 在本地存储里面保存一个x，他的值就是string
    }



