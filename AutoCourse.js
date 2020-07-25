var chapters_length = document.querySelectorAll("ul.list").length;
var video_length = document.querySelectorAll("li.video").length;
console.log("共检测到" + chapters_length + "章" + video_length + "小节!");
document.getElementsByClassName("volumeIcon")[0].click(); //设置静音
console.log("静音设置成功!");
document.getElementsByClassName("speedTab speedTab15")[0].click(); //设置1.5倍速
console.log("1.5倍播放");
//每两秒检测进度是否100%
setInterval(() => {
  var progress = window.getComputedStyle(document.getElementsByClassName("passTime")[0], null).width; //进度数据
  if (progress == "100%") {
    //下一节
    document.getElementById("nextBtn").click();
    console.log("自动播放下一节");
    setTimeout(() => {
      //检测00:00:00状态 处理章节间跳动
      if (document.querySelector("span.duration").innerHTML == "00:00:00") {
        var finished_length = document.querySelectorAll("b.time_icofinish").length;
        document.querySelectorAll("li.video")[finished_length].click();
        console.log("进入下一章节!");
      }
    }, 2000);
  }
}, 2000);
//每秒检测弹窗
setInterval(() => {
  //防静音意外失效
  if (!document.getElementsByClassName("volumeBox  volumeNone")[0]) {
    document.getElementsByClassName("volumeIcon")[0].click();
    document.getElementsByClassName("speedTab speedTab15")[0].click(); //设置1.5倍速
  }
  if (document.getElementsByClassName("dialog-test")[0]) {
    console.log("检测到弹窗!");
    var random_number = randomNum(0, document.querySelectorAll("li.topic-item").length - 1);
    document.getElementsByClassName("topic-item")[random_number].click(); //随机选一个防作弊
    console.log("已选择第" + (random_number + 1) + "个选项");
    document.getElementsByClassName("el-dialog__wrapper dialog-test")[0].getElementsByClassName(
      "el-dialog__footer")[0].getElementsByClassName("btn")[0].click(); //关闭弹窗
    console.log("弹窗关闭!");
    document.getElementById("playButton").click(); //播放
  }
}, 1000);

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}