import './style.css'
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);




function init(){
  gsap.set('.unvisible',{opacity:0})
}

init()

const container = document.querySelector('.container')

window.addEventListener('scroll',()=>{
  console.log(scrollY)
  container.style.transform = `translate3d(0,${scrollY}px,0)`
})


// let tl = gsap.timeline({
//   scrollTrigger:{
//     trigger:'.section-body',
//     start:'top top',
//     end:'bottom bottom',
//     scrub:true,
//     // pin:'transform'
//   }
// })

// // 第一阶段：保持原位（固定效果）
// tl.to(".container", {
//   y: 0,
//   duration: 1,
//   ease: "none",
// });

// // 第二阶段：慢速移动
// tl.to(".container", {
//   y: () => -window.innerHeight * 0.3, // 向上移动视窗高度的 30%
//   duration: 1,
//   ease: "none",
// });

// // 第三阶段：快速移动
// tl.to(".container", {
//   y: () => -window.innerHeight * 0.8, // 向上移动视窗高度的 80%
//   duration: 1,
//   ease: "none",
// });

