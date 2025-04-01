const fill = document.querySelector(".progress-fill");
const duration = 10000; // 10 seconds

let startTime = null;
let pausedAt = 0;
let animationFrameId = null;
let isPaused = false;

function animate(currentTime) {
  if (!startTime) startTime = currentTime;

  const elapsed = isPaused
    ? pausedAt - startTime
    : currentTime - startTime;

  const progress = Math.min(elapsed / duration, 1);
  fill.style.width = `${progress * 100}%`;

  console.log('animationFrameId on animate',animationFrameId)
  
  if (progress < 1) {
    animationFrameId = requestAnimationFrame(animate);
  }
}

function startProgress() {
  cancelAnimationFrame(animationFrameId);
  fill.style.width = '0%';
  startTime = null;
  pausedAt = 0;
  isPaused = false;
  animationFrameId = requestAnimationFrame(animate);
}

function pauseProgress() {
  if (!isPaused) {
    isPaused = true;
    cancelAnimationFrame(animationFrameId);
    pausedAt = performance.now();
    console.log(pausedAt);
    console.log(startTime);
  }
}

function resumeProgress() {
  if (isPaused) {
    isPaused = false;
    const offset = pausedAt - startTime;
    startTime = performance.now() - offset;
    animationFrameId = requestAnimationFrame(animate);
    console.log(startTime);
  }
}