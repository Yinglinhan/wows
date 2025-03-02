import './style.css'

import Lenis from 'lenis'

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


// // Initialize Lenis
// const lenis = new Lenis();

// // Listen for the scroll event and log the event data
// lenis.on('scroll', (e) => {
//   // console.log(e);
// });

// // Use requestAnimationFrame to continuously update the scroll
// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

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

function init(){
  gsap.set('.unvisible',{opacity:0})
}

init()


// window.addEventListener('scroll',()=>{
//   console.log(scrollY);
// })

const container = document.querySelector('.container');

gsap.to('.overlay',{
  y: -1500,
  scrollTrigger:{

    start: 'top top',
    end: '+=1500',
    scrub: 1,

    
  },
  // onUpdate:()=>{
  //  if(window.scrollY > 700){
  //   gsap.set('.overlay',{
  //     opacity: 0
  //   })
  //  }
  // }
})


gsap.to('.path-move',{
  strokeDashoffset: 0,
  scrollTrigger:{
    start: '600',
    end: '6000',
    scrub: 1,
  }
})



// gsap.to('.container',{
//   y:-300,
//   scrollTrigger:{
//     start: '600',
//     end: '1900',
//     scrub: 1,

//   },
//   overwrite: 'auto'
// })

// gsap.to('.container',{
//   y:-1500,
//   scrollTrigger:{
//     start: '1900',
//     end: '4000',
//     scrub: 1,
//     onToggle:()=>{
//       console.log(scrollY);
//       console.log(container.style.transform);
//     }
//   }
// })




const tl = gsap.timeline({
  scrollTrigger:{
    start: '0',
    end: '6000',
    scrub: 1,
  }
})

  tl.to('.container',{
    y: 0,
    duration: 1,
    ease: 'power1.inOut'
  })
  .to('.container',{
    y: -300,
    duration: 0.5,
    ease: 'power1.inOut'
  })
  .to('.container',{
    y: -1000,
    duration: 3,
    ease: 'power1.inOut'
  })
  .to('.container',{
    y: -1400,
    duration: 2,
    ease: 'power1.inOut'
  })
  .to('.container',{
    y: -1800,
    duration: 2,
    ease: 'power1.inOut'
  })
  .to('.container',{
    y: -2600,
    duration: 2,
    ease: 'power1.inOut'
  })


  gsap.to('.container',{
    scale: 0.65,

    scrollTrigger:{
      start: '2200',
      end: '3000',
      scrub: 1,
    }
  })

  gsap.to('.container svg',{
    y: -500,

    scrollTrigger:{
      start: '2200',
      end: '3000',
      scrub: 1,
    }
  })








function pointAniShow(selector){

  const number = selector.slice(-1)
  gsap.fromTo('.orange-circle' + number,{
    opacity: 0,
    scale: 0
  },{
    opacity: 1,
    scale: 1,
    duration: 0.15,
    ease: 'power1.inOut'
  })

  gsap.to(selector + ' .point-title',{
    y: '-=150',
    duration: 0.15,
    ease: 'power3.in',
    // delay: 0.03
  })
  gsap.to(selector + ' .point-icon',{
    y: '-=150',
    duration: 0.15,
    ease: 'power1.inOut'
  })

  gsap.to(selector + ' .orange-line',{
    y: '-=150',
    duration: 0.15,
    ease: 'power1.inOut'
  })

  gsap.to(selector + ' .point-icon',{
    fill: '#E76201',
    duration: 0.15,
    ease: 'power1.inOut'
  })

  gsap.to(selector + ' .point-title',{
    fill: '#E76201',
    duration: 0.15,
    ease: 'power1.inOut'
  })




  gsap.to(selector + ' .orange-line',{
    opacity: 1,
    duration: 0.15,
    ease: 'power1.inOut'
  })


  gsap.to(selector + ' .main-text',{
    opacity: 1,
    duration: 0.15,
    ease: 'power1.inOut',
    delay: 0.1
  })

  gsap.fromTo(selector + ' .main-text',{
    y: -120,
  },{
    y: -150,
    duration: 0.15,
    ease: 'power1.inOut',
    delay: 0.1
  })

  gsap.to(selector + ' .line1',{
    opacity: 1,
    duration: 0.15,
    ease: 'power1.inOut',
    delay: 0.1,
    duration: 0.12
  })

  gsap.fromTo(selector + ' .line1',{
    y: -150,
    x: -10
  },{
    y: -150,
    x: 0,
    delay: 0.1,
    duration: 0.12,
  })

  gsap.to(selector + ' .line2',{
    opacity: 1,
    duration: 0.12,
    ease: 'power1.inOut',
    delay: 0.2
  })

  gsap.fromTo(selector + ' .line2',{
    y: -150,
    x: -10
  },{
    y: -150,
    x: 0,
    delay: 0.2,
    duration: 0.12,
  })

 




  // gsap.to(`${selector} > .unvisible`,{
  //   opacity: 1,
  //   duration: 0.15,
  //   ease: 'power1.inOut'
  // })
}

function pointAniHide(selector){

  const number = selector.slice(-1)
  gsap.fromTo('.orange-circle' + number,{
    opacity: 1,
    scale: 1
  },{
    opacity: 0,
    scale: 0,
    duration: 0.15,
    ease: 'power1.inOut'
  })


  gsap.to(selector + ' .point-title',{
    y: '+=150',
    duration: 0.15,
    ease: 'power1.inOut'
  })
  gsap.to(selector + ' .point-icon',{
    y: '+=150',
    duration: 0.15,
    ease: 'power1.inOut'
  })
  gsap.to(selector + ' .orange-line',{
    y: '+=150',
    duration: 0.15,
    ease: 'power1.inOut'
  })

  gsap.to(selector + ' .point-icon',{
    fill: 'white',
    duration: 0.15,
    ease: 'power1.inOut'
  })

  gsap.to(selector + ' .point-title',{
    fill: 'white',
    duration: 0.15,
    ease: 'power1.inOut'
  })
  gsap.to(selector + ' .orange-line',{
    opacity: 0,
    duration: 0.15,
    ease: 'power1.inOut'
  })
  gsap.to(selector + ' .main-text',{
    opacity: 0,
    duration: 0.15,
    ease: 'power1.inOut'
  })

  gsap.to(selector + ' .line1',{
    opacity: 0,
    duration: 0.15,
    ease: 'power1.inOut'
  })

  gsap.to(selector + ' .line2',{
    opacity: 0,
    duration: 0.15,
    ease: 'power1.inOut'
  })

}

const pointsShowStates = {
  point1: false,
  point2: false,
  point3: false,
  point4: false,
  point5: false,
  point6: false,
  point7: false,
  point8: false,
}

const containerStates = {
  scale1: false,
  containerScale: false,
  overlayHidden: false,
}


// 直接创建一个scrollTrigger实例
const scrollTrigger = ScrollTrigger.create({
  trigger: 'body',
  start: '0',
  end: '6000',
  onUpdate: (self)=>{



    console.log(self.progress);

    // point1
    if(self.progress > 0.1 && !pointsShowStates.point1){
      pointsShowStates.point1 = true
      pointAniShow('.point-1')
    }
    if(self.progress < 0.1 && pointsShowStates.point1){
      pointsShowStates.point1 = false
      pointAniHide('.point-1')
    }

    // point2
    if(self.progress > 0.1773 && !pointsShowStates.point2){
      pointsShowStates.point2 = true
      pointAniShow('.point-2')
    }
    if(self.progress < 0.1773 && pointsShowStates.point2){
      pointsShowStates.point2 = false
      pointAniHide('.point-2')
    }


    // point3
    if(self.progress > 0.248 && !pointsShowStates.point3){
      pointsShowStates.point3 = true
      pointAniShow('.point-3')
    }
    if(self.progress < 0.248 && pointsShowStates.point3){
      pointsShowStates.point3 = false
      pointAniHide('.point-3')
    }

    // point4
    if(self.progress > 0.3095 && !pointsShowStates.point4){
      pointsShowStates.point4 = true
      pointAniShow('.point-4')
    }
    if(self.progress < 0.3095 && pointsShowStates.point4){
      pointsShowStates.point4 = false
      pointAniHide('.point-4')
    }

    // point5
    if(self.progress > 0.3987 && !pointsShowStates.point5){
      pointsShowStates.point5 = true
      pointAniShow('.point-5')
    }
    if(self.progress < 0.3987 && pointsShowStates.point5){
      pointsShowStates.point5 = false
      pointAniHide('.point-5')
    }

    // point6
    if(self.progress > 0.4481 && !pointsShowStates.point6){
      pointsShowStates.point6 = true
      pointAniShow('.point-6')
    }
    if(self.progress < 0.4481 && pointsShowStates.point6){
      pointsShowStates.point6 = false
      pointAniHide('.point-6')
    }

    // point7
    if(self.progress > 0.572 && !pointsShowStates.point7){
      pointsShowStates.point7 = true
      pointAniShow('.point-7')
    }
    if(self.progress < 0.572 && pointsShowStates.point7){
      pointsShowStates.point7 = false
      pointAniHide('.point-7')
    }

    // point8
    if(self.progress > 0.687 && !pointsShowStates.point8){
      pointsShowStates.point8 = true
      pointAniShow('.point-8')
    }
    if(self.progress < 0.687 && pointsShowStates.point8){
      pointsShowStates.point8 = false
      pointAniHide('.point-8')
    }






    if(self.progress > 0.19 && !containerStates.scale1){
      containerStates.scale1 = true
      gsap.to('.container > svg',{
        scale: 1,
  

      })
    }
    if(self.progress < 0.19 && containerStates.scale1){
      containerStates.scale1 = false
      gsap.to('.container > svg',{
        scale: 1.38,
      })
    }


    if(self.progress > 0.1 && !containerStates.overlayHidden){
      containerStates.overlayHidden = true
      gsap.set('.overlay',{
        opacity: 0
      })
    }
    if(self.progress < 0.1 && containerStates.overlayHidden){
      containerStates.overlayHidden = false
      gsap.set('.overlay',{
        opacity: 1
      })
    }

    // if(self.progress > 0.38 && !containerStates.containerScale){
    //   containerStates.containerScale = true
    //   gsap.to('.container',{
    //     scale: 0.65,
    //   })
    // }
  }
})