// Birthday Countdown
const countdownSection = document.getElementById('countdownSection');
const countDays = document.getElementById('countDays');
const countHours = document.getElementById('countHours');
const countMinutes = document.getElementById('countMinutes');
const countSeconds = document.getElementById('countSeconds');

// Birthday target in IST (Indian Standard Time, UTC+5:30)
// Format: YYYY-MM-DDTHH:mm:ss+05:30
const BIRTHDAY_TARGET = new Date(new Date().getFullYear() + '-03-13T00:00:00+05:30');

function updateCountdown() {
  const now = new Date();
  const diff = BIRTHDAY_TARGET - now;

  if (diff <= 0) {
    if (countdownSection) countdownSection.classList.add('zero');
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (countDays) countDays.textContent = String(days).padStart(2, '0');
  if (countHours) countHours.textContent = String(hours).padStart(2, '0');
  if (countMinutes) countMinutes.textContent = String(minutes).padStart(2, '0');
  if (countSeconds) countSeconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Night sky - Twinkling stars
const starsContainer = document.getElementById('starsContainer');
if (starsContainer) {
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 2) + 's';
    starsContainer.appendChild(star);
  }
}

// Runway lights at bottom
const runwayLightsEl = document.getElementById('runwayLights');
if (runwayLightsEl) {
  for (let i = 0; i < 25; i++) {
    const light = document.createElement('div');
    light.className = 'runway-light';
    light.style.animationDelay = (Math.random() * 2) + 's';
    runwayLightsEl.appendChild(light);
  }
}

// Confetti rain - 6 seconds only
const colors = ['#ffd89b', '#e94560', '#19547b', '#a8e6cf'];
const rainDuration = 6000;
const count = 180;

for (let i = 0; i < count; i++) {
  const confetti = document.createElement('div');
  confetti.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    left: ${Math.random() * 100}vw;
    top: -40px;
    opacity: ${0.6 + Math.random() * 0.4};
    animation: fall ${2.5 + Math.random() * 1.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    pointer-events: none;
    z-index: 1000;
    border-radius: 2px;
    will-change: transform;
  `;
  confetti.style.animationDelay = Math.random() * 0.8 + 's';
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), rainDuration);
}

// Emoji rain on wish-card hover
const emojiRain = document.getElementById('emoji-rain');
const wishCards = document.querySelectorAll('.wish-card');
let spawnInterval = null;

function createEmojiBubble(emoji) {
  const bubble = document.createElement('span');
  bubble.className = 'emoji-bubble';
  bubble.textContent = emoji;
  bubble.style.left = Math.random() * 100 + 'vw';
  bubble.style.animationDuration = (3 + Math.random() * 3) + 's';
  bubble.style.animationDelay = Math.random() * 0.5 + 's';
  bubble.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
  emojiRain.appendChild(bubble);
  setTimeout(() => bubble.remove(), 6000);
}

wishCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const emoji = card.dataset.emoji;
    createEmojiBubble(emoji);
    spawnInterval = setInterval(() => {
      createEmojiBubble(emoji);
      createEmojiBubble(emoji);
    }, 150);
  });

  card.addEventListener('mouseleave', () => {
    clearInterval(spawnInterval);
  });
});

// Gift box open animation + burst celebration
const giftBox = document.getElementById('giftBox');
const giftInside = document.getElementById('giftInside');

function launchGiftBurst() {
  const rect = giftBox.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const burstContainer = document.createElement('div');
  burstContainer.className = 'gift-burst-container';
  document.body.appendChild(burstContainer);

  const burstColors = ['#ffd89b', '#e94560', '#19547b', '#a8e6cf'];
  const burstEmojis = ['✈️', '🛩️', '🌟', '⭐'];
  const particleCount = 40;
  const emojiCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + Math.random();
    const distance = 150 + Math.random() * 150;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    const particle = document.createElement('div');
    particle.className = 'gift-burst-particle';
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.width = 8 + Math.random() * 6 + 'px';
    particle.style.height = 8 + Math.random() * 6 + 'px';
    particle.style.background = burstColors[Math.floor(Math.random() * burstColors.length)];
    particle.style.borderRadius = Math.random() > 0.5 ? '2px' : '50%';
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    particle.style.animationDelay = Math.random() * 0.15 + 's';
    burstContainer.appendChild(particle);
  }

  for (let i = 0; i < emojiCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 180;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    const emoji = document.createElement('span');
    emoji.className = 'gift-burst-emoji';
    emoji.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
    emoji.style.left = centerX + 'px';
    emoji.style.top = centerY + 'px';
    emoji.style.setProperty('--tx', tx + 'px');
    emoji.style.setProperty('--ty', ty + 'px');
    emoji.style.animationDelay = Math.random() * 0.2 + 's';
    emoji.style.fontSize = (1.2 + Math.random() * 1) + 'rem';
    burstContainer.appendChild(emoji);
  }

  setTimeout(() => burstContainer.remove(), 3000);
}

giftBox.addEventListener('click', (e) => {
  if (!giftBox.classList.contains('opened')) {
    giftBox.classList.add('opened');
    document.querySelector('.gift-instruction').textContent = '🎉 Enjoy your gift!';
    launchGiftBurst();
  }
});
giftInside.addEventListener('click', (e) => e.stopPropagation());

// Runway takeoff animation on Xbox button click
const takeoffZone = document.getElementById('takeoff-zone');
const takeoffBtn = document.querySelector('.takeoff-btn');

const XBOX_URL = 'https://www.xbox.com/en-US/games/store/microsoft-flight-simulator-2024/9P38D19T7LRV/0010';

takeoffBtn.addEventListener('click', (e) => {
  e.preventDefault();
  takeoffZone.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => {
    takeoffZone.classList.add('active');
    setTimeout(() => {
      takeoffZone.classList.remove('active');
      window.location.href = XBOX_URL;
    }, 1500);
  }, 400);
});

// Birthday cake - blow out candles on individual click
const aviationCake = document.getElementById('aviationCake');
const birthdayCakeSection = document.getElementById('birthdayCakeSection');
const smokeContainer = document.getElementById('smokeContainer');
const positions = [25, 50, 75];

function blowCandle(candle, i) {
  if (candle.classList.contains('blown-out')) return;

  candle.classList.add('blowing');
  for (let j = 0; j < 5; j++) {
    setTimeout(() => {
      const smoke = document.createElement('div');
      smoke.className = 'smoke-puff';
      smoke.style.left = (positions[i] + (Math.random() * 8 - 4)) + '%';
      smoke.style.top = '30%';
      smokeContainer.appendChild(smoke);
      setTimeout(() => smoke.remove(), 2000);
    }, j * 80);
  }

  setTimeout(() => {
    candle.classList.remove('blowing');
    candle.classList.add('blown-out');
    const allCandles = aviationCake.querySelectorAll('.candle');
    const blownCount = aviationCake.querySelectorAll('.candle.blown-out').length;
    if (blownCount === allCandles.length) {
      aviationCake.classList.add('blown-out');
      birthdayCakeSection.classList.add('all-blown');
      setTimeout(() => {
        birthdayCakeSection.classList.add('show-message');
      }, 600);
    }
  }, 800);
}

aviationCake.querySelectorAll('.candle').forEach((candle, i) => {
  candle.addEventListener('click', (e) => {
    e.stopPropagation();
    blowCandle(candle, i);
  });
});

// Heart trail plane - flies left to right every 10-15 seconds
const heartPlaneContainer = document.getElementById('heart-plane-flight');
const FLIGHT_DURATION = 9000;
const HEART_INTERVAL = 180;

function spawnHeartTrailPlane() {
  const container = document.createElement('div');
  container.className = 'heart-plane-container';
  container.style.top = (5 + Math.random() * 15) + '%';
  container.innerHTML = '✈️';
  heartPlaneContainer.appendChild(container);

  const startTime = Date.now();

  const heartInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    if (elapsed >= FLIGHT_DURATION) {
      clearInterval(heartInterval);
      return;
    }
    const rect = container.getBoundingClientRect();
    const heart = document.createElement('span');
    heart.className = 'heart-smoke';
    heart.textContent = ['♥', '❤️', '💕'][Math.floor(Math.random() * 3)];
    heart.style.left = rect.left + 'px';
    heart.style.top = rect.top + rect.height / 2 + (Math.random() * 20 - 10) + 'px';
    heart.style.fontSize = (0.7 + Math.random() * 0.6) + 'rem';
    heartPlaneContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, HEART_INTERVAL);

  setTimeout(() => {
    container.remove();
  }, FLIGHT_DURATION + 500);
}

function scheduleNextHeartPlane() {
  const delay = 10000 + Math.random() * 5000;
  setTimeout(() => {
    spawnHeartTrailPlane();
    scheduleNextHeartPlane();
  }, delay);
}

setTimeout(() => {
  spawnHeartTrailPlane();
  scheduleNextHeartPlane();
}, 2000);

// Scroll reveal animation
const scrollReveals = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

scrollReveals.forEach(el => revealObserver.observe(el));
