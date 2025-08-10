/* ---------- Utils ---------- */
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

/* ---------- Theme (persist) ---------- */
const themeToggle = qs('#themeToggle');
const stored = localStorage.getItem('theme') || 'dark';
if (stored === 'light') {
  document.body.classList.add('light-theme');
} else {
  document.body.classList.remove('light-theme');
}
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcon();
});
function updateThemeIcon(){
  themeToggle.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';
}

/* ---------- Date / Year ---------- */
qs('#year').textContent = new Date().getFullYear();

/* ---------- Project loading & UI ---------- */
let projectsData = [];
const projectList = qs('#project-list');
const filtersEl = qs('#filters');
const skillChips = qs('#skill-chips');
const modal = qs('#projectModal');

/* fetch projects.json (serve via Live Server) */
fetch('projects.json')
  .then(r => {
    if(!r.ok) throw new Error('projects.json not found. Serve via Live Server.');
    return r.json();
  })
  .then(data => {
    projectsData = data;
    renderProjects(projectsData);
    populateFilters(projectsData);
    populateSkillChips(projectsData);
    animateSkillBars();
  })
  .catch(err => {
    console.error(err);
    projectList.innerHTML = '<div class="card">Failed to load projects.json — open with Live Server.</div>';
  });

/* Render project cards */
/* Render project cards */
/* Render project cards */
function renderProjects(list){
  projectList.innerHTML = '';
  if(!list.length){
    projectList.innerHTML = '<div class="card">No projects found.</div>';
    return;
  }
  list.forEach(proj => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="project-image">
        <img src="${proj.image || 'assets/placeholder.png'}" alt="${proj.title}">
      </div>
      <div>
        <h4>${proj.title}</h4>
        <p>${proj.short}</p>
        <div class="meta">${proj.skills.map(s => `<span class="chip">${s}</span>`).join(' ')}</div>
        <div style="margin-top:12px;display:flex;gap:8px;">
          <button class="btn primary details-btn" data-id="${proj.id}">Details</button>
          <a class="btn ghost" href="${proj.github}" target="_blank">GitHub</a>
        </div>
      </div>
    `;
    projectList.appendChild(card);
  });

  // Add event listeners to Details buttons after adding cards
  const detailButtons = document.querySelectorAll('.details-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openModalFor(id);
    });
  });
}

/* Filters */
/* Filters */
function populateFilters(list) {
  const skills = new Set(list.flatMap(p => p.skills));

  // Create buttons with a base class for styling
  filtersEl.innerHTML =
    `<button class="filter-btn active" data-skill="all">All</button>` +
    Array.from(skills)
      .map(s => `<button class="filter-btn" data-skill="${s}">${s}</button>`)
      .join('');

  // Handle click events
  filtersEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Remove active class from all
    qsa('.filter-btn').forEach(b => b.classList.remove('active'));

    // Add active to the clicked one
    btn.classList.add('active');

    // Filter logic
    const skill = btn.dataset.skill;
    if (skill === 'all') {
      renderProjects(projectsData);
    } else {
      renderProjects(projectsData.filter(p => p.skills.includes(skill)));
    }
  });
}

/* Skill chips */
function populateSkillChips(list){
  const skills = Array.from(new Set(list.flatMap(p => p.skills)));
  skillChips.innerHTML = skills.map(s => `<span class="chip">${s}</span>`).join(' ');
}

/* Modal */
function openModalFor(id){
  const proj = projectsData.find(p=>p.id===id);
  if(!proj) return;
  qs('#modalImage').src = proj.image;
  qs('#modalTitle').textContent = proj.title;
  qs('#modalDescription').textContent = proj.description;
  qs('#modalSkills').innerHTML = proj.skills.map(s => `<span class="chip">${s}</span>`).join(' ');
  qs('#modalGit').href = proj.github || '#';
  modal.setAttribute('aria-hidden','false');
}
qs('#closeModal').addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
modal.addEventListener('click', e => { if(e.target === modal) modal.setAttribute('aria-hidden','true'); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') modal.setAttribute('aria-hidden','true'); });

/* Animate skill bars */
function animateSkillBars(){
  setTimeout(()=> {
    qsa('.bar-fill').forEach(el => {
      const w = el.getAttribute('data-fill') || '70%';
      el.style.width = w;
    });
  }, 400);
}

/* Back to top */
const backBtn = qs('#backTop');
window.addEventListener('scroll', ()=> {
  if(window.scrollY > 350) backBtn.style.display = 'block';
  else backBtn.style.display = 'none';
});
backBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

/* Contact form (demo) */
const form = qs('#contactForm');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const name = qs('#name').value.trim();
  const email = qs('#email').value.trim();
  const message = qs('#message').value.trim();
  if(!name||!email||!message){ alert('Please fill all fields'); return; }
  alert('Thanks, ' + name + '! (demo) Your message was noted.');
  form.reset();
});
