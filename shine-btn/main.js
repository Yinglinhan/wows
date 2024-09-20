import './style.css'
import {gsap} from 'gsap'

// 获取 DOM 元素
const overlay = document.querySelector('.overlay');
const btnArea = document.querySelector('.btn-area');
const btnContainer = document.querySelector('.btn-container');

// 鼠标进入状态标志
let isMouseEnter = false;

// 监听鼠标进入按钮区域事件
btnArea.addEventListener('mouseenter', () => {
    isMouseEnter = true;
});

// 监听鼠标在按钮区域移动事件
btnArea.addEventListener('mousemove', (e) => {
    if(isMouseEnter){
        // 计算鼠标相对于按钮区域的位置
        const rect = btnArea.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // 移动 overlay 元素到鼠标位置
        overlay.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// 监听鼠标离开按钮区域事件
btnArea.addEventListener('mouseleave', () => {
    // 设置鼠标离开标志 这样在mousemove事件中，就不会执行移动overlay元素的逻辑
    isMouseEnter = false;
});

// 监听鼠标进入按钮容器事件
btnContainer.addEventListener('mouseenter', () => {
    // 修改紫色内阴影
    // 这里修改的是CSS变量，CSS变量是全局的，所以这里修改的阴影效果会应用到所有使用这些CSS变量的元素
    // 主要就是让内阴影变大，让混合模式的效果更明显
    const newShadow = '0px -40px 52.4px -40px rgba(139, 98, 255, 0.5)';
    const newShadowTop = '0px 30px 52.4px -40px rgba(139, 98, 255, 0.2)';
    // 设置CSS变量
    document.documentElement.style.setProperty('--purple-shadow', newShadow);
    document.documentElement.style.setProperty('--purple-shadow-top', newShadowTop);
    // 显示飞行的小白点  这里是对小白点的容器设置不透明度变化
    gsap.to(dotsContainer, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
    });
});

// 监听鼠标离开按钮容器事件
btnContainer.addEventListener('mouseleave', () => {
    // 恢复原始阴影
    const originalShadow = '0px -20px 52.4px -40px rgba(139, 98, 255, 0.3)';
    const originalShadowTop = '0px 20px 52.4px -40px rgba(139, 98, 255, 0.1)';
    document.documentElement.style.setProperty('--purple-shadow', originalShadow);
    document.documentElement.style.setProperty('--purple-shadow-top', originalShadowTop);
    // 隐藏飞行的小白点，这里是对小白点的容器设置不透明度变化
    // 这样所有小白点就能一起消失了
    gsap.to(dotsContainer, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
    });
});

// 创建飞行小白点的效果
const dots = [];
const dotsContainer = document.createElement('div');
// 设置飞行小白点容器样式
// 这个容器是用来装小白点的
// 方便利用这个容器控制所有小白点的可见性
dotsContainer.style.position = 'absolute';
dotsContainer.style.top = '0';
dotsContainer.style.left = '0';
dotsContainer.style.width = '100%';
dotsContainer.style.height = '100%';
dotsContainer.style.zIndex = '1000';
dotsContainer.style.display = 'flex';
dotsContainer.style.justifyContent = 'center';
dotsContainer.style.alignItems = 'center';
dotsContainer.style.opacity = '0';

btnContainer.appendChild(dotsContainer);

// 创建100个点
for(let i = 0; i < 100; i++){
    const div = document.createElement('div');
    // 设置每个点的样式
    div.style.width = '3px';
    div.style.height = '3px';
    div.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    div.style.opacity = 0;
    div.style.borderRadius = '100px';
    div.style.position = 'absolute';
    // 随机分布点的位置
    div.style.transform = `translate(${(Math.random() - 0.5) * 600}px, ${(Math.random() - 0.5) * 600}px)`;
    dotsContainer.appendChild(div);
    dots.push(div);
}

// 为每个点设置动画
// 小白点本身的变化主要就是位移和透明度的变化
// 每个小白点的动画是独立的 通过delay来控制每个小白点的动画错开

dots.forEach((dot, index) => {
    gsap.timeline({ repeat: -1, delay: index * 0.08 })
        .to(dot, {
            x: () => (Math.random() - 0.5) * 30,
            y: () => (Math.random() - 0.5) * 10,
            opacity: 0.2,
            duration: 2,
            ease: 'power2.inOut'
        })
        .to(dot, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                // 重置点的位置
                gsap.set(dot, { x: (Math.random() - 0.5) * 600, y: (Math.random() - 0.5) * 600 });
            }
        });
});
