import './style.css'
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);



// 定义一个节流函数
function throttle(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, args);
        timeout = null;
      }, wait);
    }
  };
}



// 获取.main-num这个元素
const mainNum = document.querySelector('.main-num');
// 创建一个函数，有一个参数
function setMainNum(num){
  const basicNum = 600

  // 这个数字需要进行处理，处理成临近的尾数为0的数字
  const newNum = Math.round((basicNum - num) / 10) * 10
  console.log(newNum)
  mainNum.textContent = newNum
  // 数字进行处理，处理成临近的
  gsap.fromTo(mainNum, 
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true  // 这将停止并覆盖任何现有的动画
    })
}


const setMainNumThrottle = throttle(setMainNum, 250)




// 创建一个对象，保存所有图标，用一个属性
const iconsAnimation = {
  icons:[
    '#icon-3',
    '#icon-2',
    '#icon-1',
    
   
  ],
  isStarted:false,
  isDisappear:false,
  init(){
    gsap.set(iconsAnimation.icons, {
      x: -50,
      opacity: 0,
      overwrite: true
    })
  },
  disappear:()=>{
    if(iconsAnimation.isDisappear){
      return
    }
    iconsAnimation.isDisappear = true
    gsap.to(iconsAnimation.icons, {
      x: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      overwrite: true,
      onComplete: () => {
        iconsAnimation.isStarted = false
        gsap.set(iconsAnimation.icons, {
          x: -50,
          overwrite: true
        })
      }
    })
  },
  show:()=>{
    if(iconsAnimation.isStarted){
      return
    }
    iconsAnimation.isStarted = true
    gsap.to(iconsAnimation.icons, {
      x: 0,
      opacity: 1,
      overwrite: true,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      onComplete: () => {
        iconsAnimation.isDisappear = false
      }
    })
  }
}
iconsAnimation.init()




// 在index-lines元素中，创建10个div，每个div的宽度为2px，高度为10px，背景色为白色，平局分布
const indexLines = document.querySelector('.index-lines');
const indexLinesWidth = indexLines.clientWidth - 2;
const baiscTranslateXs = []
const divs = [];


function calHeightAndColor(translateX){
   // 高度值要根据indexLinesWidth和translateX来计算,偏移量越大，高度越小，不需要i
   const height = 22- Math.abs(translateX - indexLinesWidth/2)/6

  // 计算颜色：中间纯白，两边逐渐变灰，颜色的亮度值的逻辑和上面这个高度值的处理逻辑是一样的
  const lightness = Math.max(5, 100 - Math.abs(translateX - indexLinesWidth/2)/8 * 5);

  const color = `hsl(0, 0%, ${lightness}%)`;
  return {
    height,
    color
  }
}

for (let i = 0; i < 13; i++) {
  

  const translateX = i * indexLinesWidth/12
  baiscTranslateXs.push(translateX)

 // 计算高度和颜色：中间最高，两边递减，中间白两边暗
  const {height, color} = calHeightAndColor(translateX)



  const div = document.createElement('div');
  div.style.width = '2px';
  div.style.height = `${height}px`;
  div.style.backgroundColor = color;
  div.style.position = 'absolute';
  div.style.transform = `translateX(${translateX}px)`;
  indexLines.appendChild(div);
  divs.push(div);
}






// 定义一个函数，用于将位置值包裹在总宽度范围内
function wrapPosition(position) {
  return ((position % indexLinesWidth) + indexLinesWidth) % indexLinesWidth;
}

// 定义动画函数，根据当前X位置更新所有div的位置、高度和颜色
function animateLines(currentX,speedX) {

// 要判断下如果是惯性运动，那么要根据速度来控制最后速度很慢的时候就不执行setMainNumThrottle了
  if(!speedX){
    setMainNumThrottle(currentX)

  }else if(Math.abs(speedX) > 6){
    setMainNumThrottle(currentX)

  }

  divs.forEach((div, index) => {
    // 计算新位置
    let translateX = wrapPosition(baiscTranslateXs[index] + currentX / 8);
    
    // 调整位置以保持在可见区域内
    if (translateX < 0) {
      translateX += indexLinesWidth; // 如果位置小于0，将其移动到右侧
    } else if (translateX > indexLinesWidth) {
      translateX -= indexLinesWidth; // 如果位置超过容器宽度，将其移动到左侧
    }

    // 根据新位置计算高度和颜色
    const {height, color} = calHeightAndColor(translateX);

    // 使用GSAP更新div的属性
    gsap.set(div, {
      x: translateX,
      height,
      backgroundColor: color
    });
  });
}




let lastX = 0, speedX = 0,  inertiaTween;


document.addEventListener('DOMContentLoaded', () => {
  const scrollElement = document.querySelector('.scroll-bar');
  const scrollContainer = document.querySelector('.scroll-container');
  
  // 如果以scrollElement为拖拽对象,scrollContainer为拖拽的左右边界，那么得出的scrollElement的拖拽范围
  const halfWidth = (scrollElement.clientWidth - scrollContainer.clientWidth - 600)/2
  
  // 这里加和减主要是为了让整体拖拽到边界的时候，红线和底部中间的白色竖线能对齐
  const minX = -halfWidth - 70;
  const maxX = halfWidth + 70;
  
  if (scrollElement) {
 
    
    Draggable.create(scrollElement, {
      type: "x",
      edgeResistance: 0.65,
      onDragStart: function () {
        iconsAnimation.show()
      },

      onDrag: function () {
        // 计算每次拖拽时的速度
        speedX = this.x - lastX;
        lastX = this.x;

      },
      onDragEnd: function () {
        // 计算惯性运动
        const duration = 1; // 惯性运动持续时间
        const friction = 0.95; // 惯性摩擦系数，值越小停止越快


         // 获取当前位置和边界
        const currentX = this.x;


        console.log(currentX, minX, maxX);
        
        if (inertiaTween) inertiaTween.kill(); // 如果有之前的惯性动画，先停止

        // 要先判断是否超出边界
        // 超出边界的话需要缓动回退到边界
        // 如果没超出边界，则继续惯性运动，但是如果惯性运行到达边界的话，需要马上停止了 

        if (currentX > maxX) {
          gsap.to(scrollElement, {
            x: maxX,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
            onUpdate: function () {
              const currentX = gsap.getProperty(this.targets()[0], "x");
              animateLines(currentX)
              console.log(currentX,'onUpdate1')
            },
            onComplete: function () {
              iconsAnimation.disappear()
              console.log('onComplete1')
            }
          });
          return;

          } else if (currentX < minX) {
            gsap.to(scrollElement, {
              x: minX,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
              onUpdate: function () {
                const currentX = gsap.getProperty(this.targets()[0], "x");
                animateLines(currentX)
                console.log(currentX,'onUpdate2')
              },
              onComplete: function () {
                iconsAnimation.disappear()
                console.log('onComplete2')
              }
            });
            return;

          }
          const segmentWidth = (indexLinesWidth / 12) * 8;
          // 惯性运动,但是也需要检查，如果惯性运动到达边界的话，需要马上停止了 
        inertiaTween = gsap.to(scrollElement, {
            x: () => {
         
   

              // 判断一个这个baiscX是有多少个segmentWidth
              // 如果少于一个，那么至少得有一个，整体最要要移动的数据是相乘的
              // 要注意，如果basicX是负数，那么需要取反
              const basicX = speedX * 10;
              const segmentCount = Math.round(basicX / segmentWidth);
              const roundedX = segmentCount * segmentWidth;
              
              // 获取当前滚动位置
              const currentX = gsap.getProperty(scrollElement, "x");
              
              // 计算最接近的对齐位置
              const nearestAlignedX = Math.round((currentX + roundedX) / segmentWidth) * segmentWidth;
              
              // 计算需要移动的距离
              const adjustedX = nearestAlignedX - currentX;
              
              return `+=${adjustedX}`;
          },
          // x: `+=${speedX * 10}`,
          duration: duration,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            iconsAnimation.disappear()
          },
          onUpdate: function () {


        
            // 每帧减小速度，模拟摩擦力
            speedX *= friction;
            
            // 检查是否到达边界
            const currentX = gsap.getProperty(scrollElement, "x");
            animateLines(currentX,speedX)
            console.log(currentX,'onUpdate3')


            if (currentX <= minX || currentX >= maxX) {
              inertiaTween.kill(); // 到达边界时停止动画
              gsap.to(scrollElement, {
                x: Math.max(minX, Math.min(maxX, currentX)),
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                  iconsAnimation.disappear()
                }
              });
             
            }
            
            if (Math.abs(speedX) < 0.1) {
              inertiaTween.kill(); // 速度非常小后停止动画
          
            }
       
          }
        });

      },
  
      onMove: function () {
        

        animateLines(this.x)
      }
    });

  }
});
