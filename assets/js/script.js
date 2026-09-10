const DATA_URL = "data/entries.json";

let allEntries = [];
let activeTag = "all";
let searchTerm = "";

const listEl = document.getElementById("entryList");
const emptyEl = document.getElementById("emptyState");
const searchEl = document.getElementById("search");
const tagButtons = document.querySelectorAll(".tag-btn");

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderEntries() {
  const filtered = allEntries
    .filter(e => activeTag === "all" || (e.tags || []).includes(activeTag))
    .filter(e => {
      if (!searchTerm) return true;
      const haystack = (e.name + " " + (e.description || "")).toLowerCase();
      return haystack.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  listEl.innerHTML = "";

  if (filtered.length === 0) {
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  for (const entry of filtered) {
    const li = document.createElement("li");
    li.className = "entry";

    const tagsHtml = (entry.tags || [])
      .map(t => `<span class="pill">${escapeHtml(t)}</span>`)
      .join("");

    const vtHtml = entry.virustotal
      ? `<a class="vt" href="${entry.virustotal}" target="_blank" rel="noopener noreferrer">virustotal</a>`
      : `<span class="vt vt-none">no scan</span>`;

    li.innerHTML = `
      <span class="name">
        ${escapeHtml(entry.name)}
        ${entry.description ? `<span class="desc">${escapeHtml(entry.description)}</span>` : ""}
      </span>
      <span class="tags-col">${tagsHtml}</span>
      <span class="size">${escapeHtml(entry.size || "-")}</span>
      <span class="date">${escapeHtml(entry.date || "-")}</span>
      <span class="actions">
        <a class="dl" href="${entry.link}" target="_blank" rel="noopener noreferrer">download</a>
        ${vtHtml}
      </span>
    `;
    listEl.appendChild(li);
  }
}

tagButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tagButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeTag = btn.dataset.tag;
    renderEntries();
  });
});

searchEl.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderEntries();
});

fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    allEntries = data;
    renderEntries();
  })
  .catch(err => {
    listEl.innerHTML = "";
    emptyEl.hidden = false;
    emptyEl.textContent = "could not load data/entries.json";
    console.error(err);
  });