let candleBlown = false;
let fireworksRunning = false;

// Start
function startApp() {
  const name = document.getElementById("nameInput").value;
  if (!name) return alert("Enter name!");

  document.getElementById("title").innerText =
    "🎂 Happy Birthday " + name + " ❤️";

  document.querySelector(".start-screen").style.display = "none";
  document.querySelector(".main").classList.remove("hidden");

  document.getElementById("candle").addEventListener("click", handleCandle);
}

// Candle
function handleCandle() {
  if (candleBlown) return;

  candleBlown = true;

  document.getElementById("flame").style.display = "none";
  document.body.classList.add("night");

  playMusic();
  startFireworks();

  document.getElementById("cutBtn").disabled = false;
  document.getElementById("instruction").innerText =
    "👉 Now cut the cake 🎂";
}

// Cut cake
function cutCake() {
  if (!candleBlown) return;

  document.getElementById("cake").classList.add("cut");

  setTimeout(() => {
    document.getElementById("wish").classList.remove("hidden");
    startConfetti();
  }, 800);
}

// Music
function playMusic() {
  const music = document.getElementById("music");
  music.volume = 0;
  music.play();

  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 1) {
      vol += 0.05;
      music.volume = vol;
    } else clearInterval(fade);
  }, 100);
}

// Confetti
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 6,
    speed: Math.random() * 3,
    color: `hsl(${Math.random()*360},100%,50%)`
  }));

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    pieces.forEach(p => {
      p.y += p.speed;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x,p.y,p.size,p.size);
      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// Fireworks
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  fireworksRunning = true;

  function createFirework() {
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height/2;

    for(let i=0;i<60;i++){
      particles.push({
        x,y,
        angle: Math.random()*Math.PI*2,
        speed: Math.random()*4+2,
        life:80,
        color:`hsl(${Math.random()*360},100%,50%)`
      });
    }
  }

  function animate() {
    if (!fireworksRunning) return;

    ctx.fillStyle="rgba(0,0,0,0.25)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,i)=>{
      p.x+=Math.cos(p.angle)*p.speed;
      p.y+=Math.sin(p.angle)*p.speed;
      p.life--;

      ctx.fillStyle=p.color;
      ctx.fillRect(p.x,p.y,2,2);

      if(p.life<=0) particles.splice(i,1);
    });

    if(Math.random()<0.06) createFirework();

    requestAnimationFrame(animate);
  }

  animate();

  setTimeout(()=>{
    fireworksRunning=false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
  },5000);
}
