// Interactive behaviors: year, cube auto-rotate, mouse parallax for cube, tiny SVG motion
document.getElementById('year').textContent = new Date().getFullYear();

// cube auto-rotation
const cube = document.getElementById('cube');
let rx = -20, ry = 30;
let auto = true;
function animate(){
  if(auto) {
    ry += 0.2;
    rx = -20 + Math.sin(Date.now()/2000)*8;
    cube.style.transform = `translateZ(0) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// pause rotation when user moves mouse over stage and add parallax
const stage = document.querySelector('.stage');
stage.addEventListener('mouseenter', ()=> auto = false);
stage.addEventListener('mouseleave', ()=> auto = true);
stage.addEventListener('mousemove', (e)=>{
  const rect = stage.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  const tiltX = -20 + y*30;
  const tiltY = 30 + x*60;
  cube.style.transform = `translateZ(0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
});

// Tiny SVG logo animation: pulse gradient stops
const stops = document.querySelectorAll('#logo stop');
let t = 0;
function logoAnim(){
  t += 0.01;
  const a = (Math.sin(t)+1)/2*0.3 + 0.7;
  stops.forEach((s,i)=> s.setAttribute('stop-opacity', String(0.6 + i*0.2*a)));
  requestAnimationFrame(logoAnim);
}
logoAnim();
