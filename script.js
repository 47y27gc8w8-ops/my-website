const logoButton = document.querySelector(".logo-mark");
const logoDropdown = document.querySelector(".logo-dropdown");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const year = document.querySelector("#year");
const revealElements = document.querySelectorAll(".reveal");
const form = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const closeLogoDropdown = () => {
  if (!logoButton || !logoDropdown) {
    return;
  }

  logoDropdown.classList.remove("open");
  logoButton.setAttribute("aria-expanded", "false");
  logoButton.setAttribute("aria-label", "Open page menu");
};

const closeNavigation = () => {
  if (!navToggle || !siteNav) {
    return;
  }

  siteNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
};

if (logoButton && logoDropdown) {
  logoButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = logoDropdown.classList.toggle("open");
    logoButton.setAttribute("aria-expanded", String(isOpen));
    logoButton.setAttribute("aria-label", isOpen ? "Close page menu" : "Open page menu");
    closeNavigation();
  });

  logoDropdown.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("menu-open", isOpen);
    closeLogoDropdown();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });
}

document.addEventListener("click", closeLogoDropdown);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLogoDropdown();
    closeNavigation();
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((tabButton) => {
      const isActive = tabButton === button;
      tabButton.classList.toggle("active", isActive);
      tabButton.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      formMessage.textContent = "Please fill in the fields first.";
      formMessage.style.color = "#e45f4f";
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const firstName = String(formData.get("name") || "").trim().split(" ")[0] || "there";

    form.reset();
    formMessage.textContent = `Thanks, ${firstName}. Demo message received.`;
    formMessage.style.color = "#42c7b7";
  });
}
