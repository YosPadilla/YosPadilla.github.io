(() => {
  const base = document.createElement('script');
  base.src = 'script-base.js';
  base.onload = () => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const narrative = {
      en: {
        'hero.summary':'I work at the intersection of operations and technology — understanding how work actually happens, then using SAP, automation and data to make it clearer, more repeatable and easier to act on.',
        'perspective.overline':'THE THROUGHLINE',
        'perspective.title':'I learned the business before I learned to automate it.',
        'perspective.p1':'My path did not begin in software. It began where business decisions become real: with customers, inventory, materials, production, deadlines and imperfect information. That matters because enterprise systems do not live in diagrams — they live inside people’s work.',
        'perspective.p2':'Today, SAP, automation and data are how I turn that operating context into clearer, repeatable systems — not technology for its own sake, but technology shaped around the process it has to improve.',
        'perspective.manifesto':'See the operation. Make the friction visible. Design the system. Prove the change.',
        'journey.title':'Before I built systems, I learned what they have to survive.',
        'journey.intro':'Retail taught me people. Materials taught me flow. Manufacturing taught me constraints. Enterprise technology gave me the tools to connect them.',
        'journey.coppel.title':'People before process.',
        'journey.coppel.copy':'Retail made every decision visible immediately: a customer had a need, a team needed direction, inventory had limits and the answer still had to make business sense. It taught me to understand the person before trying to optimize the process.',
        'journey.coppel.signal':'Listen before you design.',
        'journey.phoenix.title':'Flow before optimization.',
        'journey.phoenix.copy':'Warehouse operations showed me that performance is rarely about one task. Receiving, FIFO, inventory, replenishment and people all move as one system — and one weak handoff can slow everything downstream.',
        'journey.phoenix.signal':'Optimize the flow, not the isolated task.',
        'journey.mueblerias.title':'Reality before elegance.',
        'journey.mueblerias.copy':'CNC work forced ideas to meet material, cost, dimensions, waste and production time. A design could look perfect on screen and still fail in the shop. That taught me to judge solutions by whether they survive real constraints.',
        'journey.mueblerias.signal':'Good solutions survive real constraints.',
        'journey.mls.title':'Systems that connect the whole picture.',
        'journey.mls.copy':'At ml&s, the earlier lessons finally became technical building blocks. SAP, Python, Power Platform and data tools let me turn recurring friction into validation, automation, traceability and shared visibility.',
        'journey.mls.signal':'Make complexity visible, then make it repeatable.',
        'systems.overline':'FROM FRICTION TO SYSTEM',
        'systems.title':'When friction repeats, I look for the system hiding underneath.',
        'systems.intro':'These case studies show the same pattern at different scales: make the problem visible, structure what matters, automate what should be repeatable, and leave people with a clearer decision. The interfaces are illustrative; the outcomes are real.',
        'systems.sap.copy':'What looked like repetitive SAP entry was really a control problem: the workflow depended on complete inputs and consistent execution. I moved validation to the front, then automated the repeatable MM01/MM02 sequence.',
        'systems.audit.copy':'What looked like document review was really an evidence-mapping problem. I reframed fragmented folders and archives as a structured classification flow that identifies evidence, cross-checks information and surfaces exceptions.',
        'systems.power.copy':'What looked like follow-up by email was really a visibility problem. I centralized documentation, roles and status so Procurement and Logistics could work from one shared operational record instead of reconstructing context from messages.',
        'systems.lab.copy':'A smaller academic system built around the same principle: translate operating rules into software. The application turns access roles, student registration and validation requirements into a persistent Oracle-backed workflow.',
        'cap.title':'A stack is useful only when it can change the work.',
        'next.title':'The next chapter is about scale.',
        'next.copy':'I am ready to bring this operating perspective to SAP, enterprise technology, business process transformation and customer-facing technology roles across Europe.'
      },
      es: {
        'hero.summary':'Trabajo en la intersección entre operación y tecnología: entiendo cómo sucede realmente el trabajo y después utilizo SAP, automatización y datos para volverlo más claro, repetible y accionable.',
        'perspective.overline':'EL HILO CONDUCTOR',
        'perspective.title':'Aprendí el negocio antes de aprender a automatizarlo.',
        'perspective.p1':'Mi trayectoria no comenzó en software. Comenzó donde las decisiones de negocio se vuelven reales: con clientes, inventario, materiales, producción, tiempos e información imperfecta. Eso importa porque los sistemas empresariales no viven en diagramas: viven dentro del trabajo de las personas.',
        'perspective.p2':'Hoy, SAP, la automatización y los datos son la forma en que convierto ese contexto operativo en sistemas más claros y repetibles; no tecnología por sí misma, sino tecnología diseñada alrededor del proceso que debe mejorar.',
        'perspective.manifesto':'Ver la operación. Hacer visible la fricción. Diseñar el sistema. Demostrar el cambio.',
        'journey.title':'Antes de construir sistemas, aprendí lo que tienen que resistir.',
        'journey.intro':'Retail me enseñó personas. Materiales me enseñó flujo. Manufactura me enseñó restricciones. La tecnología empresarial me dio las herramientas para conectarlo todo.',
        'journey.coppel.title':'Personas antes que procesos.',
        'journey.coppel.copy':'En retail cada decisión se hacía visible de inmediato: un cliente tenía una necesidad, un equipo requería dirección, el inventario tenía límites y la respuesta todavía debía tener sentido para el negocio. Aprendí a entender a la persona antes de intentar optimizar el proceso.',
        'journey.coppel.signal':'Escuchar antes de diseñar.',
        'journey.phoenix.title':'Flujo antes que optimización.',
        'journey.phoenix.copy':'El almacén me mostró que el desempeño rara vez depende de una sola tarea. Recepción, PEPS, inventario, reabastecimiento y personas funcionan como un sistema, y una mala transferencia puede frenar todo lo que viene después.',
        'journey.phoenix.signal':'Optimizar el flujo, no la tarea aislada.',
        'journey.mueblerias.title':'Realidad antes que elegancia.',
        'journey.mueblerias.copy':'El trabajo CNC obligaba a las ideas a enfrentarse con material, costo, dimensiones, desperdicio y tiempo de producción. Un diseño podía verse perfecto en pantalla y aun así fallar en taller. Aprendí a valorar las soluciones por su capacidad de sobrevivir restricciones reales.',
        'journey.mueblerias.signal':'Las buenas soluciones sobreviven restricciones reales.',
        'journey.mls.title':'Sistemas que conectan el panorama completo.',
        'journey.mls.copy':'En ml&s, las lecciones anteriores finalmente se convirtieron en bloques técnicos. SAP, Python, Power Platform y las herramientas de datos me permitieron transformar fricción recurrente en validación, automatización, trazabilidad y visibilidad compartida.',
        'journey.mls.signal':'Hacer visible la complejidad y después volverla repetible.',
        'systems.overline':'DE FRICCIÓN A SISTEMA',
        'systems.title':'Cuando la fricción se repite, busco el sistema que se esconde detrás.',
        'systems.intro':'Estos casos muestran el mismo patrón en distintas escalas: hacer visible el problema, estructurar lo importante, automatizar lo que debe ser repetible y dejar a las personas con una decisión más clara. Las interfaces son ilustrativas; los resultados son reales.',
        'systems.sap.copy':'Lo que parecía captura repetitiva en SAP era en realidad un problema de control: el flujo dependía de información completa y una ejecución consistente. Moví la validación al inicio y después automaticé la secuencia repetible de MM01/MM02.',
        'systems.audit.copy':'Lo que parecía revisión documental era en realidad un problema de mapeo de evidencia. Replanteé carpetas y archivos fragmentados como un flujo estructurado que clasifica, cruza información y hace visibles las excepciones.',
        'systems.power.copy':'Lo que parecía seguimiento por correo era en realidad un problema de visibilidad. Centralicé documentación, roles y estatus para que Compras y Logística trabajaran desde un mismo registro operativo en lugar de reconstruir contexto desde mensajes.',
        'systems.lab.copy':'Un sistema académico más pequeño construido con el mismo principio: traducir reglas operativas a software. La aplicación convierte roles de acceso, registro de alumnos y requisitos de validación en un flujo persistente respaldado por Oracle.',
        'cap.title':'Un stack solo es útil cuando puede cambiar el trabajo.',
        'next.title':'El siguiente capítulo es escalar.',
        'next.copy':'Estoy listo para llevar esta perspectiva operativa a roles de SAP, tecnología empresarial, transformación de procesos y tecnología de cara al cliente en Europa.'
      }
    };

    const metricCopy = {
      en:{overline:'MEASURED CHANGE',title:'When the outcome can be measured, I measure it.',copy:'Four signals of scale and change from the systems below — enough to show what moved without turning the story into a dashboard.',sap:'less execution time in a selected recurring workflow',sapNote:'Derived from ~90 min → ~10 min',audit:'manual review time per record before automation',auditNote:'Document-heavy records vary by complexity',power:'users supported by the shared workflow',powerNote:'Procurement + Logistics visibility',lab:'administrator roles modeled in the public system',labNote:'Role-aware access and validation'},
      es:{overline:'CAMBIO MEDIDO',title:'Cuando el resultado puede medirse, lo mido.',copy:'Cuatro señales de escala y cambio de los sistemas que aparecen abajo: suficientes para mostrar qué cambió sin convertir la historia en un dashboard.',sap:'menos tiempo de ejecución en un flujo recurrente seleccionado',sapNote:'Derivado de ~90 min → ~10 min',audit:'tiempo de revisión manual por expediente antes de automatizar',auditNote:'Los expedientes varían según su complejidad',power:'usuarios soportados por el flujo compartido',powerNote:'Visibilidad entre Compras + Logística',lab:'roles administrativos modelados en el sistema público',labNote:'Acceso por roles y validación'}
    };

    const style = document.createElement('style');
    style.textContent = `.impact-ledger{position:relative;margin:38px 0 34px;padding:29px 0 30px;border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden}.impact-ledger:before{content:"";position:absolute;top:-1px;left:-24%;width:22%;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:0;filter:drop-shadow(0 0 8px rgba(56,189,248,.55))}.impact-ledger.is-counting:before{opacity:.9;animation:impactScan 2.2s cubic-bezier(.22,1,.36,1) forwards}@keyframes impactScan{to{left:104%}}.impact-ledger__intro{display:grid;grid-template-columns:.72fr 1.4fr 1fr;gap:34px;align-items:end;margin-bottom:28px}.impact-ledger__intro h3{margin:0;font-family:var(--serif);font-size:clamp(31px,3.3vw,44px);font-weight:600;line-height:1.02;letter-spacing:-.03em}.impact-ledger__intro p{margin:0;color:var(--muted);font-size:12px;line-height:1.7}.impact-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--border)}.impact-metric{position:relative;min-height:190px;padding:23px 24px 20px 0;border-right:1px solid var(--border);opacity:.55;transform:translateY(10px);transition:opacity .48s cubic-bezier(.22,1,.36,1) var(--metric-delay),transform .48s cubic-bezier(.22,1,.36,1) var(--metric-delay),background-color .2s ease}.impact-metric:not(:first-child){padding-left:24px}.impact-metric:last-child{border-right:0}.impact-ledger.is-counting .impact-metric{opacity:1;transform:none}.impact-metric:after{content:"";position:absolute;left:0;bottom:0;width:0;height:1px;background:linear-gradient(90deg,var(--blue),var(--cyan));transition:width .68s cubic-bezier(.22,1,.36,1) calc(var(--metric-delay) + 240ms)}.impact-ledger.is-counting .impact-metric:after{width:58px}.impact-project{display:block;color:var(--soft);font-size:9px;font-weight:700;letter-spacing:.12em}.impact-metric>strong{display:flex;align-items:baseline;gap:4px;margin-top:16px;font-family:var(--serif);font-size:clamp(48px,5.4vw,68px);font-weight:600;line-height:.9;letter-spacing:-.05em;color:var(--text);font-variant-numeric:tabular-nums}.impact-metric>strong i{font-family:var(--sans);font-size:.34em;font-style:normal;color:var(--cyan);margin:0 1px;transform:translateY(-4px)}.impact-metric p{min-height:40px;margin:14px 0 0;color:var(--muted);font-size:12px;line-height:1.55}.impact-metric small{display:block;margin-top:8px;color:var(--soft);font-size:9px;line-height:1.5}.impact-range{white-space:nowrap}@media(hover:hover) and (pointer:fine){.impact-metric:hover{background:linear-gradient(180deg,var(--cyan-soft),transparent 68%)}}@media(max-width:900px){.impact-ledger__intro{grid-template-columns:1fr 1.6fr}.impact-ledger__intro>p{grid-column:2}.impact-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.impact-metric{border-bottom:1px solid var(--border)}.impact-metric:nth-child(2){border-right:0}.impact-metric:nth-child(3),.impact-metric:nth-child(4){border-bottom:0}.impact-metric:nth-child(3){padding-left:0}}@media(max-width:560px){.impact-ledger__intro{grid-template-columns:1fr;gap:12px}.impact-ledger__intro>p{grid-column:auto}.impact-ledger__intro h3{font-size:36px}.impact-metrics{grid-template-columns:1fr}.impact-metric,.impact-metric:not(:first-child){min-height:158px;padding:20px 0;border-right:0;border-bottom:1px solid var(--border)}.impact-metric:last-child{border-bottom:0}.impact-metric>strong{font-size:58px}}@media(prefers-reduced-motion:reduce){.impact-ledger:before{display:none}.impact-metric{opacity:1;transform:none}}`;
    document.head.appendChild(style);

    const stats = document.createElement('section');
    stats.className = 'impact-ledger reveal';
    stats.id = 'impactLedger';
    stats.innerHTML = `<div class="impact-ledger__intro"><span class="chapter-overline" data-metric="overline"></span><h3 data-metric="title"></h3><p data-metric="copy"></p></div><div class="impact-metrics"><article class="impact-metric" style="--metric-delay:0ms"><span class="impact-project">SAP MATERIAL MASTER</span><strong><span class="countup" data-count="89" data-suffix="%">0</span></strong><p data-metric="sap"></p><small data-metric="sapNote"></small></article><article class="impact-metric" style="--metric-delay:90ms"><span class="impact-project">CUSTOMS RECORDS</span><strong class="impact-range"><span class="countup" data-count="10">0</span><i>–</i><span class="countup" data-count="30" data-suffix=" min">0</span></strong><p data-metric="audit"></p><small data-metric="auditNote"></small></article><article class="impact-metric" style="--metric-delay:180ms"><span class="impact-project">POWER PLATFORM</span><strong><span class="countup" data-count="30" data-prefix="~">0</span></strong><p data-metric="power"></p><small data-metric="powerNote"></small></article><article class="impact-metric" style="--metric-delay:270ms"><span class="impact-project">LAB SYSTEM</span><strong><span class="countup" data-count="2">0</span></strong><p data-metric="lab"></p><small data-metric="labNote"></small></article></div>`;
    const firstSystem = document.querySelector('.system-story');
    firstSystem?.parentNode.insertBefore(stats, firstSystem);

    function applyNarrative(){
      const lang = root.lang === 'es' ? 'es' : 'en';
      Object.entries(narrative[lang]).forEach(([key,value])=>{const node=document.querySelector(`[data-i18n="${key}"]`);if(node)node.textContent=value});
      stats.querySelectorAll('[data-metric]').forEach(node=>{node.textContent=metricCopy[lang][node.dataset.metric]||''});
    }
    applyNarrative();
    document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>requestAnimationFrame(applyNarrative)));

    const render=(node,value)=>{node.textContent=`${node.dataset.prefix||''}${Math.round(value)}${node.dataset.suffix||''}`};
    const animate=(node,delay)=>{if(node.dataset.counted)return;node.dataset.counted='1';const target=Number(node.dataset.count||0);if(reduced){render(node,target);return}setTimeout(()=>{const start=performance.now();const duration=1250;const tick=now=>{const t=Math.min(1,(now-start)/duration);render(node,target*(1-Math.pow(1-t,4)));if(t<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)},delay)};
    const counts=[...stats.querySelectorAll('.countup')];
    if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;stats.classList.add('is-visible','is-counting');counts.forEach((n,i)=>animate(n,i*75));io.disconnect()},{threshold:.32,rootMargin:'0px 0px -8% 0px'});io.observe(stats)}else{stats.classList.add('is-visible','is-counting');counts.forEach((n,i)=>animate(n,i*75))}
  };
  document.head.appendChild(base);
})();
