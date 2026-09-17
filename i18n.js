// Bilingual toggle: swaps text via a small dictionary keyed by data-i18n
// attributes. Portuguese is the content already rendered in the HTML,
// so it doubles as the "pt" dictionary here — only English needs to be
// spelled out in full. The chosen language persists in localStorage.
(function () {
  var STORAGE_KEY = "rbc-portfolio-lang";

  var pt = {
    "skip.link": "Pular para o conteúdo",
    "nav.about": "about",
    "nav.skills": "skills",
    "nav.projects": "projects",
    "nav.certs": "certs",
    "nav.contact": "contact",
    "toggle.label": "EN",
    "hero.photoAlt": "Foto de Rodrigo Braz Carneiro",
    "hero.statusPill": "aberto a novas oportunidades",
    "hero.eyebrow": "portfólio · qa engineering",
    "hero.role": "QA Engineer · Analista de Testes<br>Automação com Cypress · Testes de API",
    "hero.desc": "Atuo com testes manuais, exploratórios, de regressão e automação E2E em produto SaaS omnichannel. Antes de migrar para QA, passei cerca de dois anos e meio como desenvolvedor backend — hoje isso molda como leio requisitos, arquitetura e comportamento de sistemas.",
    "hero.btnProjects": "Ver projetos",
    "terminal.ariaLabel": "Simulação de execução de testes Cypress listando as principais qualificações de Rodrigo",
    "term.cmd": "$ cypress run --spec \"rodrigo_braz_carneiro.spec.js\"",
    "term.line1": "atua como QA Engineer em produto SaaS omnichannel",
    "term.line2": "automação de testes E2E com Cypress + POM",
    "term.line3": "testes de API com Postman",
    "term.line4": "background como dev backend (Java/Kotlin)",
    "term.line5": "em preparação para certificação ISTQB CTFL",
    "term.passing": "5 passing",
    "about.label": "about.spec.js",
    "about.p1": "Sou QA Engineer com atuação em testes manuais, exploratórios, de regressão e automação com Cypress, além de validação de APIs. Trabalho hoje em um produto SaaS omnichannel, cobrindo o módulo de envio de mensagens via WhatsApp, SMS, e-mail e chat, integrado a funis de vendas.",
    "about.p2": "Antes de migrar para qualidade, atuei por cerca de dois anos e meio como desenvolvedor backend, incluindo projetos estratégicos para grandes empresas do setor bancário. Essa vivência técnica me dá uma leitura mais profunda de requisitos, arquitetura e comportamento de sistemas — o que aplico diretamente na forma como planejo e executo testes.",
    "about.p3": "Estou em preparação para a certificação ISTQB CTFL e em constante evolução em Robot Framework, CI/CD com GitHub Actions e Python.",
    "about.factLocLabel": "Localização",
    "about.factLocVal": "Ubatuba, SP — aberto a remoto/híbrido",
    "about.factRoleLabel": "Atuação atual",
    "about.factProgLabel": "Formação em curso",
    "about.factMentLabel": "Mentoria",
    "skills.label": "skills.spec.js",
    "skills.tTitle": "Testes",
    "skills.tItem1": "Testes Manuais",
    "skills.tItem2": "Testes Funcionais",
    "skills.tItem3": "Testes Exploratórios",
    "skills.tItem4": "Testes de Regressão",
    "skills.aTitle": "Automação &amp; API",
    "skills.lTitle": "Linguagens",
    "skills.pTitle": "Processo &amp; Gestão",
    "skills.pItem4": "Análise de Requisitos",
    "skills.cTitle": "Em evolução",
    "projects.label": "projects.spec.js",
    "projects.p1Desc": "Suite de testes E2E cobrindo Login, MyInfo, Add Employee e Employee List, estruturada com Page Object Model. Comando customizado <code>cy.login()</code>, mensagens centralizadas em <code>constants/messages.js</code> e dados de fixture passados como parâmetro para os Page Objects. Inclui coleção Postman com testes de API em múltiplos endpoints.",
    "projects.p1Link": "Ver repositório",
    "projects.p2Desc": "Desafio técnico para processo seletivo (ASC Brazil). Especificações de login (válido, inválido, campos vazios, e-mail inválido), busca de produtos e carrinho, além de specs de API (GET/POST). Uso de fixtures, comando customizado de login e relatórios em HTML.",
    "projects.p2Link": "Ver repositório",
    "certs.label": "certifications.spec.js",
    "certs.s1Status": "em andamento",
    "certs.s2Status": "concluído",
    "certs.s2Title": "Mentoria QA — Guardião da Qualidade",
    "certs.s3Status": "experiência prévia",
    "certs.s3Title": "Desenvolvedor Backend — Java/Kotlin",
    "contact.label": "contact.spec.js",
    "contact.lead": "Aberto a novas oportunidades como QA Engineer, Analista de Testes ou Analista de QA — remoto ou híbrido.",
    "doc.title": "Rodrigo Braz Carneiro — QA Engineer",
    "doc.description": "Portfólio de Rodrigo Braz Carneiro, QA Engineer especializado em automação de testes com Cypress e testes de API."
  };

  var en = {
    "skip.link": "Skip to content",
    "nav.about": "about",
    "nav.skills": "skills",
    "nav.projects": "projects",
    "nav.certs": "certs",
    "nav.contact": "contact",
    "toggle.label": "PT",
    "hero.photoAlt": "Photo of Rodrigo Braz Carneiro",
    "hero.statusPill": "open to new opportunities",
    "hero.eyebrow": "portfolio · qa engineering",
    "hero.role": "QA Engineer · Test Analyst<br>Cypress Automation · API Testing",
    "hero.desc": "I work with manual, exploratory, regression, and E2E automated testing on an omnichannel SaaS product. Before moving into QA, I spent about two and a half years as a backend developer — today that shapes how I read requirements, architecture, and system behavior.",
    "hero.btnProjects": "View projects",
    "terminal.ariaLabel": "Simulated Cypress test run listing Rodrigo's main qualifications",
    "term.cmd": "$ cypress run --spec \"rodrigo_braz_carneiro.spec.js\"",
    "term.line1": "works as a QA Engineer on an omnichannel SaaS product",
    "term.line2": "E2E test automation with Cypress + POM",
    "term.line3": "API testing with Postman",
    "term.line4": "backend dev background (Java/Kotlin)",
    "term.line5": "preparing for ISTQB CTFL certification",
    "term.passing": "5 passing",
    "about.label": "about.spec.js",
    "about.p1": "I'm a QA Engineer with experience in manual, exploratory, and regression testing, along with test automation using Cypress and API validation. I currently work on an omnichannel SaaS product, covering the messaging module across WhatsApp, SMS, email, and chat, integrated with sales funnels.",
    "about.p2": "Before moving into quality, I spent about two and a half years as a backend developer, including strategic projects for large companies in the banking sector. That technical background gives me a deeper read on requirements, architecture, and system behavior — which I apply directly to how I plan and execute tests.",
    "about.p3": "I'm currently preparing for the ISTQB CTFL certification and continuously growing my skills in Robot Framework, CI/CD with GitHub Actions, and Python.",
    "about.factLocLabel": "Location",
    "about.factLocVal": "Ubatuba, SP, Brazil — open to remote/hybrid",
    "about.factRoleLabel": "Current role",
    "about.factProgLabel": "In progress",
    "about.factMentLabel": "Mentorship",
    "skills.label": "skills.spec.js",
    "skills.tTitle": "Testing",
    "skills.tItem1": "Manual Testing",
    "skills.tItem2": "Functional Testing",
    "skills.tItem3": "Exploratory Testing",
    "skills.tItem4": "Regression Testing",
    "skills.aTitle": "Automation &amp; API",
    "skills.lTitle": "Languages",
    "skills.pTitle": "Process &amp; Management",
    "skills.pItem4": "Requirements Analysis",
    "skills.cTitle": "Currently learning",
    "projects.label": "projects.spec.js",
    "projects.p1Desc": "E2E test suite covering Login, MyInfo, Add Employee, and Employee List, structured with the Page Object Model. Custom <code>cy.login()</code> command, centralized messages in <code>constants/messages.js</code>, and fixture data passed as parameters to the Page Objects. Includes a Postman collection with API tests across multiple endpoints.",
    "projects.p1Link": "View repository",
    "projects.p2Desc": "Technical challenge for a hiring process (ASC Brazil). Login specs (valid, invalid, empty fields, invalid email), product search and cart specs, plus API specs (GET/POST). Uses fixtures, a custom login command, and HTML reporting.",
    "projects.p2Link": "View repository",
    "certs.label": "certifications.spec.js",
    "certs.s1Status": "in progress",
    "certs.s2Status": "completed",
    "certs.s2Title": "QA Mentorship — Guardião da Qualidade",
    "certs.s3Status": "prior experience",
    "certs.s3Title": "Backend Developer — Java/Kotlin",
    "contact.label": "contact.spec.js",
    "contact.lead": "Open to new opportunities as a QA Engineer, Test Analyst, or QA Analyst — remote or hybrid.",
    "doc.title": "Rodrigo Braz Carneiro — QA Engineer",
    "doc.description": "Portfolio of Rodrigo Braz Carneiro, QA Engineer specialized in test automation with Cypress and API testing."
  };

  var dictionaries = { pt: pt, en: en };
  var htmlLangAttr = { pt: "pt-BR", en: "en" };

  function applyLang(lang) {
    var dict = dictionaries[lang];
    if (!dict) return;

    document.documentElement.setAttribute("lang", htmlLangAttr[lang]);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr"); // e.g. "alt:hero.photoAlt"
      var parts = spec.split(":");
      var attrName = parts[0];
      var key = parts[1];
      if (dict[key] !== undefined) {
        el.setAttribute(attrName, dict[key]);
      }
    });

    var titleEl = document.getElementById("doc-title");
    if (titleEl && dict["doc.title"]) titleEl.textContent = dict["doc.title"];

    var descEl = document.getElementById("doc-description");
    if (descEl && dict["doc.description"]) descEl.setAttribute("content", dict["doc.description"]);

    var toggleBtn = document.getElementById("lang-toggle");
    if (toggleBtn) {
      var otherLang = lang === "pt" ? "en" : "pt";
      toggleBtn.textContent = dict["toggle.label"];
      toggleBtn.setAttribute(
        "aria-label",
        otherLang === "en" ? "Switch language to English" : "Mudar idioma para português"
      );
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // localStorage unavailable (private browsing, etc.) — toggle still
      // works for the current session, it just won't persist.
    }
  }

  var current = "pt";
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") current = saved;
  } catch (e) {
    // ignore, default to "pt"
  }

  if (current !== "pt") applyLang(current);

  var btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      current = current === "pt" ? "en" : "pt";
      applyLang(current);
    });
  }
})();
