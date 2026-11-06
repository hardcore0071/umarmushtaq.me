const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const progress = document.querySelector('.progress span');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.classList.toggle('is-open', open);
  nav.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.classList.remove('is-open');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  });
});

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.width = `${Math.min(100, ratio * 100)}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const focusAreas = {
  web: ['01', 'Behind the interface.', 'Trace how identity, input, and business logic interact across the application and its APIs.', 'Authentication, authorisation, session management, and API behaviour.', 'Reproducible evidence, clear business impact, and prioritised remediation.'],
  network: ['02', 'Follow the trust.', 'Examine how an initial foothold can connect to sensitive systems across enterprise infrastructure.', 'Internal and external exposure, Active Directory relationships, and privilege escalation paths.', 'Validated attack paths and recommendations to strengthen controls, detection, and response.'],
  mobile: ['03', 'Beyond the screen.', 'Examine mobile applications and the services they depend on, from local behaviour to backend interactions.', 'Android and iOS applications, reverse engineering, and runtime analysis.', 'Manual validation of findings and practical guidance for application teams.'],
  human: ['04', 'The human boundary.', 'Explore how people, processes, and physical access affect resilience through agreed assessment scenarios.', 'Phishing, social engineering, physical controls, and incident readiness.', 'Clear findings that help teams improve awareness, response procedures, and security controls.']
};
const focusTabs = [...document.querySelectorAll('[data-focus]')];
const selectFocus = (tab) => {
  const [number, title, description, scope, outcome] = focusAreas[tab.dataset.focus];
  focusTabs.forEach((item) => {
    item.setAttribute('aria-selected', String(item === tab));
    item.tabIndex = item === tab ? 0 : -1;
  });
  document.querySelector('.explorer-number').textContent = number;
  document.querySelector('#focus-title').textContent = title;
  document.querySelector('#focus-description').textContent = description;
  document.querySelector('#focus-scope').textContent = scope;
  document.querySelector('#focus-outcome').textContent = outcome;
  document.querySelector('#focus-panel').setAttribute('aria-labelledby', tab.id);
};
focusTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFocus(tab));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % focusTabs.length;
    if (event.key === 'ArrowLeft') next = (index + focusTabs.length - 1) % focusTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = focusTabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    focusTabs[next].focus();
    selectFocus(focusTabs[next]);
  });
});

document.querySelector('#copy-email')?.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await Promise.race([navigator.clipboard.writeText('Umar.Mushtaq46@outlook.com'), new Promise((_, reject) => setTimeout(() => reject(new Error('Clipboard unavailable')), 2000))]);
    status.textContent = 'Email copied. Let’s talk security.';
  } catch {
    status.textContent = 'Select the email address above to copy it, or use “Email me”.';
  }
});

// Original portfolio emblems; issuer pages describe the credentials.
const certDetails = [
  ['#ffb35a', 'PENETRATION TESTING', 'Practical offensive security and penetration testing.', 'https://www.offsec.com/courses/pen-200/', 'shield'],
  ['#a8ed56', 'PENETRATION TESTING', 'Infrastructure assessment, vulnerability chaining, and reporting.', 'https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist', 'cube'],
  ['#a8ed56', 'WEB SECURITY', 'Web application testing and bug bounty hunting. Now named CWES by Hack The Box.', 'https://academy.hackthebox.com/news/the-transition-from-htb-cbbh-to-htb-cwes-has-officially-started', 'target'],
  ['#70d6f6', 'DEFENSIVE SECURITY', 'Security analysis, incident handling, and evidence correlation.', 'https://academy.hackthebox.com/preview/certifications', 'shield'],
  ['#65e7d6', 'RED TEAM OPERATIONS', 'Adversary simulation and practical Red Team operations.', 'https://training.zeropointsecurity.co.uk/pages/exams', 'target'],
  ['#94cfff', 'RED TEAM OPS II', 'CRTO2 (CRTL) · Advanced Red Team operations against modern defences.', 'https://www.zeropointsecurity.co.uk/course/red-team-ops-ii', 'shield'],
  ['#ffaa65', 'ADVANCED RED TEAMING', 'Advanced Windows and Active Directory attack paths.', 'https://www.alteredsecurity.com/redteamlab', 'network'],
  ['#ffc96e', 'ACTIVE DIRECTORY', 'Attacking and defending enterprise Active Directory environments.', 'https://www.alteredsecurity.com/adlab', 'network'],
  ['#74c9e8', 'NETWORK PENTESTING', 'Professional network assessment, reporting, and debriefing.', 'https://certifications.tcm-sec.com/PNPT/', 'network'],
  ['#efb658', 'ETHICAL HACKING', 'Practical ethical hacking skills. CEH v12 Practical, as listed in my résumé.', 'https://www.eccouncil.org/train-certify/ceh-practical/', 'shield'],
  ['#f5bf63', 'PENETRATION TESTING', 'Professional penetration testing. eCPPT v2, as listed in my résumé.', 'https://security.ine.com/certifications/ecppt-certification/', 'target'],
  ['#8ecaff', 'NETWORK SECURITY', 'Certified Network Security Practitioner, as listed in my résumé.', null, 'network'],
  ['#a8ed56', 'PRO LABS', 'Zephyr, Dante, RastaLabs, and Cybernetics. Immersive lab environments.', 'https://www.hackthebox.com/hacker/pro-labs', 'cube']
];
const emblemPaths = {
  shield: 'M80 32 112 44V70Q112 92 80 107Q48 92 48 70V44Z M66 68 76 78 96 56',
  cube: 'M80 32 110 49V84L80 102 50 84V49Z M50 49 80 67 110 49 M80 67V102 M65 40 95 58V76',
  target: 'M80 32V42 M80 98V108 M42 70H52 M108 70H118 M80 50A20 20 0 1 0 80 90A20 20 0 1 0 80 50 M80 62A8 8 0 1 0 80 78A8 8 0 1 0 80 62',
  network: 'M80 39V64 M80 64 51 86 M80 64 109 86 M68 27H92V43H68Z M39 85H63V101H39Z M97 85H121V101H97Z'
};
const certTrack = document.querySelector('#cert-track');
const certCards = [...document.querySelectorAll('.credential-list .credential')];
const svgNS = 'http://www.w3.org/2000/svg';
const svgNode = (name, attributes) => {
  const element = document.createElementNS(svgNS, name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
};
certCards.forEach((card, index) => {
  const [color, category, description, url, shape] = certDetails[index];
  const code = card.querySelector('.credential-code').textContent;
  card.style.setProperty('--cert-color', color);
  card.classList.remove('reveal');
  card.setAttribute('role', 'group');
  card.setAttribute('aria-roledescription', 'slide');
  card.setAttribute('aria-label', `${index + 1} of ${certCards.length}: ${code}`);
  const top = document.createElement('div');
  top.className = 'cert-card-top';
  const categoryLabel = document.createElement('span'); categoryLabel.textContent = category;
  const number = document.createElement('span'); number.textContent = String(index + 1).padStart(2, '0');
  top.append(categoryLabel, number); card.prepend(top);
  const badge = card.querySelector('.credential-badge'); badge.replaceChildren(); badge.setAttribute('aria-hidden', 'true');
  const svg = svgNode('svg', {viewBox:'0 0 160 160', fill:'none'});
  svg.append(svgNode('circle', {cx:80, cy:80, r:76, stroke:'currentColor', opacity:'.15'}));
  svg.append(svgNode('circle', {cx:80, cy:80, r:69, stroke:'currentColor', 'stroke-dasharray':'3 8', class:'cert-orbit', opacity:'.55'}));
  svg.append(svgNode('path', {d:'M80 17 132 47V108L80 140 28 108V47Z', fill:'currentColor', 'fill-opacity':'.06', stroke:'currentColor', 'stroke-opacity':'.4'}));
  svg.append(svgNode('path', {d:emblemPaths[shape], stroke:'currentColor', 'stroke-width':'2', 'stroke-linejoin':'round', 'stroke-linecap':'round'}));
  const codeText = svgNode('text', {x:80, y:126, class:'cert-emblem-code'}); codeText.textContent = code === 'PRO LABS' ? 'LABS' : code === 'CRTO2 (CRTL)' ? 'CRTL' : code;
  if (code.length > 7) codeText.setAttribute('style', 'font-size:16px');
  svg.append(codeText); badge.append(svg);
  const descriptionNode = document.createElement('p'); descriptionNode.className = 'cert-description'; descriptionNode.textContent = description;
  card.querySelector('h3').after(descriptionNode);
  if (url) {
    const link = document.createElement('a'); link.className = 'cert-link'; link.href = url; link.target = '_blank'; link.rel = 'noreferrer';
    link.textContent = 'About the certification ↗';
    if (code === 'PRO LABS') link.textContent = 'Explore the labs ↗';
    card.append(link);
  }
});

// A second, visually identical set makes the marquee wrap without a jump.
const clonedCerts = certCards.map((card) => {
  const clone = card.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  clone.removeAttribute('aria-label');
  clone.querySelectorAll('a, button').forEach((element) => element.tabIndex = -1);
  certTrack.append(clone);
  return clone;
});
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = motionPreference.matches;
let marqueeVisible = false;
let pointerInside = false;
let touching = false;
let loopWidth = 0;
let lastFrame = 0;
let marqueePosition = 0;
motionPreference.addEventListener('change', (event) => { motionPaused = event.matches; });
certTrack.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') pointerInside = true; });
certTrack.addEventListener('pointerleave', () => { pointerInside = false; });
certTrack.addEventListener('touchstart', () => { touching = true; }, {passive:true});
certTrack.addEventListener('touchend', () => { touching = false; }, {passive:true});
certTrack.addEventListener('touchcancel', () => { touching = false; }, {passive:true});
new ResizeObserver(() => {
  loopWidth = clonedCerts[0].offsetLeft - certCards[0].offsetLeft;
  marqueePosition = certTrack.scrollLeft;
}).observe(certTrack);
new IntersectionObserver(([entry]) => { marqueeVisible = entry.isIntersecting; }).observe(certTrack);
const animateMarquee = (time) => {
  const elapsed = Math.min(time - (lastFrame || time), 50);
  lastFrame = time;
  const focused = certTrack.contains(document.activeElement);
  if (!motionPaused && !pointerInside && !touching && !focused && marqueeVisible && !document.hidden && loopWidth > 0) {
    // Track subpixel motion separately so low speeds are smooth on every display.
    if (Math.abs(certTrack.scrollLeft - marqueePosition) > 2) marqueePosition = certTrack.scrollLeft;
    marqueePosition = (marqueePosition + elapsed * .038) % loopWidth;
    certTrack.scrollLeft = marqueePosition;
  } else {
    marqueePosition = certTrack.scrollLeft;
  }
  requestAnimationFrame(animateMarquee);
};
requestAnimationFrame(animateMarquee);

// Stable original text remains available to search and assistive technology.
// The decorative visual layer types, holds, deletes, and advances to a phrase.
const typewriters = new Map();
document.querySelectorAll('[data-typewriter]').forEach((element) => {
  const output = document.createElement('span');
  output.className = 'typewriter-output'; output.setAttribute('aria-hidden', 'true');
  const letters = document.createElement('span'); letters.className = 'typewriter-letters';
  const caret = document.createElement('span'); caret.className = 'typewriter-cursor';
  output.append(letters, caret); element.append(output);
  typewriters.set(element, {phrases: JSON.parse(element.dataset.typewriter), letters, phrase: 0, length: 0, phase: 'typing', visible: false, timer: null});
});
const runTypewriter = (element) => {
  const state = typewriters.get(element);
  if (state.timer || !state.visible || document.hidden || motionPreference.matches) return;
  element.classList.add('is-enhanced');
  const tick = () => {
    state.timer = null;
    if (!state.visible || document.hidden || motionPreference.matches) return;
    const phrase = [...state.phrases[state.phrase]];
    let delay = 75;
    if (state.phase === 'typing') {
      state.length++;
      if (state.length >= phrase.length) { state.phase = 'holding'; delay = 1800; }
    } else if (state.phase === 'holding') {
      state.phase = 'deleting'; delay = 40;
    } else if (state.phase === 'deleting') {
      state.length = Math.max(0, state.length - 1); delay = 40;
      if (!state.length) { state.phase = 'waiting'; delay = 450; }
    } else {
      state.phrase = (state.phrase + 1) % state.phrases.length;
      state.phase = 'typing';
    }
    state.letters.textContent = [...state.phrases[state.phrase]].slice(0, state.length).join('');
    element.dataset.typewriterPhase = state.phase;
    state.timer = setTimeout(tick, delay);
  };
  state.timer = setTimeout(tick, 150);
};
const typewriterObserver = new IntersectionObserver((entries) => {
  entries.forEach(({target, isIntersecting}) => {
    const state = typewriters.get(target);
    state.visible = isIntersecting;
    if (isIntersecting) runTypewriter(target);
    else { clearTimeout(state.timer); state.timer = null; }
  });
}, {threshold: .6});
typewriters.forEach((_, element) => typewriterObserver.observe(element));
motionPreference.addEventListener('change', ({matches}) => {
  typewriters.forEach((state, element) => {
    if (matches) { clearTimeout(state.timer); state.timer = null; element.classList.remove('is-enhanced'); }
    else runTypewriter(element);
  });
});
document.addEventListener('visibilitychange', () => {
  typewriters.forEach((state, element) => {
    if (document.hidden) { clearTimeout(state.timer); state.timer = null; }
    else runTypewriter(element);
  });
});
