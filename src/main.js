const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", logoType: "text", url: "http://www.asciitable.com/" },
  { logo: "B", logoType: "text", url: "https://builtwith.com/" },
  { logo: "C", logoType: "text", url: "https://caniuse.com/" },
  { logo: "D", logoType: "text", url: "http://developer.mozilla.org" },
  { logo: "F", logoType: "text", url: "http://figma.com" },
  { logo: "G", logoType: "text", url: "https://git-scm.com/book/zh/v2" },
  { logo: "I", logoType: "text", url: "http://iconfont.cn" },
  { logo: "J", logoType: "text", url: "https://www.jquery123.com/" }
];

const simplifyUrl = url => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除/开头的内容
};
const render = () => {
  $siteList.find("li:not(.last").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
          <div class="logo">${node.logo} </div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close1"></use>
            </svg>
          </div>
        </div> 
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", e => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你有添加的网址是啥?");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: "text",
    url: url
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
$(document).on("keypress", e => {
  //  const key = e.key;此代码可以简写成如下：
  const { key } = e;

  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open("hashMap[i].url");
    }
  }
});
$("input").on("keypress", e => {
  e.stopPropagation();
});
// 没有记忆功能
//$(".addButton").on("click", () => {
//   let url = window.prompt("请问你有添加的网址是啥?");

//   if (url.indexOf("http") !== 0) {
//     url = "https://" + url;
//   }
//   const $siteList = $(".siteList");
//   const $lastLi = $siteList.find("li.last");
//   const $li = $(`<li>
// <a href="${url}">
// <div class="site">
// <div class="logo">${url[0]}</div>
// <div class="link">${url}</div>
// </div>
// </a>
// </li>`).insertBefore($lastLi);
// });
