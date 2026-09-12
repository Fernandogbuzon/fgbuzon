const root = document.documentElement;
const themeQuery = matchMedia("(prefers-color-scheme: dark)");
const choices = [...document.querySelectorAll("[data-theme-choice]")];

function applyTheme(preference, save = false) {
  if (!["system", "light", "dark"].includes(preference)) preference = "system";
  const theme =
    preference === "system"
      ? themeQuery.matches
        ? "dark"
        : "light"
      : preference;
  root.dataset.theme = theme;
  root.dataset.preference = preference;
  document.querySelector('meta[name="theme-color"]').content =
    theme === "dark" ? "#0B1410" : "#F6F5F0";
  choices.forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.themeChoice === preference),
    ),
  );
  if (save) {
    try {
      localStorage.setItem("fgbuzon-theme", preference);
    } catch {}
  }
}

choices.forEach((button) =>
  button.addEventListener("click", () =>
    applyTheme(button.dataset.themeChoice, true),
  ),
);
themeQuery.addEventListener("change", () => {
  if (root.dataset.preference === "system") applyTheme("system");
});
window.addEventListener("storage", (event) => {
  if (event.key === "fgbuzon-theme" || event.key === null)
    applyTheme(event.newValue || "system");
});
applyTheme(root.dataset.preference || "system");

const mobileMenu = document.querySelector(".mobile-navigation");
const menuSummary = mobileMenu?.querySelector("summary");
mobileMenu?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    mobileMenu.open = false;
  }),
);
mobileMenu?.addEventListener("toggle", () =>
  menuSummary?.setAttribute(
    "aria-label",
    mobileMenu.open ? "Cerrar menú de navegación" : "Abrir menú de navegación",
  ),
);
document.addEventListener("click", (event) => {
  if (mobileMenu?.open && !mobileMenu.contains(event.target))
    mobileMenu.open = false;
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu?.open) {
    mobileMenu.open = false;
    menuSummary?.focus();
  }
});
document.getElementById("year").textContent = String(new Date().getFullYear());
