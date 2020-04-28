window.onload = function () {
  this.f();
  this.f1()
};
// 分类导航
function f() {
  const cgTab = document.getElementById('cg-tab')
  const cgDtail = document.getElementById('cg-detail')
  const navItems = cgTab.getElementsByClassName('nav-item')
  const icons = cgTab.getElementsByClassName('nav-item-icon')
  const details = cgDtail.getElementsByClassName('detail')

  for (let i=0;i<navItems.length;i++) {
    // 是否是第一次mouseover至navItems[i]
    navItems[i].isFirst = true;
    (function (i) {
      const links = getByName(navItems[i],'a');
      navItems[i].addEventListener("mouseover",function () {
        const color = navItems[i].getAttribute('data-color');
        toggle('block',color);
      });
      navItems[i].addEventListener("mouseout",function () {
        toggle('none','#fff');
      });
      details[i].addEventListener("mouseover",function(){
        toggle('block');
      });
      details[i].addEventListener("mouseout",function(){
        toggle('none');
      });
      function toggle(display,color,bg) {
        cgDtail.style.display = display;
        details[i].style.display = display;
        icons[i].style.color = color;
        for (let j=0; j<links.length; j++){
          links[j].style.color = color;
        }
        navItems[i].style.background = bg;
      }
    })(i)
  }
};

// benner部分
function f1 () {
  const Banner = document.getElementById('banner');
  const BannerBgs = Banner.getElementsByClassName('banner-bg');
  const Slider = Banner.getElementsByClassName('slider-nav')[0];
  const sliders = Slider.getElementsByTagName('li');
  let LastBg = BannerBgs[0];
  let LastSd = sliders[0];
  let iLen = BannerBgs.length;
  let iNum = 0;
  let timer = null;

  // 轮播图自动播放
  autoPlay();
  Banner.onmouseover = function () {
    clearInterval(timer);
  };
  Banner.onmouseout = function (){
    autoPlay();
  };

  // 轮播索引的mouseover
  Slider.addEventListener('mouseover',function(e){
  let target = e.target || e.srcElement;
  for (let i = 0; i<iLen; i++) {
    if (sliders[i] === target) {
      iNum = i;
      change();
    }
  }
  });

  // 自动播放函数
  function autoPlay() {
    clearInterval(timer);
    timer = setInterval(function(){
      iNum++;
      if(iNum === iLen){
        iNum = 0;
      }
      change();
    },3000);
  };

  // banner轮播切换函数
  function change() {
    LastBg.style.display = 'none';
    LastSd.className = '';
    BannerBgs[iNum].style.display = 'block';
    sliders[iNum].className = 'active'
    LastBg = BannerBgs[iNum];
    LastSd = sliders[iNum];
  }
}

/**
 * 通过tagName获取DOM节点
 *
 * @param      {object}  parent     父级对象
 * @param      {string}  tagname    标签名
 * @return     {object}   获取到的节点NodeList对象.
 */

function getByName (parent,tagname) {
  return parent.getElementsByTagName(tagname)
}


