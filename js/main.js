/* ===========================================================
   MAIN.JS — Navigation, Rendering aus data/articles.json und
   data/blog.json (diese Dateien bearbeitet Lisa künftig über
   das CMS unter /admin/, nicht mehr direkt im Code).
   =========================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  initNavToggle();

  const articlesData = await loadJSON("data/articles.json");
  const blogData = await loadJSON("data/blog.json");
  const articles = (articlesData && articlesData.articles) || [];
  const entries = (blogData && blogData.entries) || [];

  renderFeatured(articles);
  renderHomeStats(articles);
  renderArticleDetail(articles);
  renderBlogFeed(entries);
});

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } catch (err) {
    console.error("Konnte Daten nicht laden:", path, err);
    return null;
  }
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function statusLabel(status) {
  return status === "laufend" ? "Laufend" : "Abgeschlossen";
}

function caseCardHTML(article) {
  return `
    <a class="case-card" href="artikel-detail.html?slug=${encodeURIComponent(article.slug)}">
      <div class="case-meta">
        <span>${article.date}</span>
        <span class="tag ${article.status === "laufend" ? "status-live" : ""}">${statusLabel(article.status)}</span>
      </div>
      <h3>${article.title}</h3>
      <p>${article.excerpt}</p>
      <span class="case-more">Lesen <span class="arrow">&rarr;</span></span>
    </a>
  `;
}

function renderFeatured(articles) {
  const el = document.getElementById("featured-cases");
  if (!el) return;
  if (!articles.length) {
    el.innerHTML = `<div class="empty-state">Noch keine Artikel veröffentlicht.</div>`;
    return;
  }
  el.innerHTML = articles.slice(0, 3).map(caseCardHTML).join("");
}

function renderHomeStats(articles) {
  const pub = document.getElementById("stat-published");
  const ongoing = document.getElementById("stat-ongoing");
  if (!pub || !ongoing) return;
  pub.textContent = articles.filter(a => a.status === "abgeschlossen").length + " veröffentlichte Recherchen";
  ongoing.textContent = articles.filter(a => a.status === "laufend").length + " laufende Akten";
}

function renderArticleDetail(articles) {
  const container = document.getElementById("article-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    container.innerHTML = `
      <div class="article-not-found wrap">
        <p class="eyebrow" style="justify-content:center">Nicht gefunden</p>
        <h1>Dieser Artikel existiert nicht (mehr).</h1>
        <p><a href="index.html">Zurück zur Startseite &rarr;</a></p>
      </div>
    `;
    document.title = "Nicht gefunden — Lisa Horn";
    return;
  }

  document.title = `${article.title} — Lisa Horn`;

  const bodyHTML = (typeof marked !== "undefined")
    ? marked.parse(article.body || "")
    : (article.body || "").split(/\n\n+/).map(p => `<p>${p}</p>`).join("");

  container.innerHTML = `
    <header class="article-header">
      <div class="wrap">
        <p class="eyebrow">${article.tag}</p>
        <h1>${article.title}</h1>
        <p class="article-dek">${article.dek}</p>
        <div class="article-meta-row">
          <span>${article.date}</span>
          <span>${article.readingTime}</span>
          <span class="tag ${article.status === "laufend" ? "status-live" : ""}">${statusLabel(article.status)}</span>
        </div>
      </div>
    </header>
    <article class="article-body">
      ${bodyHTML}
    </article>
    <div class="wrap" style="padding-bottom:60px;">
      <a class="btn btn-dark" href="index.html">&larr; Zurück zur Startseite</a>
    </div>
  `;
}

function renderBlogFeed(entries) {
  const el = document.getElementById("blog-feed");
  if (!el) return;
  if (!entries.length) {
    el.innerHTML = `<div class="empty-state">Noch keine Einträge.</div>`;
    return;
  }
  el.innerHTML = entries.map(entry => `
    <div class="blog-entry">
      <time>${entry.date}</time>
      <div>
        <h3>${entry.title}</h3>
        <p>${entry.text}</p>
      </div>
    </div>
  `).join("");
}
