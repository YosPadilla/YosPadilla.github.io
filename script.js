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
  const journeyProgress = document.getElementById('journeyProgress');
  const journeySection = document.getElementById('journey');
  const journeyStories = Array.from(document.querySelectorAll('[data-journey]'));
  const journeyYearButtons = Array.from(document.querySelectorAll('[data-journey-target]'));
  const navLinks = Array.from(document.querySelectorAll('.desktop-nav a'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const copy = {
    en: {
      'nav.perspective':'Perspective','nav.journey':'Journey','nav.systems':'Systems','nav.capabilities':'Capabilities','nav.next':'Next','nav.cv':'Download CV',
      'hero.citizen':'EU Citizen · Portuguese & Mexican','hero.discipline':'Computer Systems Engineering','hero.statement':'Where business complexity becomes intelligent systems.','hero.summary':'Combining enterprise processes, automation and data to build practical digital solutions across procurement, logistics and manufacturing environments.','hero.work':'Explore my work','hero.authorized':'EU Work Authorized','hero.sponsorship':'No sponsorship required',
      'perspective.label':'PERSPECTIVE','perspective.overline':'THE OPERATING PRINCIPLE','perspective.title':'Technology is more valuable when you understand the operation behind it.','perspective.p1':'My path moved through customer-facing operations, materials, manufacturing and enterprise technology. Each stage added a different way of seeing a business: customers reveal needs, materials reveal flow, manufacturing reveals constraints, and systems reveal where complexity can be redesigned.','perspective.p2':'Today I bring those layers together through SAP, automation and data — translating operational friction into practical digital solutions.','perspective.manifestoLabel':'How I think','perspective.manifesto':'Understand the process. Find the friction. Build the system. Measure the change.','world.business':'Business Processes','world.enterprise':'Enterprise Technology','world.data':'Data & Intelligence',
      'journey.label':'THE JOURNEY','journey.overline':'FROM OPERATIONS TO SYSTEMS','journey.title':'Four environments. One increasingly connected view of business.','journey.intro':'The value is not in having worked in different industries. It is in what each one taught me to see.','journey.learned':'What stayed with me','journey.coppel.title':'Customers taught me that technology starts with people.','journey.coppel.copy':'Leading a retail electronics area meant balancing customer needs, sales goals, inventory, warranties, merchandising and team development. It built the customer-facing and communication layer that technical work alone cannot teach.','journey.coppel.signal':'Listen first. Solve second.','journey.phoenix.title':'Materials taught me that flow is a system.','journey.phoenix.copy':'Warehouse operations exposed the hidden choreography behind production: inbound material, FIFO discipline, inventory control, replenishment and people moving in sync. A bottleneck is rarely isolated; it propagates.','journey.phoenix.signal':'Design the flow, not only the task.','journey.mueblerias.title':'Manufacturing taught me that constraints create better decisions.','journey.mueblerias.copy':'Translating customer requirements into CNC-ready production meant thinking about dimensions, materials, cost, waste and execution at the same time. A good design is not just correct — it is manufacturable.','journey.mueblerias.signal':'A solution has to survive reality.','journey.mls.title':'Enterprise systems taught me how to connect the layers.','journey.mls.copy':'SAP GUI, Python, Power Platform and data work gave me the tools to turn operational knowledge into repeatable systems: automate a master-data workflow, structure a document audit, centralize procurement tracking, and make status visible.','journey.mls.signal':'Complexity becomes manageable when the process becomes visible.',
      'systems.label':'SELECTED SYSTEMS','systems.overline':'BUILD THE CHANGE','systems.title':'Not a gallery of tools. A set of problems turned into systems.','systems.intro':'Professional case studies stay intentionally high-level. The purpose here is to show the problem, the reasoning and the shape of the solution — without exposing confidential company data or source code.','systems.private':'Professional case study · Private','systems.public':'Public project','systems.case':'View case study','systems.repo':'View repository','case.challenge':'Challenge','case.approach':'Approach','case.outcome':'Outcome',
      'systems.sap.title':'SAP Material Master Automation','systems.sap.copy':'A recurring material-master process became a validation-first automation built around SAP GUI Scripting and Python. The important change was not only speed: incomplete inputs could be surfaced before they became execution problems.','systems.sap.challenge':'Manual repetition, incomplete source data and avoidable rework.','systems.sap.approach':'Validate first, automate the repeatable SAP sequence, then wrap it in a friendlier interface.','systems.sap.outcome':'A recurring workflow that became faster, repeatable and easier to execute consistently.',
      'systems.audit.title':'Electronic Customs Records Audit','systems.audit.copy':'A document-heavy manual review was reframed as a classification and evidence problem. The workflow recursively inspects fragmented archives, identifies key documents, cross-checks information and produces a traceable audit output.','systems.audit.challenge':'Evidence was distributed across folders, compressed files and different document types.','systems.audit.approach':'Classify, deduplicate, extract, cross-check and preserve evidence for human review.','systems.audit.outcome':'Manual inspection became a structured exception-driven review with traceable results.',
      'systems.power.title':'Procurement & Logistics Workflow','systems.power.copy':'Email and message-based tracking became a role-aware workflow for purchasing documentation, required files, operational status and audit history — giving users one place to see what was happening.','systems.power.challenge':'Status, documents and follow-up lived across disconnected messages and email threads.','systems.power.approach':'Centralize the record, enforce required documentation, apply roles and make status visible.','systems.power.outcome':'A shared operational view with stronger traceability and less searching for context.',
      'systems.lab.title':'Laboratory Management System','systems.lab.copy':'A web application for access control and student registration in an Electronics / Analog laboratory, with administrator roles, validation rules and Oracle-backed records.',
      'explore.label':'EXPLORATION & ENGINEERING','explore.title':'Curiosity still has a place — just not at the center of the story.',
      'cap.label':'CAPABILITIES','cap.overline':'THE OPERATING STACK','cap.title':'Tools matter. Context determines what they become.','education.label':'EDUCATION','education.training':'SELECTED TRAINING',
      'next.badge':'EU Citizen · No sponsorship required','next.label':'NEXT','next.title':'Ready to build what comes next.','next.copy':'Open to SAP, enterprise technology, business process transformation and customer-facing technology opportunities across Europe.','next.email':'Email me','toast.cv':'The final English CV will be connected after the portfolio review.'
    },
    es: {
      'nav.perspective':'Perspectiva','nav.journey':'Trayectoria','nav.systems':'Sistemas','nav.capabilities':'Capacidades','nav.next':'Siguiente','nav.cv':'Descargar CV',
      'hero.citizen':'Ciudadano UE · Portugués y Mexicano','hero.discipline':'Ingeniería en Sistemas Computacionales','hero.statement':'Donde la complejidad del negocio se convierte en sistemas inteligentes.','hero.summary':'Integro procesos empresariales, automatización y datos para construir soluciones digitales prácticas en entornos de compras, logística y manufactura.','hero.work':'Explorar mi trabajo','hero.authorized':'Autorizado para trabajar en la UE','hero.sponsorship':'Sin necesidad de patrocinio',
      'perspective.label':'PERSPECTIVA','perspective.overline':'EL PRINCIPIO OPERATIVO','perspective.title':'La tecnología tiene más valor cuando entiendes la operación que existe detrás.','perspective.p1':'Mi trayectoria pasó por operaciones de cara al cliente, materiales, manufactura y tecnología empresarial. Cada etapa agregó una forma distinta de observar un negocio: los clientes revelan necesidades, los materiales revelan flujo, la manufactura revela restricciones y los sistemas revelan dónde puede rediseñarse la complejidad.','perspective.p2':'Hoy integro esas capas mediante SAP, automatización y datos, convirtiendo fricción operativa en soluciones digitales prácticas.','perspective.manifestoLabel':'Cómo pienso','perspective.manifesto':'Entender el proceso. Encontrar la fricción. Construir el sistema. Medir el cambio.','world.business':'Procesos de Negocio','world.enterprise':'Tecnología Empresarial','world.data':'Datos e Inteligencia',
      'journey.label':'LA TRAYECTORIA','journey.overline':'DE OPERACIONES A SISTEMAS','journey.title':'Cuatro entornos. Una visión cada vez más conectada del negocio.','journey.intro':'El valor no está en haber trabajado en industrias distintas. Está en lo que cada una me enseñó a observar.','journey.learned':'Lo que me dejó','journey.coppel.title':'Los clientes me enseñaron que la tecnología comienza con las personas.','journey.coppel.copy':'Coordinar un área de electrónica significaba equilibrar necesidades de clientes, metas de venta, inventario, garantías, exhibición y desarrollo del equipo. Ahí construí una capa de comunicación y atención al cliente que el trabajo técnico por sí solo no enseña.','journey.coppel.signal':'Escuchar primero. Resolver después.','journey.phoenix.title':'Los materiales me enseñaron que el flujo es un sistema.','journey.phoenix.copy':'El almacén mostró la coreografía que sostiene a producción: entradas, disciplina PEPS, control de inventario, reabastecimiento y personas moviéndose en sincronía. Un cuello de botella rara vez está aislado; se propaga.','journey.phoenix.signal':'Diseñar el flujo, no solo la tarea.','journey.mueblerias.title':'La manufactura me enseñó que las restricciones producen mejores decisiones.','journey.mueblerias.copy':'Convertir requerimientos de clientes en producción CNC implicaba pensar simultáneamente en dimensiones, materiales, costo, desperdicio y ejecución. Un buen diseño no solo es correcto: tiene que poder fabricarse.','journey.mueblerias.signal':'Una solución tiene que sobrevivir a la realidad.','journey.mls.title':'Los sistemas empresariales me enseñaron a conectar las capas.','journey.mls.copy':'SAP GUI, Python, Power Platform y el trabajo con datos me dieron herramientas para convertir conocimiento operativo en sistemas repetibles: automatizar datos maestros, estructurar auditorías documentales, centralizar seguimiento de compras y hacer visible el estatus.','journey.mls.signal':'La complejidad se vuelve manejable cuando el proceso se vuelve visible.',
      'systems.label':'SISTEMAS SELECCIONADOS','systems.overline':'CONSTRUIR EL CAMBIO','systems.title':'No es una galería de herramientas. Son problemas convertidos en sistemas.','systems.intro':'Los casos profesionales se mantienen deliberadamente a alto nivel. El objetivo es mostrar el problema, el razonamiento y la forma de la solución sin exponer datos internos o código confidencial.','systems.private':'Caso profesional · Privado','systems.public':'Proyecto público','systems.case':'Ver caso de estudio','systems.repo':'Ver repositorio','case.challenge':'Reto','case.approach':'Enfoque','case.outcome':'Resultado',
      'systems.sap.title':'Automatización de Maestro de Materiales en SAP','systems.sap.copy':'Un proceso recurrente de datos maestros se convirtió en una automatización orientada primero a la validación, construida con SAP GUI Scripting y Python. El cambio importante no fue solo la velocidad: la información incompleta podía detectarse antes de convertirse en un problema de ejecución.','systems.sap.challenge':'Repetición manual, datos de origen incompletos y retrabajo evitable.','systems.sap.approach':'Validar primero, automatizar la secuencia repetible en SAP y después envolverla en una interfaz más amigable.','systems.sap.outcome':'Un flujo recurrente más rápido, repetible y sencillo de ejecutar consistentemente.',
      'systems.audit.title':'Auditoría de Expedientes Electrónicos Aduaneros','systems.audit.copy':'Una revisión manual cargada de documentos se replanteó como un problema de clasificación y evidencia. El flujo inspecciona archivos fragmentados, identifica documentos clave, cruza información y produce un resultado de auditoría trazable.','systems.audit.challenge':'La evidencia estaba distribuida entre carpetas, archivos comprimidos y distintos tipos documentales.','systems.audit.approach':'Clasificar, deduplicar, extraer, cruzar y conservar evidencia para revisión humana.','systems.audit.outcome':'La inspección manual se convirtió en una revisión estructurada por excepciones con resultados trazables.',
      'systems.power.title':'Flujo de Compras y Logística','systems.power.copy':'El seguimiento por correo y mensajes se convirtió en un flujo con roles para documentación de compras, archivos requeridos, estatus operativo e historial de auditoría, dando a los usuarios un lugar común para saber qué estaba ocurriendo.','systems.power.challenge':'Estatus, documentos y seguimiento vivían en mensajes y cadenas de correo desconectadas.','systems.power.approach':'Centralizar el registro, exigir documentación, aplicar roles y hacer visible el estatus.','systems.power.outcome':'Una vista operativa compartida con mayor trazabilidad y menos tiempo buscando contexto.',
      'systems.lab.title':'Sistema de Gestión de Laboratorio','systems.lab.copy':'Aplicación web para control de acceso y registro de alumnos en un laboratorio de Electrónica / Analógica, con roles administrativos, reglas de validación y registros respaldados en Oracle.',
      'explore.label':'EXPLORACIÓN E INGENIERÍA','explore.title':'La curiosidad sigue teniendo un lugar, solo que ya no ocupa el centro de la historia.',
      'cap.label':'CAPACIDADES','cap.overline':'EL STACK OPERATIVO','cap.title':'Las herramientas importan. El contexto determina en qué se convierten.','education.label':'EDUCACIÓN','education.training':'FORMACIÓN SELECCIONADA',
      'next.badge':'Ciudadano UE · Sin patrocinio requerido','next.label':'SIGUIENTE','next.title':'Listo para construir lo que sigue.','next.copy':'Abierto a oportunidades en SAP, tecnología empresarial, transformación de procesos y roles tecnológicos de cara al cliente en Europa.','next.email':'Escríbeme','toast.cv':'El CV final en inglés se conectará después de revisar el portafolio.'
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

    if (journeySection && journeyProgress) {
      const rect = journeySection.getBoundingClientRect();
      const travel = journeySection.offsetHeight - window.innerHeight * .35;
      const consumed = Math.min(travel, Math.max(0, window.innerHeight * .28 - rect.top));
      journeyProgress.style.height = `${travel > 0 ? Math.max(0, Math.min(100, consumed / travel * 100)) : 0}%`;
    }
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
    }, { threshold:.13, rootMargin:'0px 0px -7% 0px' });
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
  mobilePanel?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-showing');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-showing'), 2400);
  }
  document.querySelectorAll('.cv-placeholder').forEach((button) => button.addEventListener('click', () => showToast(copy[language]['toast.cv'])));

  document.querySelectorAll('.case-toggle').forEach((button) => {
    const id = button.dataset.case;
    const panel = document.getElementById(`case-${id}`);
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      if (panel) panel.hidden = open;
    });
  });

  if (journeyStories.length && 'IntersectionObserver' in window) {
    const storyObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const key = visible.target.dataset.journey;
      journeyStories.forEach((story) => story.classList.toggle('is-active', story === visible.target));
      journeyYearButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.journeyTarget === key));
    }, { threshold:[.25,.45,.65], rootMargin:'-20% 0px -35% 0px' });
    journeyStories.forEach((story) => storyObserver.observe(story));
  } else journeyStories[0]?.classList.add('is-active');

  journeyYearButtons.forEach((button) => button.addEventListener('click', () => {
    document.getElementById(button.dataset.journeyTarget)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block:'center' });
  }));

  const sections = ['perspective','journey','systems','capabilities','next'].map((id) => document.getElementById(id)).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { threshold:[.16,.35,.55], rootMargin:'-25% 0px -55% 0px' });
    sections.forEach((section) => navObserver.observe(section));
  }

  if (particleField) {
    const count = window.innerWidth < 780 ? 16 : 28;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const dot = document.createElement('span');
      dot.className = 'particle';
      dot.style.left = `${Math.random()*100}%`;
      dot.style.top = `${Math.random()*100}%`;
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
