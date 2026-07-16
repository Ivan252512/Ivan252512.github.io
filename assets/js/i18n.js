/* Bilingual (EN/ES) content switch — selector-based, no build step */
(function () {
  "use strict";

  var ROLES = {
    en: ["Software Engineer", "AI Engineer", "Full Stack Developer", "Backend Architect", "LLM / RAG Developer", "AWS Cloud Engineer"],
    es: ["Ingeniero de Software", "AI Engineer", "Desarrollador Full Stack", "Arquitecto Backend", "Desarrollador LLM / RAG", "Ingeniero Cloud AWS"]
  };

  var CV = {
    en: "/assets/cv/Carlos_Ivan_Pineda_Santiago_CV_FullStack_EN.pdf",
    es: "/assets/cv/Carlos_Ivan_Pineda_Santiago_CV_FullStack_ES.pdf"
  };

  // section-title helper
  function sec(word) { return '<span class="sq">▹</span> ' + word + '<span class="blink">_</span>'; }

  var CODE_EN =
'<span class="c-key">const</span> <span class="c-var">engineer</span> = {\n' +
'  <span class="c-prop">name</span>:     <span class="c-str">"Carlos Iván Pineda Santiago"</span>,\n' +
'  <span class="c-prop">role</span>:     <span class="c-str">"Software Engineer &amp; AI Engineer"</span>,\n' +
'  <span class="c-prop">experience</span>: <span class="c-str">"5+ years"</span>,\n' +
'  <span class="c-prop">focus</span>:    [<span class="c-str">"Backend"</span>, <span class="c-str">"AWS"</span>, <span class="c-str">"AI / LLMs"</span>, <span class="c-str">"RAG"</span>, <span class="c-str">"Automation"</span>],\n' +
'  <span class="c-prop">sectors</span>:  [<span class="c-str">"Fintech"</span>, <span class="c-str">"Banking"</span>, <span class="c-str">"Real Estate"</span>],\n' +
'};';

  var CODE_ES =
'<span class="c-key">const</span> <span class="c-var">engineer</span> = {\n' +
'  <span class="c-prop">name</span>:     <span class="c-str">"Carlos Iván Pineda Santiago"</span>,\n' +
'  <span class="c-prop">role</span>:     <span class="c-str">"Ingeniero de Software y AI Engineer"</span>,\n' +
'  <span class="c-prop">experience</span>: <span class="c-str">"5+ años"</span>,\n' +
'  <span class="c-prop">focus</span>:    [<span class="c-str">"Backend"</span>, <span class="c-str">"AWS"</span>, <span class="c-str">"AI / LLMs"</span>, <span class="c-str">"RAG"</span>, <span class="c-str">"Automatización"</span>],\n' +
'  <span class="c-prop">sectors</span>:  [<span class="c-str">"Fintech"</span>, <span class="c-str">"Banca"</span>, <span class="c-str">"Bienes Raíces"</span>],\n' +
'};';

  // [selector, EN html, ES html]
  var T = [
    // nav
    ['#nav-links a[href="#about"]', "// about", "// sobre-mí"],
    ['#nav-links a[href="#skills"]', "// skills", "// habilidades"],
    ['#nav-links a[href="#experience"]', "// experience", "// experiencia"],
    ['#nav-links a[href="#education"]', "// education", "// educación"],
    ['#nav-links a[href="#contact"]', "// contact", "// contacto"],
    ['.nav-resume', "résumé.pdf", "cv.pdf"],
    ['#nav-toggle', "[ menu ]", "[ menú ]"],

    // section titles
    ['#about .section-title', sec("about"), sec("sobre-mí")],
    ['#skills .section-title', sec("skills"), sec("habilidades")],
    ['#experience .section-title', sec("experience"), sec("experiencia")],
    ['#education .section-title', sec("education"), sec("educación")],
    ['#contact .section-title', sec("contact"), sec("contacto")],
    ['#education .subsection', "> certifications", "> certificaciones"],

    // hero
    ['#hero .subtitle',
      '<span class="hl">Software Engineer &amp; AI Engineer</span> with 5+ years building scalable backend services and web apps in Python, NodeJS &amp; C# on <span class="hl">AWS</span>, across Fintech, Banking and PropTech. I build <span class="hl">AI-powered applications</span> — LLM integrations with <span class="hl">Claude</span>, <span class="hl">RAG</span> pipelines and workflow automation with <span class="hl">n8n</span> — taking products from design to production.',
      '<span class="hl">Ingeniero de Software y AI Engineer</span> con más de 5 años construyendo servicios backend y aplicaciones web escalables en Python, NodeJS y C# sobre <span class="hl">AWS</span>, en Fintech, Banca y PropTech. Construyo <span class="hl">aplicaciones potenciadas con IA</span> — integraciones LLM con <span class="hl">Claude</span>, pipelines de <span class="hl">RAG</span> y automatización de flujos con <span class="hl">n8n</span> — llevando los productos del diseño a producción.'],
    ['#hero .hero-actions a[href="#contact"]', "$ ./contact_me", "$ ./contáctame"],

    // about
    ['#about .code-block', CODE_EN, CODE_ES],
    ['#about .about-p',
      'I design and operate reliable backend services, APIs and data pipelines, mostly in the <span class="hl">financial</span> and <span class="hl">real-estate</span> sectors. Lately I focus on <span class="hl">AI engineering</span>: building <span class="hl">LLM-powered apps</span> and agents with Claude, <span class="hl">RAG</span> over private data, and workflow <span class="hl">automation</span> with n8n — turning ideas into production-grade products.',
      'Diseño y opero servicios backend, APIs y pipelines de datos confiables, principalmente en los sectores <span class="hl">financiero</span> e <span class="hl">inmobiliario</span>. Últimamente me enfoco en <span class="hl">AI engineering</span>: construyo <span class="hl">apps con LLMs</span> y agentes con Claude, <span class="hl">RAG</span> sobre datos privados, y <span class="hl">automatización</span> de flujos con n8n — convirtiendo ideas en productos listos para producción.'],

    // skills cards
    ['#skills .cards .card:nth-child(1) .card-title', "> Backend &amp; Full Stack Development", "> Desarrollo Backend y Full Stack"],
    ['#skills .cards .card:nth-child(1) .card-list',
      '<li>Building RESTful APIs and backend services using Python and NodeJS, with clean, maintainable architecture.</li><li>Responsive web frontends with JavaScript and modern frameworks for internal tools and customer-facing apps.</li><li>Integrating external services, financial APIs and data sources into production applications.</li>',
      '<li>APIs REST y servicios backend en Python y NodeJS, con arquitectura limpia y mantenible.</li><li>Frontends web responsivos con JavaScript y frameworks modernos para herramientas internas y apps de cara al cliente.</li><li>Integración de servicios externos, APIs financieras y fuentes de datos en aplicaciones productivas.</li>'],
    ['#skills .cards .card:nth-child(2) .card-title', "> AI Engineering &amp; Automation", "> AI Engineering y Automatización"],
    ['#skills .cards .card:nth-child(2) .card-list',
      '<li>Building LLM-powered apps and agents with <strong>Claude</strong> and GPT — prompt engineering, tool/function calling and structured outputs.</li><li><strong>RAG</strong> pipelines over private data: chunking, embeddings and vector search to ground answers in real context.</li><li>Workflow automation and integrations with <strong>n8n</strong>, wiring APIs, LLMs and business tools into end-to-end flows.</li>',
      '<li>Apps y agentes potenciados con LLMs usando <strong>Claude</strong> y GPT — prompt engineering, tool/function calling y salidas estructuradas.</li><li>Pipelines de <strong>RAG</strong> sobre datos privados: chunking, embeddings y búsqueda vectorial para respuestas fundamentadas en contexto real.</li><li>Automatización de flujos e integraciones con <strong>n8n</strong>, conectando APIs, LLMs y herramientas de negocio de punta a punta.</li>'],
    ['#skills .cards .card:nth-child(3) .card-title', "> Data Science &amp; Machine Learning", "> Ciencia de Datos y Machine Learning"],
    ['#skills .cards .card:nth-child(3) .card-list',
      '<li>Building and evaluating supervised &amp; unsupervised models — Random Forest, XGBoost, K-Means and neural networks — for pattern detection and signal generation.</li><li>End-to-end workflow: data cleaning, exploratory analysis, feature engineering, model optimization and clear communication of results.</li><li>Certified in Data Science &amp; Machine Learning by MIT and UNAM; applied ML in production systems.</li>',
      '<li>Construcción y evaluación de modelos supervisados y no supervisados — Random Forest, XGBoost, K-Means y redes neuronales — para detección de patrones.</li><li>Flujo completo: limpieza de datos, análisis exploratorio, feature engineering, optimización de modelos y comunicación clara de resultados.</li><li>Certificado en Ciencia de Datos y Machine Learning por MIT y la UNAM; ML aplicado en sistemas productivos.</li>'],
    ['#skills .cards .card:nth-child(4) .card-title', "> Cloud Infrastructure &amp; Data Platforms", "> Infraestructura Cloud y Plataformas de Datos"],
    ['#skills .cards .card:nth-child(4) .card-list',
      '<li>Deploy, operate and monitor backend services on AWS using managed services for reliability and scale.</li><li>Applications with integrated relational and NoSQL databases for transactional and analytics workloads.</li><li>Data flows and streaming jobs on AWS enabling event-driven architectures and real-time processing.</li>',
      '<li>Despliegue, operación y monitoreo de servicios backend en AWS usando servicios administrados para confiabilidad y escala.</li><li>Aplicaciones con bases de datos relacionales y NoSQL integradas para cargas transaccionales y de analítica.</li><li>Flujos de datos y jobs de streaming en AWS para arquitecturas orientadas a eventos y procesamiento en tiempo real.</li>'],

    // experience
    ['#experience .tl-item:nth-child(1) .tl-date', "October 2024 — Current", "Octubre 2024 — Actualidad"],
    ['#experience .tl-item:nth-child(1) h3', 'Backend Developer <span class="tl-at">@ Konfío</span>', 'Desarrollador Backend <span class="tl-at">@ Konfío</span>'],
    ['#experience .tl-item:nth-child(1) p', "Backend development for banking products using Python and NodeJS on AWS, contributing to data-intensive financial services.", "Desarrollo backend para productos bancarios usando Python y NodeJS sobre AWS, contribuyendo a servicios financieros intensivos en datos."],
    ['#experience .tl-item:nth-child(1) .tl-loc', "Mexico City, Mexico", "Ciudad de México, México"],

    ['#experience .tl-item:nth-child(2) .tl-date', "May 2022 — September 2024", "Mayo 2022 — Septiembre 2024"],
    ['#experience .tl-item:nth-child(2) h3', 'Full Stack Developer <span class="tl-at">@ GBM</span>', 'Desarrollador Full Stack <span class="tl-at">@ GBM</span>'],
    ['#experience .tl-item:nth-child(2) p', "Developed services in Python, NodeJS and C# for trading and investment platforms, and integrated market data &amp; time series into APIs used by internal tools and dashboards.", "Desarrollé servicios en Python, NodeJS y C# para plataformas de trading e inversión, e integré datos de mercado y series de tiempo en APIs usadas por herramientas internas y dashboards."],
    ['#experience .tl-item:nth-child(2) .tl-loc', "Mexico City, Mexico", "Ciudad de México, México"],

    ['#experience .tl-item:nth-child(3) .tl-date', "Nov 2021 — May 2022", "Noviembre 2021 — Mayo 2022"],
    ['#experience .tl-item:nth-child(3) h3', 'Full Stack Developer <span class="tl-at">@ Tuhabi</span>', 'Desarrollador Full Stack <span class="tl-at">@ Tuhabi</span>'],
    ['#experience .tl-item:nth-child(3) p', "Implemented backend services in Python (Django) and NodeJS on AWS for the real-estate market, working with large property datasets and integrations.", "Implementé servicios backend en Python (Django) y NodeJS sobre AWS para el sector inmobiliario, trabajando con grandes conjuntos de datos de propiedades e integraciones."],
    ['#experience .tl-item:nth-child(3) .tl-loc', "Mexico City, Mexico", "Ciudad de México, México"],

    ['#experience .tl-item:nth-child(4) .tl-date', "Mar 2020 — Nov 2021", "Marzo 2020 — Nov 2021"],
    ['#experience .tl-item:nth-child(4) h3', 'AWS Cloud Engineer <span class="tl-at">@ Codster</span>', 'Ingeniero Cloud AWS <span class="tl-at">@ Codster</span>'],
    ['#experience .tl-item:nth-child(4) p', "Delivered custom backend solutions for various clients in Python, Django, Flask and NodeJS on AWS Cloud — Elastic Beanstalk and Lambda functions.", "Entregué soluciones backend a la medida para diversos clientes en Python, Django, Flask y NodeJS sobre AWS Cloud — Elastic Beanstalk y funciones Lambda."],
    ['#experience .tl-item:nth-child(4) .tl-loc', "Mexico City, Mexico", "Ciudad de México, México"],

    // education
    ['#education .cards .card:nth-child(1) .edu-sub', "B.Sc. Earth Sciences, Space Sciences · 2015–2019", "Lic. en Ciencias de la Tierra (Ciencias Espaciales) · 2015–2019"],
    ['#education .cards .card:nth-child(1) .card-list',
      '<li>Earth and Space Sciences with a strong mathematical and physical background.</li><li>Calculus, Statistics, Algebra and Physics supporting quantitative analysis.</li><li>Social service at IIMAS working on evolutionary programming.</li>',
      '<li>Ciencias de la Tierra y del Espacio con una fuerte base matemática y física.</li><li>Cálculo, Estadística, Álgebra y Física como apoyo al análisis cuantitativo.</li><li>Servicio social en el IIMAS trabajando en programación evolutiva.</li>'],
    ['#education .cards .card:nth-child(2) .edu-sub', "B.Eng. Computer Systems · 2016–2020", "Ing. en Sistemas Computacionales · 2016–2020"],
    ['#education .cards .card:nth-child(2) .card-list',
      '<li>Core software engineering: Algorithms, Databases, Operating Systems and OOP.</li><li>Courses on Blockchain, Data Science, Cloud Computing and Full Stack.</li><li>Intermediate specialization in high-performance computing with Python.</li>',
      '<li>Ingeniería de software base: Algoritmos, Bases de Datos, Sistemas Operativos y POO.</li><li>Cursos de Blockchain, Ciencia de Datos, Cómputo en la Nube y Full Stack.</li><li>Especialización intermedia en cómputo de alto rendimiento con Python.</li>'],
    ['#education .certs .cert:nth-child(1) strong', "Data Science &amp; Machine Learning: Making Data-Driven Decisions", "Ciencia de Datos y Machine Learning: Toma de Decisiones Basada en Datos"],
    ['#education .certs .cert:nth-child(2) strong', "Analytical Introduction to Data Science", "Introducción Analítica a la Ciencia de Datos"],

    // contact
    ['#contact .subtitle',
      "Available on most platforms — I usually reply within 24 hours. Happy to help with Python, backend development, APIs, cloud architectures and AI/data-oriented projects.",
      "Disponible en la mayoría de plataformas — normalmente respondo en menos de 24 horas. Con gusto ayudo con Python, desarrollo backend, APIs, arquitecturas cloud y proyectos con IA y datos."]
  ];

  function getLang() {
    try {
      var s = localStorage.getItem("lang");
      if (s === "en" || s === "es") return s;
    } catch (e) {}
    return (navigator.language || "en").toLowerCase().indexOf("es") === 0 ? "es" : "en";
  }

  var lang = getLang();

  function apply(l) {
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    document.documentElement.lang = l;
    var idx = l === "es" ? 2 : 1;
    for (var i = 0; i < T.length; i++) {
      var el = document.querySelector(T[i][0]);
      if (el) el.innerHTML = T[i][idx];
    }
    var r = document.querySelector(".nav-resume");
    if (r) r.setAttribute("href", CV[l]);
    var btns = document.querySelectorAll(".lang-btn");
    for (var b = 0; b < btns.length; b++) {
      btns[b].classList.toggle("active", btns[b].getAttribute("data-lang") === l);
    }
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang: l } }));
  }

  window.I18N = {
    get lang() { return lang; },
    roles: function () { return ROLES[lang]; },
    apply: apply
  };

  var btns = document.querySelectorAll(".lang-btn");
  for (var b = 0; b < btns.length; b++) {
    (function (btn) {
      btn.addEventListener("click", function () { apply(btn.getAttribute("data-lang")); });
    })(btns[b]);
  }

  apply(lang);
})();
