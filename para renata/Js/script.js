function checkDate() {
  const input = document.getElementById("date-input").value;
  const correctDate = "2022-12-08";

  if (input === correctDate) {
    document.getElementById("access-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    startSequence();
  } else {
    document.getElementById("error-msg").style.display = "block";
  }
}

function startSequence() {
  fetch('Img/treelove.svg')
    .then(res => res.text())
    .then(data => {
      const treeContainer = document.getElementById('tree-container');
      treeContainer.innerHTML = data;
      const svg = treeContainer.querySelector('svg');
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");

      const allPaths = svg.querySelectorAll("path, circle, rect, ellipse, line, polyline, polygon");
      allPaths.forEach(path => {
        const length = path.getTotalLength ? path.getTotalLength() : 1000;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      });

      allPaths.forEach((path,i) => {
        path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i*0.08}s, fill-opacity 0.5s ${0.9 + i*0.08}s`;
        setTimeout(()=>{path.style.strokeDashoffset=0},50);
        setTimeout(()=>{path.style.fillOpacity='1'; path.style.stroke=''; path.style.strokeWidth='';},1200+i*80);
      });

      // Corazones
      Array.from(allPaths)
        .filter(el => (el.getAttribute('style')||'').includes('#FC6F58') || (el.getAttribute('style')||'').includes('#C1321F'))
        .forEach(path => path.classList.add('animated-heart'));

      const totalDuration = 1200 + (allPaths.length-1)*80 + 500;
      setTimeout(() => {
        treeContainer.classList.add('move-and-scale'); // mueve correctamente el contenedor
        setTimeout(() => {
          showDedicationText();
          startFloatingObjects();
          showCountdown();
          playBackgroundMusic();
        }, 1200);
      }, totalDuration);
    });
}

// Dedicatoria
function showDedicationText() {
  const container = document.getElementById('dedication-text');
  container.textContent = "";
  container.classList.add('typing');
  const message = "Para Renata:\n\nDesde el primer momento supe que eras tú. Tus ojos, tu sonrisa y tu esencia… todo en ti me encanta.\n\nGracias por ser mi calma, mi risa y mi inspiracion, por quererme aún cuando no tengo palabras y por motivarme a ser mejor cada día.\n\nPerdóname si no he estado como mereces, aun así, no hay un solo día en el que no pienses en ti. Todo lo que alguna vez te prometí, lo cumpliré.\n\nEres mi presente y futuro. Te amo más de lo que alguna vez imaginé, más de lo que jamás pensé merecer.\n\nCon amor, Joaquin.";
  let i=0;
  function type(){ if(i<message.length){ container.textContent += message.charAt(i); i++; setTimeout(type,80); } }
  type();
}

// Objetos flotantes
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count=0;
  function spawn(){
    let el = document.createElement('div');
    el.className='floating-petal';
    el.style.left=`${Math.random()*90+2}%`;
    el.style.top=`${100+Math.random()*10}%`;
    el.style.opacity=0.7+Math.random()*0.3;
    container.appendChild(el);

    const duration=6000+Math.random()*4000;
    const drift=(Math.random()-0.5)*60;
    setTimeout(()=>{ el.style.transition=`transform ${duration}ms linear, opacity 1.2s`; el.style.transform=`translate(${drift}px, -110vh) scale(${0.8+Math.random()*0.6}) rotate(${Math.random()*360}deg)`; el.style.opacity=0.2; },30);
    setTimeout(()=>{ if(el.parentNode) el.parentNode.removeChild(el); }, duration+2000);

    if(count++<32) setTimeout(spawn,350+Math.random()*500); else setTimeout(spawn,1200+Math.random()*1200);
  }
  spawn();
}

// Countdown
function showCountdown() {
  const container = document.getElementById('countdown');
  let startDate = new Date('2023-11-08T00:00:00');
  function update() {
    const now=new Date();
    let diff=now-startDate;
    let days=Math.floor(diff/(1000*60*60*24));
    container.innerHTML=`Nos conocimos hace: <b>${days}</b> días`;
    container.classList.add('visible');
  }
  update();
  setInterval(update,1000);
}

// Música
function playBackgroundMusic() {
  const audio=document.getElementById('bg-music');
  if(!audio) return;
  audio.volume=0.7; audio.loop=true;
  audio.play().catch(()=>{});
}

// Utils
function getURLParam(name){ const url=new URL(window.location.href); return url.searchParams.get(name); }

window.addEventListener('DOMContentLoaded',()=>{ playBackgroundMusic(); });
