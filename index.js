// 封装查找函数（查找单一元素）
function $(selector) {
  return document.querySelector(selector);
}

//定义需要使用的变量
var imgIndex = null; //特殊位置需要使用的照片索引（9的倍数位置）
var maxImgNumber = 15; //图片的最大下标
var isGameOver = false; //游戏是否结束

// 获取需要操作的DOM元素
var dictionary = $(".dictionary"); //字典表容器
var panel = $(".panel"); //魔盘容器
var initImg = $(".initImg"); //魔盘中心得初始图片
var resultImg = $(".resultImg"); //魔盘中心的结果图片

// 产生随机数的函数
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 初始化，动态生成字典表
function init() {
  //得到特殊位置(9的倍数位置)的图片的下标
  imgIndex = random(0, maxImgNumber);

  //清空之前渲染的字典表数据
  dictionary.innerHTML = "";

  var curIndex = null; //图片的实时下标

  //循环生成字典表
  for (var i = 0; i < 100; i++) {
    if (i % 9 === 0) {
      curIndex = imgIndex;
    } else {
      curIndex = random(0, maxImgNumber);
    }

    dictionary.innerHTML += `<div>
        <span class = 'number'>${i}</span>
        <span>
            <img src='./images/values/${curIndex}.png'/>
        </span>
    <div>`;
  }
}

init();

// 交互
// 给魔盘添加点击事件
panel.addEventListener("click", function (e) {
  if (isGameOver) {
    //游戏结束，询问是否再来一局，并初始化
    if (window.confirm("是否需要再来一局？")) {
      init(); //初始化字典表数据
      initImg.style.opacity = 1; //显示魔盘中心初始图片
      resultImg.style.opacity = 0; //隐藏结果图片

      //移出动画属性
      panel.setAttribute("style", "");
      //移出动画完成后触发的事件（不然下一次会直接触发）
      panel.removeEventListener("transitionend", transitionendHandle);

      isGameOver = false; //游戏开始
    }
  } else {
    // 游戏没有结束
    // 使魔盘旋转起来
    e.currentTarget.style.transition = "all 2s"; //添加动画
    e.currentTarget.style.transform = "rotate(1800deg)"; //旋转1800度

    // 动画完成后触发的事件
    panel.addEventListener("transitionend", transitionendHandle);
  }
});

// 动画完成后触发的事件
function transitionendHandle() {
  //魔盘中心初始图片隐藏，结果图片显示
  initImg.style.opacity = 0;
  resultImg.style.opacity = 1;
  resultImg.src = `./images/values/${imgIndex}.png`;

  isGameOver = true; //游戏结束
}
