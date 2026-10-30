// Mobile navigation, footer year, and small UX enhancements.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const yearElement = document.querySelector("#currentYear");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Replace these placeholders with your actual public profile URLs before publishing.
const profileUrls = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/"
};

document.querySelectorAll("[data-profile-link]").forEach((link) => {
  const profile = link.dataset.profileLink;
  if (profileUrls[profile]) link.href = profileUrls[profile];
});

const API_URL =
  "https://9qs6ywu2c8.execute-api.ap-south-1.amazonaws.com/count";

async function updateVisitorCount() {
  const counterElement = document.getElementById("visitor-count");

  if (!counterElement) return;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    counterElement.textContent = data.visitCount;
  } catch (error) {
    console.error("Visitor counter error:", error);
    counterElement.textContent = "Unavailable";
  }
}

updateVisitorCount();
