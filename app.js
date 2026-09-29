(() => {
  'use strict';
  const frame = document.querySelector('#frame');
  const visual = document.querySelector('#visual');
  const ambient = document.querySelector('#ambient');
  const impacts = document.querySelector('#impacts');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let paused = reduce, live = 0, lastTime = 0, lastX = -100, lastY = -100;
  let seed = 260928;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
  const colors = ['#48bdff', '#417aff', '#7892ff', '#df9b83', '#b2d9ed'];
  const burstColors = ['#f1f8f5', '#dcf5ff', '#8de0ff', '#ffcfaa'];

  const count = innerWidth < 700 ? 125 : 270;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const pixel = document.createElement('i');
    const x = random(), band = i % 3;
    const center = [.19, .46, .73][band] + Math.sin(x * Math.PI * 2 + band * 1.7) * [.047, .082, .045][band];
    const y = Math.max(.05, Math.min(.93, center + (random() - .5) * [.11, .18, .09][band]));
    pixel.style.setProperty('--x', `${x * 100}%`); pixel.style.setProperty('--y', `${y * 100}%`);
    pixel.style.setProperty('--size', `${2 + Math.floor(random() * 4)}px`);
    pixel.style.setProperty('--color', colors[Math.floor(random() * colors.length)]);
    pixel.style.setProperty('--alpha', `${.42 + random() * .43}`);
    pixel.style.setProperty('--duration', `${7 + random() * 11}s`);
    pixel.style.setProperty('--delay', `${-random() * 14}s`);
    fragment.appendChild(pixel);
  }
  ambient.appendChild(fragment);

  function burst(x, y, amount = 22, radius = 64) {
    if (paused || live > 72) return;
    const core = document.createElement('i');
    core.className = 'core'; impacts.appendChild(core);
    gsap.fromTo(core, { x: x - 8, y: y - 8, scale: .45, opacity: .98 }, {
      scale: 1.7, opacity: 0, duration: .52, ease: 'power1.out', onComplete: () => core.remove()
    });
    for (let i = 0; i < amount; i++) {
      const p = document.createElement('i');
      p.style.setProperty('--size', `${4 + Math.floor(random() * 5)}px`);
      p.style.setProperty('--color', burstColors[Math.floor(random() * burstColors.length)]);
      p.style.setProperty('--alpha', '1');
      impacts.appendChild(p); live++;
      const angle = Math.PI * 2 * i / amount + (random() - .5) * .5;
      const travel = 18 + random() * radius;
      gsap.fromTo(p, { x, y, scale: 1.2, opacity: 1 }, {
        x: x + Math.cos(angle) * travel,
        y: y + Math.sin(angle) * travel,
        scale: .15, opacity: 0, duration: .7 + random() * .22, ease: 'power1.out',
        onComplete: () => { p.remove(); live--; }
      });
    }
  }

  frame.addEventListener('pointermove', event => {
    if (paused || event.pointerType === 'touch' || event.target.closest('.topbar,.bottom')) return;
    const now = performance.now();
    if (now - lastTime < 95 || Math.hypot(event.clientX - lastX, event.clientY - lastY) < 15) return;
    lastTime = now; lastX = event.clientX; lastY = event.clientY;
    const box = frame.getBoundingClientRect();
    burst(lastX - box.left, lastY - box.top);
  }, { passive: true });
  frame.addEventListener('pointerdown', event => {
    if (paused || event.target.closest('a,button')) return;
    const box = frame.getBoundingClientRect();
    burst(event.clientX - box.left, event.clientY - box.top, 26, 70);
  });

  if (!reduce && window.gsap) {
    gsap.set(visual, { scale: 1.065 });
    gsap.set('.copy,.topbar,.bottom', { y: 24, autoAlpha: 0 });
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(visual, { scale: 1, duration: 2.2 }, 0)
      .to('.copy', { y: 0, autoAlpha: 1, duration: 1.1 }, .28)
      .to('.topbar,.bottom', { y: 0, autoAlpha: 1, duration: .75, stagger: .12 }, .63);
    const breathe = gsap.to(visual, { scale: 1.018, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.2 });
    document.querySelector('#pause').addEventListener('click', event => {
      paused = !paused; breathe.paused(paused);
      document.body.classList.toggle('paused', paused);
      event.currentTarget.textContent = paused ? 'Resume motion' : 'Pause motion';
      event.currentTarget.setAttribute('aria-pressed', String(paused));
      if (paused) { gsap.killTweensOf(impacts.children); impacts.replaceChildren(); live = 0; }
    });
  } else {
    const button = document.querySelector('#pause'); button.textContent = 'Reduced motion'; button.disabled = true;
  }
})();
