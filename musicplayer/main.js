import './style.css'

// 我要给svg中动态添加10个line
// 每条线都是垂直的 水平居中 
// 每条线都是白色的 粗细为1 两头是round

const progressLineContainer = document.getElementById('progress-lines')

// 预定义的长度数组，每个数字代表一条线的长度百分比
const lengths = [20, 15, 8, 30, 40, 35, 25, 20, 10, 25, 30, 50, 42, 30, 20, 35, 15, 5, 15, 20,30,40,32,20,30].map(length => Math.floor(length * 0.8))
const totalLines = lengths.length
const spacing = 4

// 创建defs元素
const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
progressLineContainer.appendChild(defs);

// 创建一组线条作为模板
const groupTemplate = document.createElementNS('http://www.w3.org/2000/svg', 'g');
groupTemplate.id = 'lineGroup';
// groupTemplate再添加一个100%宽100%高的rect
const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rect.setAttribute('x', '0');
rect.setAttribute('y', '0');
rect.setAttribute('width', '100%');
rect.setAttribute('height', '100%');
rect.setAttribute('stroke', 'none');
rect.setAttribute('fill', '#121212');
groupTemplate.appendChild(rect);

for (let i = 0; i < totalLines; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const xPosition = 50 + (i - (totalLines - 1) / 2) * spacing;
    const length = lengths[i];
    const yStart = (100 - length) / 2;

    line.setAttribute('x1', `${xPosition}%`);
    line.setAttribute('y1', `${yStart}%`);
    line.setAttribute('x2', `${xPosition}%`);
    line.setAttribute('y2', `${yStart + length}%`);
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-linecap', 'round');
    
    groupTemplate.appendChild(line);
}

defs.appendChild(groupTemplate);

// 使用use元素创建白色线条组
const whiteLines = document.createElementNS('http://www.w3.org/2000/svg', 'use');
whiteLines.setAttribute('href', '#lineGroup');
whiteLines.setAttribute('stroke', '#BCBCBC');
progressLineContainer.appendChild(whiteLines);

// 使用use元素创建灰色线条组
const grayLines = document.createElementNS('http://www.w3.org/2000/svg', 'use');
grayLines.setAttribute('href', '#lineGroup');
grayLines.setAttribute('stroke', '#242424');
// 设置clip-path属性，只显示右边一半
grayLines.setAttribute('clip-path', 'inset(0 0 0 10%)');
progressLineContainer.appendChild(grayLines);

// 创建发光滤镜
const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
filter.setAttribute('id', 'myFilter');
filter.setAttribute('x', '-300%');
filter.setAttribute('y', '-50%');
filter.setAttribute('width', '800%');
filter.setAttribute('height', '200%');
filter.innerHTML = `
    <feGaussianBlur  stdDeviation="8"/>
`;
defs.appendChild(filter);

// 创建一个组元素来包含白色矩形和红色矩形
const rectGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

// 创建一个白色的矩形
const lineBgBlur = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
lineBgBlur.setAttribute('x', '16.5');
lineBgBlur.setAttribute('y', '0');
lineBgBlur.setAttribute('width', '8');
lineBgBlur.setAttribute('height', '100%');
lineBgBlur.setAttribute('fill', '#FF0000');
lineBgBlur.setAttribute('fill-opacity', '0.3');
lineBgBlur.setAttribute('filter', 'url(#myFilter)');

// 添加一个垂直的看着有点微微发光的红色矩形
const redRectasLine = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
redRectasLine.setAttribute('x', '18.5px');
redRectasLine.setAttribute('y', '0');
redRectasLine.setAttribute('width', '3');
redRectasLine.setAttribute('height', '100%');
redRectasLine.setAttribute('fill', '#FF0000');

// 创建一个横向更宽的红色椭圆
const redEllipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
redEllipse.setAttribute('cx', '20');
redEllipse.setAttribute('cy', '-3');
redEllipse.setAttribute('rx', '16');
redEllipse.setAttribute('ry', '5');
redEllipse.setAttribute('fill', '#FF0000');


// 创建一个投影滤镜
const shadowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
shadowFilter.setAttribute('id', 'shadowFilter');
shadowFilter.innerHTML = `
    <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000000" flood-opacity="1"/>
`;
defs.appendChild(shadowFilter);


// 创建一个圆角小矩形，然后旋转45度
const redRectasLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
redRectasLine2.setAttribute('x', '-4');
redRectasLine2.setAttribute('y', '-4');
redRectasLine2.setAttribute('width', '20');
redRectasLine2.setAttribute('height', '20');
redRectasLine2.setAttribute('fill', '#FF0000');
redRectasLine2.setAttribute('fill-opacity', '0.7');
// 圆角
redRectasLine2.setAttribute('rx', '1');
redRectasLine2.setAttribute('transform', 'translate(20, 81) rotate(45, 0, 0) ');
// 应用投影滤镜
redRectasLine2.setAttribute('filter', 'url(#shadowFilter)');



// 将两个矩形添加到组元素中
rectGroup.appendChild(lineBgBlur);
rectGroup.appendChild(redRectasLine);
rectGroup.appendChild(redEllipse);
rectGroup.appendChild(redRectasLine2);
rectGroup.setAttribute('x', 'translate(100, 0)');



// 将组元素添加到 SVG 容器中
progressLineContainer.appendChild(rectGroup);


// 获取 SVG 元素的宽度
const svgWidth = progressLineContainer.clientWidth;
const initialTranslateX = -20;

// 创建更新函数
function updateProgress(percentage) {
    // 确保百分比在 0-100 之间
    percentage = Math.max(0, Math.min(100, percentage));
    
    // 更新 grayLines 的 clip-path
    grayLines.setAttribute('clip-path', `inset(0  0 0 ${percentage}%)`);
    
    // 更新 rectGroup 的位置
    const translateX = (percentage / 100) * svgWidth;
    // 这里要减去20，因为rectGroup的里面元素的初始位置已经靠右20左右了，不这样做不太好调整这几个元素的位置
    rectGroup.setAttribute('transform', `translate(${translateX + initialTranslateX}, 0)`);
}

// 示例：设置进度为 0%
updateProgress(0);




// 你可以在需要的时候调用 updateProgress 函数来更新进度
let progress = 0;
let lastTime = 0;
let duration = 4000; // 动画持续时间，单位毫秒
let animationId = null; // 用于存储 requestAnimationFrame 的 ID
let isAnimating = false; // 用于跟踪动画状态

function animate(currentTime) {
    // console.log(currentTime)
    if (!lastTime) lastTime = currentTime;
    const deltaTime = currentTime - lastTime;
    
    progress += (deltaTime / duration) * 100;
    console.log(progress)
    if (progress <= 100) {
        updateProgress(progress);
        animationId = requestAnimationFrame(animate);
    } else {
        updateProgress(100); // 确保最后更新到100%

        // 播放结束了 还原动画状态元素
        setTimeout(() => {
            rectGroup.setAttribute('transform', `translate(${initialTranslateX}, 0)`);
            grayLines.setAttribute('clip-path', 'inset(0 0 0 0)');
            isAnimating = false; // 动画结束，重置状态
            progress = 0; // 重置进度
            lastTime = 0; // 重置时间

            // 把play-btn显示 和 pause-btn 隐藏
            const playBtn = document.querySelector('#play-btn');
            const pauseBtn = document.querySelector('#pause-btn');
            playBtn.style.display = 'block';
            pauseBtn.style.display = 'none';


        }, 500);
    }
    
    lastTime = currentTime;
}





// 获取audio元素
const audio = document.querySelector('audio');


// 添加点击事件监听器
const playerBtn = document.querySelector('.player-btn');
playerBtn.addEventListener('click', startAnimation);

function startAnimation() {
    // 获取两个元素 play-btn 和 pause-btn
    const playBtn = document.querySelector('#play-btn');
    const pauseBtn = document.querySelector('#pause-btn');
    if (isAnimating) {
        // 如果动画正在进行，暂停动画
        cancelAnimationFrame(animationId);
        isAnimating = false;
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        audio.pause();
    } else {
        // 如果动画没有进行，继续动画
        lastTime = 0; // 重置 lastTime 以便继续动画
        animationId = requestAnimationFrame(animate);
        isAnimating = true;
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';

        audio.play();
    }
}





audio.addEventListener('loadedmetadata', () => {
    setDuration() // 将 duration 设置为 audio 的总时长（单位毫秒）
});
if (audio.readyState >= 1) {
    setDuration();
}
function setDuration() {
    duration = audio.duration * 1000; // 将 duration 设置为 audio 的总时长（单位毫秒）

}






// 获取 .progress 元素
const progressElement = document.querySelector('.progress-container');

// 添加点击事件监听器
progressElement.addEventListener('click', (event) => {
   if(isAnimating){
     // 获取 .progress 元素的宽度和左边距
     const rect = progressElement.getBoundingClientRect();
     const offsetX = event.clientX - rect.left;
     const percentage = (offsetX / rect.width) * 100;
 
     console.log(`Clicked at ${percentage.toFixed(2)}% of the progress bar`);
     
     // 更新进度
     updateProgress(percentage);

     // 更新动画进度
     progress = percentage;
     lastTime = performance.now();

     // 更新音频播放时间
     audio.currentTime = (percentage / 100) * audio.duration;
   }
   
});





// 创建音频上下文
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);


// 获取所有的 line 元素
const lines = document.querySelectorAll('#progress-lines line');

// 定义缩放因子
const scaleFactor = 0.5; // 可以根据需要调整这个值

// 标志位，判断是否是第一次渲染
let isFirstRender = true;

// 记录每条线的初始长度
const initialLengths = [];

function renderFrame() {
    requestAnimationFrame(renderFrame);
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const baseLength = lengths[i % lengths.length]; // 获取原始长度

        if (isFirstRender) {
            // 第一次渲染时保持原有长度并记录初始长度
            const yStart = (100 - baseLength) / 2;
            line.setAttribute('y1', `${yStart}%`);
            line.setAttribute('y2', `${yStart + baseLength}%`);
            initialLengths[i] = baseLength; // 记录初始长度
        } else {
            // 后续帧根据律动变化，只增加长度
            let normalizedValue = dataArray[i % bufferLength] / 255; // 归一化到 0-1 之间
            const offset = normalizedValue * scaleFactor * initialLengths[i]; // 计算偏移量
            const length = initialLengths[i] + offset; // 计算新的长度
            const yStart = (100 - length) / 2;

            line.setAttribute('y1', `${yStart}%`);
            line.setAttribute('y2', `${yStart + length}%`);
        }
    }

    // 第一次渲染后将标志位设为 false
    isFirstRender = false;
}

audio.addEventListener('play', () => {
    audioContext.resume().then(() => {
        renderFrame();
    });
});

