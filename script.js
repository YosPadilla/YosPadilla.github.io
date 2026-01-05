// script.js
(() => {
  // Year update
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Scroll Reveal Observer
  const revealEls = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // --- LOGIC SCROLL PROGRESS BAR ---
  const scrollBar = document.getElementById('scrollBar');
  const scrollText = document.getElementById('scrollText');

  const updateScrollUI = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (scrollBar) scrollBar.style.height = `${scrollPercent}%`;
    if (scrollText) scrollText.textContent = `${Math.round(scrollPercent)}%`;
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  // Spotlight Effect for Project Cards
  const spotlightCards = document.querySelectorAll(".projectCard");
  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // Mobile Menu
  const burger = document.querySelector(".burger");
  const mobileNav = document.getElementById("mobileNav");
  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  // Typewriter Effect
  const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = JSON.parse(words);
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  };
  TypeWriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = this.txt;

    let typeSpeed = 100;
    if (this.isDeleting) typeSpeed /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  };

  const txtElement = document.querySelector('.txt-type');
  if (txtElement) {
    new TypeWriter(txtElement, txtElement.getAttribute('data-words'), txtElement.getAttribute('data-wait'));
  }

  // ===== LIGHTBOX PRO =====
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("lightboxImg");
  const modalClose = document.getElementById("closeModal");
  const modalPrev = document.getElementById("lightboxPrev");
  const modalNext = document.getElementById("lightboxNext");
  const modalCount = document.getElementById("lightboxCount");
  const modalMeta = document.getElementById("lightboxMeta");
  const modalCaption = document.getElementById("lightboxCaption");

  let activeImages = [];
  let activeIndex = 0;
  let activeTitle = "Galería";

  const renderLightbox = () => {
    if (!modal || !modalImg) return;
    if (!activeImages.length) return;

    if (activeIndex < 0) activeIndex = activeImages.length - 1;
    if (activeIndex >= activeImages.length) activeIndex = 0;

    modalImg.src = activeImages[activeIndex];

    if (modalCount) modalCount.textContent = `${activeIndex + 1} / ${activeImages.length}`;
    if (modalMeta) modalMeta.textContent = activeTitle || "Galería";
    if (modalCaption) modalCaption.textContent = "Esc para cerrar • ← → para navegar";

    const disableNav = activeImages.length <= 1;
    if (modalPrev) modalPrev.disabled = disableNav;
    if (modalNext) modalNext.disabled = disableNav;
  };

  const openLightbox = (images, title, startIndex = 0) => {
    if (!modal || !modalImg) return;
    activeImages = images;
    activeTitle = title || "Galería";
    activeIndex = startIndex;

    renderLightbox();
    modal.showModal();
  };

  const closeModal = () => { if (modal) modal.close(); };

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modalPrev) modalPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    activeIndex--;
    renderLightbox();
  });

  if (modalNext) modalNext.addEventListener("click", (e) => {
    e.stopPropagation();
    activeIndex++;
    renderLightbox();
  });

  if (modal) {
    // Click en backdrop (fuera del contenido) cierra
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Teclado: flechas + escape
    document.addEventListener("keydown", (e) => {
      if (!modal.open) return;

      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key === "ArrowLeft") {
        activeIndex--;
        renderLightbox();
      }
      if (e.key === "ArrowRight") {
        activeIndex++;
        renderLightbox();
      }
    });
  }

  // ===== GALLERY LOGIC (cards) =====
  const cards = document.querySelectorAll("[data-project][data-images]");
  cards.forEach((card) => {
    const raw = card.getAttribute("data-images") || "";
    const title = card.getAttribute("data-title") || "Galería";
    const images = raw.split(",").map(s => s.trim()).filter(Boolean);
    if (!images.length) return;

    const imgEl = card.querySelector(".projImg");
    const countEl = card.querySelector(".projCount");
    const dotsWrap = card.querySelector(".projDots");
    const prevBtn = card.querySelector(".projArrow--prev");
    const nextBtn = card.querySelector(".projArrow--next");
    let idx = 0;

    // Dots
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      images.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "dot" + (i === 0 ? " dot--active" : "");
        b.setAttribute("aria-label", `Ir a imagen ${i + 1}`);
        b.addEventListener("click", (e) => { e.stopPropagation(); idx = i; render(); });
        dotsWrap.appendChild(b);
      });
    }

    const getDots = () => Array.from(card.querySelectorAll(".dot"));

    const render = () => {
      if (idx < 0) idx = images.length - 1;
      if (idx >= images.length) idx = 0;

      if (imgEl) imgEl.src = images[idx];
      if (countEl) countEl.textContent = `${idx + 1} / ${images.length}`;

      const dots = getDots();
      dots.forEach((d, i) => d.classList.toggle("dot--active", i === idx));
    };

    if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); idx++; render(); });
    if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); idx--; render(); });

    // Lightbox trigger (solo imagen, flechas solo cambian imagen)
    if (imgEl) {
      imgEl.addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox(images, title, idx);
      });
    }

    render();
  });

  // ===== SCROLLSPY (Nav activo) =====
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const mobileLinks = Array.from(document.querySelectorAll('#mobileNav a[href^="#"]'));

  const allLinks = [...navLinks, ...mobileLinks];

  const idToLinks = new Map();
  allLinks.forEach(a => {
    const id = (a.getAttribute("href") || "").replace("#", "");
    if (!id) return;
    if (!idToLinks.has(id)) idToLinks.set(id, []);
    idToLinks.get(id).push(a);
  });

  const sections = Array.from(idToLinks.keys())
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const setActive = (id) => {
    // Desktop nav
    navLinks.forEach(a => a.classList.toggle("nav__link--active", (a.getAttribute("href") === `#${id}`)));

    // Mobile nav
    mobileLinks.forEach(a => a.classList.toggle("active", (a.getAttribute("href") === `#${id}`)));
  };

  if (sections.length) {
    const spy = new IntersectionObserver((entries) => {
      // elegimos el que más “domina” la vista
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target && visible.target.id) {
        setActive(visible.target.id);
      }
    }, {
      root: null,
      threshold: [0.2, 0.35, 0.5, 0.65],
      rootMargin: "-25% 0px -55% 0px"
    });

    sections.forEach(sec => spy.observe(sec));

      // ===== BLOQUE 2: FILTROS =====
  const filterBtns = Array.from(document.querySelectorAll(".filterBtn[data-filter]"));
  const projectCards = Array.from(document.querySelectorAll(".projectCard[data-cats]"));
  const filterCount = document.getElementById("filterCount");

  const applyFilter = (filter) => {
    let shown = 0;

    projectCards.forEach(card => {
      const cats = (card.getAttribute("data-cats") || "").split(/\s+/).filter(Boolean);
      const match = (filter === "all") ? true : cats.includes(filter);

      card.classList.toggle("is-hidden", !match);
      if (match) shown++;
    });

    if (filterCount) {
      const total = projectCards.length;
      filterCount.textContent = `${shown} de ${total} mostrados`;
    }
  };

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        const f = btn.getAttribute("data-filter") || "all";
        applyFilter(f);
      });
    });

    // Init
    applyFilter("all");
  }

  // ===== BLOQUE 2: CASE STUDY TOGGLE =====
  const caseButtons = Array.from(document.querySelectorAll(".projectCard .caseBtn"));
  caseButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".projectCard");
      if (!card) return;

      const panel = card.querySelector(".casePanel");
      const open = card.classList.contains("is-open");

      // Cierra otros (para que no sea acordeón infernal)
      document.querySelectorAll(".projectCard.is-open").forEach(other => {
        if (other !== card) {
          other.classList.remove("is-open");
          const otherBtn = other.querySelector(".caseBtn");
          const otherPanel = other.querySelector(".casePanel");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherPanel) otherPanel.hidden = true;
        }
      });

      card.classList.toggle("is-open", !open);
      btn.setAttribute("aria-expanded", String(!open));
      if (panel) panel.hidden = open;

      if (!open) {
        // Pequeño scroll para que el usuario vea el panel abierto
        setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      }
    });
  });
    // ===== BLOQUE 3: MODAL CERTIFICADOS =====
  const certModal = document.getElementById("certModal");
  const certClose = document.getElementById("certClose");
  const certFrame = document.getElementById("certFrame");
  const certModalTitle = document.getElementById("certModalTitle");
  const certModalMeta = document.getElementById("certModalMeta");
  const certModalVerify = document.getElementById("certModalVerify");

  const closeCertModal = () => {
    if (!certModal) return;
    certModal.close();
    if (certFrame) certFrame.src = ""; // limpia para evitar audio/recursos colgados
  };

  if (certClose) certClose.addEventListener("click", closeCertModal);
  if (certModal) {
    certModal.addEventListener("click", (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  const certCards = Array.from(document.querySelectorAll("[data-cert]"));
  certCards.forEach((card) => {
    // Spotlight suave reutilizando el mismo patrón de mouse
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });

    const viewBtn = card.querySelector(".certBtn--view");
    const verifyBtn = card.querySelector(".certBtn--verify");

    const title = card.getAttribute("data-title") || "Certificado";
    const provider = card.getAttribute("data-provider") || "Institución";
    const year = card.getAttribute("data-year") || "";
    const verify = card.getAttribute("data-verify") || "#";
    const file = card.getAttribute("data-file") || "";

    // Set verify link (aunque sea #, luego lo cambias)
    if (verifyBtn) verifyBtn.href = verify;

    if (viewBtn) {
      viewBtn.addEventListener("click", () => {
        if (!certModal || !certFrame) return;

        certModalTitle.textContent = title;
        certModalMeta.textContent = `${provider}${year ? " · " + year : ""}`;
        if (certModalVerify) certModalVerify.href = verify || "#";

        // Si no hay archivo, manda a verificar como fallback
        if (!file || file === "#") {
          if (verify && verify !== "#") window.open(verify, "_blank", "noreferrer");
          return;
        }

        certFrame.src = file;
        certModal.showModal();
      });
    }
  });
    // ===== BLOQUE 4: CONTACTO PRO (COPY + TOAST + FORM MAILTO) =====
  const toastEl = document.getElementById("toast");
  let toastTimer = null;

  const showToast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("toast--show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("toast--show"), 2400);
  };

  // Spotlight suave en tarjetas contacto (mismo vibe premium)
  document.querySelectorAll(".contactCard").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });

  // Copy buttons
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const val = btn.getAttribute("data-copy") || "";
      if (!val) return;

      try {
        await navigator.clipboard.writeText(val);
        showToast("Copiado ✅");
      } catch {
        // Fallback antiguo
        const tmp = document.createElement("textarea");
        tmp.value = val;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand("copy");
        tmp.remove();
        showToast("Copiado ✅");
      }
    });
  });

  // Prefill "mensaje rápido"
  const prefillBtn = document.getElementById("prefillBtn");
  if (prefillBtn) {
    prefillBtn.addEventListener("click", () => {
      const subject = document.getElementById("cfSubject");
      const msg = document.getElementById("cfMsg");
      if (subject && !subject.value) subject.value = "Oportunidad / Residencia";
      if (msg && !msg.value) {
        msg.value =
`Hola Yoshio,

Vi tu portafolio y me gustaría contactarte por una oportunidad.
Contexto:
- Empresa / Proyecto:
- Modalidad (Remoto/Presencial):
- Fechas o disponibilidad:
- Detalles adicionales:

Quedo atento(a).`;
      }
      showToast("Mensaje rápido cargado ✨");
    });
  }

  // Form mailto handler
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("cfName")?.value.trim() || "";
      const email = document.getElementById("cfEmail")?.value.trim() || "";
      const subject = document.getElementById("cfSubject")?.value.trim() || "";
      const message = document.getElementById("cfMsg")?.value.trim() || "";

      if (!name || !email || !subject || !message) {
        showToast("Completa todos los campos 🙏");
        return;
      }

      const to = "yoshio99@live.com.mx";
      const mailSubject = encodeURIComponent(`[Portafolio] ${subject}`);
      const body = encodeURIComponent(
`Nombre: ${name}
Correo: ${email}

Mensaje:
${message}`
      );

      const mailto = `mailto:${to}?subject=${mailSubject}&body=${body}`;
      showToast("Abriendo tu correo… 📩");

      // Algunos navegadores prefieren asignación directa
      window.location.href = mailto;
    });
  }
  }
})();
