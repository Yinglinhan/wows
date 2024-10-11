import './style.css'
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


// 帮我获取#svg2,#svg3
// const svg2 = document.getElementById('svg2');
// const svg3 = document.getElementById('svg3');

// 帮我获取#svg2,#svg3的path
// const svg2Path = svg2.querySelector('svg2Path');
// const svg3Path = svg3.querySelector('svg3Path');


  // 帮我创建一个动画，动画内容是：
  // 1. 让#svg2Path的stroke-dashoffset从20000变为0
  // 2. 让#svg3Path的stroke-dashoffset从20000变为0
  // gsap.to("#svg2Path", {
  //   strokeDashoffset: 0,
  //   duration: 6,
  //   ease: "power1.inOut"
  // });

  // gsap.to("#svg3Path", {
  //   strokeDashoffset: 0,
  //   duration: 6,
  //   ease: "power1.inOut",

  // });

// 这里实现滚动逻辑
// 获取container
// const container = document.querySelector('.container');
// // 获取渐变
// const line = document.getElementById('line');

// // line.setAttribute('gradientTransform', `translate(0,-300)`);
// window.addEventListener('scroll',()=>{
//   console.log(window.scrollY);
//   // container.style.transform = `translateY(${window.scrollY}px)`;
//   // gradientTransform="translate(0,-300)" 

//   // line.setAttribute('gradientTransform', `translate(0,-${window.scrollY/3})`);
//   // line.gradientTransform = `translate(0,-${window.scrollY})`;
// })

window.addEventListener('scroll',()=>{
  console.log(window.scrollY);
})


function init(){
  gsap.set('.unvisible',{
    opacity: 0
  })
}

init()



gsap.to('.overlay',{
  y: -1000,
  scrollTrigger:{

    start: 'top top',
    end: '+=1500',
    scrub: 1,
    
  },
  onComplete:()=>{
    gsap.set('.overlay',{
      display: 'none'
    })
  }
})

gsap.to('.container',{
  y: -300,
  scrollTrigger:{
    start: '1500',
    end: '3500',
    scrub: 1,
  }
})
gsap.to('.path-move',{
  strokeDashoffset: 0,
  scrollTrigger:{
    start: '1500',
    end: '10000',
    scrub: 1,
  }
})