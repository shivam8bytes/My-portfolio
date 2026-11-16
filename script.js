// PERSONALISE THESE VALUES BEFORE PUBLISHING
const GITHUB_USERNAME = "shivam8bytes"; // e.g. "octocat"
const CONTACT_EMAIL = "shivamsinghcool18@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/shivam-singh-30b541347/";

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const light = body.classList.contains("light");
  themeIcon.textContent = light ? "☾" : "☼";
  document.querySelector('meta[name="theme-color"]').content = light ? "#f4f7fc" : "#080d1b";
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

const roles = ["aspiring software engineer", "computer science student", "technology enthusiast"];
let roleIndex = 0;
const roleEl = document.getElementById("typedRole");
setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  roleEl.style.opacity = 0;
  setTimeout(() => { roleEl.textContent = roles[roleIndex]; roleEl.style.opacity = 1; }, 220);
}, 2600);

document.getElementById("year").textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("emailLink").href = `mailto:${CONTACT_EMAIL}`;
document.getElementById("linkedinLink").href = LINKEDIN_URL;
if (GITHUB_USERNAME !== "YOUR_GITHUB_USERNAME") {
  const profileUrl = `https://github.com/${GITHUB_USERNAME}`;
  document.getElementById("githubProfile").href = profileUrl;
  document.getElementById("githubQuickLink").href = profileUrl;
  document.getElementById("githubName").textContent = GITHUB_USERNAME;
  document.getElementById("githubHandle").textContent = `github.com/${GITHUB_USERNAME}`;
  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`)
    .then(response => { if (!response.ok) throw new Error("GitHub profile not found"); return response.json(); })
    .then(repos => {
      const container = document.getElementById("githubRepos");
      if (!repos.length) { container.innerHTML = "<small>No public repositories yet. Check back soon.</small>"; return; }
      container.className = "repo-list";
      container.innerHTML = repos.map(repo => `
        <a class="repo-item" href="${repo.html_url}" target="_blank" rel="noreferrer">
          <strong>${escapeHTML(repo.name)}</strong>
          <small>${escapeHTML(repo.language || "Project")} · ★ ${repo.stargazers_count}</small>
        </a>`).join("");
    })
    .catch(() => {
      document.getElementById("githubRepos").innerHTML = "<small>Could not load repositories. Check the username or try again later.</small>";
    });
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
