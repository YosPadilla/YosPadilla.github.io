(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const progress = document.getElementById('scrollProgress');
  const themeToggle = document.querySelector('.theme-toggle');
  const langButtons = document.querySelectorAll('[data-lang]');
  const desktopLangSwitch = document.querySelector('.language-switch:not(.language-switch--mobile)');
  const menuButton = document.querySelector('.menu-button');
  const mobilePanel = document.getElementById('mobilePanel');
  const mobileClose = document.querySelector('.mobile-close');
  const panelScrim = document.querySelector('.panel-scrim');
  const portraitPanel = document.getElementById('portraitPanel');
  const particleField = document.getElementById('particleField');
  const toast = document.getElementById('toast');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const copy = {
    en: {
      'nav.about':'About','nav.experience':'Experience','nav.projects':'Projects','nav.skills':'Skills','nav.education':'Education','nav.contact':'Contact','nav.cv':'Download CV',
      'hero.citizen':'EU Citizen · Portuguese & Mexican','hero.discipline':'Computer Systems Engineering','hero.statement':'Where business complexity becomes intelligent systems.','hero.summary':'Combining enterprise processes, automation and data to build practical digital solutions across procurement, logistics and manufacturing environments.','hero.work':'Explore my work','hero.authorized':'EU Work Authorized','hero.sponsorship':'No sponsorship required',
      'about.label':'ABOUT','about.title':'Technology works better when you understand the business behind it.','about.p1':'My path has crossed customer-facing operations, materials management, manufacturing and enterprise technology. That progression taught me to look at systems from both sides: how people work and how technology can make the process better.','about.p2':'Today I work with SAP GUI, Python, Microsoft Power Platform and data tools to translate operational needs into practical automation, traceability and decision-support solutions.','about.noteLabel':'Direction','about.note':'Building toward SAP, enterprise technology and digital transformation roles where business context matters as much as technical execution.','pillars.business':'Business Processes','pillars.enterprise':'Enterprise Technology','pillars.data':'Data & Intelligence','phase.eyebrow':'NEXT BUILD PHASE','phase.copy':'Experience, selected case studies, skills, education and the final contact flow will be added after this visual system is approved.','toast.phase':'This section is intentionally reserved for phase 2.','toast.cv':'The final English CV will be connected after the visual review.'
    },
    es: {
      'nav.about':'Perfil','nav.experience':'Experiencia','nav.projects':'Proyectos','nav.skills':'Aptitudes','nav.education':'Educación','nav.contact':'Contacto','nav.cv':'Descargar CV',
      'hero.citizen':'Ciudadano UE · Portugués y Mexicano','hero.discipline':'Ingeniería en Sistemas Computacionales','hero.statement':'Donde la complejidad del negocio se convierte en sistemas inteligentes.','hero.summary':'Integro procesos empresariales, automatización y datos para construir soluciones digitales prácticas en entornos de compras, logística y manufactura.','hero.work':'Explorar mi trabajo','hero.authorized':'Autorizado para trabajar en la UE','hero.sponsorship':'Sin necesidad de patrocinio',
      'about.label':'PERFIL','about.title':'La tecnología funciona mejor cuando entiendes el negocio que existe detrás.','about.p1':'Mi trayectoria ha pasado por operaciones de cara al cliente, gestión de materiales, manufactura y tecnología empresarial. Esa evolución me enseñó a observar los sistemas desde ambos lados: cómo trabajan las personas y cómo la tecnología puede mejorar el proceso.','about.p2':'Actualmente trabajo con SAP GUI, Python, Microsoft Power Platform y herramientas de datos para traducir necesidades operativas en automatización, trazabilidad y soluciones que apoyan la toma de decisiones.','about.noteLabel':'Dirección','about.note':'Construyendo una trayectoria hacia SAP, tecnología empresarial y transformación digital, donde el contexto de negocio sea tan importante como la ejecución técnica.','pillars.business':'Procesos de Negocio','pillars.enterprise':'Tecnología Empresarial','pillars.data':'Datos e Inteligencia','phase.eyebrow':'SIGUIENTE FASE','phase.copy':'Experiencia, casos de estudio, aptitudes, educación y el flujo final de contacto se añadirán después de aprobar este sistema visual.','toast.phase':'Esta sección está reservada intencionalmente para la fase 2.','toast.cv':'El CV final en inglés se conectará después de la revisión visual.'
    }
  };

  const storedTheme = localStorage.getItem('portfolio-theme');
  root.dataset.theme = storedTheme === 'light' ? 'light' : 'dark';

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#edf7fd' : '#020914');
  }
  themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  let language = localStorage.getItem('portfolio-lang') === 'es' ? 'es' : 'en';
  function setLanguage(lang) {
    language = lang;
    root.lang = lang;
    localStorage.setItem('portfolio-lang', lang);
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      if (copy[lang]?.[key]) node.textContent = copy[lang][key];
    });
    langButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.lang === lang));
    if (desktopLangSwitch) desktopLangSwitch.dataset.active = lang;
  }
  langButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  setLanguage(language);

  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    header?.classList.toggle('is-scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', updateScroll, { passive:true });
  updateScroll();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:.16, rootMargin:'0px 0px -7% 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('is-visible'));

  function setMenu(open) {
    menuButton?.setAttribute('aria-expanded', String(open));
    mobilePanel?.classList.toggle('is-open', open);
    mobilePanel?.setAttribute('aria-hidden', String(!open));
    if (panelScrim) panelScrim.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileClose?.addEventListener('click', () => setMenu(false));
  panelScrim?.addEventListener('click', () => setMenu(false));
  mobilePanel?.querySelector('a[href="#about"]')?.addEventListener('click', () => setMenu(false));

  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-showing');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-showing'), 2400);
  }
  document.querySelectorAll('[data-phase]').forEach((button) => button.addEventListener('click', () => { setMenu(false); showToast(copy[language]['toast.phase']); }));
  document.querySelectorAll('.cv-placeholder').forEach((button) => button.addEventListener('click', () => showToast(copy[language]['toast.cv'])));

  if (particleField) {
    const count = window.innerWidth < 780 ? 16 : 28;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const dot = document.createElement('span'); dot.className = 'particle';
      dot.style.left = `${Math.random()*100}%`; dot.style.top = `${Math.random()*100}%`;
      dot.style.setProperty('--s', `${(1+Math.random()*1.4).toFixed(2)}px`);
      dot.style.setProperty('--o', (0.07+Math.random()*0.13).toFixed(2));
      fragment.appendChild(dot);
    }
    particleField.appendChild(fragment);
  }

  if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) {
    const particles = Array.from(document.querySelectorAll('.particle'));
    let raf = 0;
    window.addEventListener('pointermove', (event) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = event.clientX/window.innerWidth - .5;
        const ny = event.clientY/window.innerHeight - .5;
        particles.forEach((dot,index) => {
          const depth = 3+(index%4)*1.4;
          dot.style.setProperty('--px', `${(nx*depth).toFixed(1)}px`);
          dot.style.setProperty('--py', `${(ny*depth).toFixed(1)}px`);
        });
      });
    }, { passive:true });
    portraitPanel?.addEventListener('pointermove', (event) => {
      const rect = portraitPanel.getBoundingClientRect();
      const x = (event.clientX-rect.left)/rect.width-.5;
      const y = (event.clientY-rect.top)/rect.height-.5;
      portraitPanel.style.transform = `perspective(900px) rotateY(${(x*2.2).toFixed(2)}deg) rotateX(${(-y*2).toFixed(2)}deg) translate3d(${(x*3).toFixed(1)}px,${(y*3).toFixed(1)}px,0)`;
    });
    portraitPanel?.addEventListener('pointerleave', () => { portraitPanel.style.transform = ''; });
  }
})();
