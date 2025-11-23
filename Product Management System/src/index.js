// Dark/Light Mode Toggle Logic (Keep this as is)
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function updateThemeIcon() {
  if (document.documentElement.classList.contains("dark")) {
    themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />`;
    themeToggleBtn.setAttribute("title", "Switch to Light Mode");
  } else {
    themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.485-8.485h-1 M4.515 12.515h-1m15.364 4.95l-.707-.707 M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707 M6.343 17.657l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />`;
    themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
  }
}

themeToggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  setTimeout(() => {
    localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    updateThemeIcon();
  }, 10);
});
updateThemeIcon();

// ========================
// 1. MANUAL LOGIN LOGIC (UPDATED)
// ========================
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const staffId = this.querySelector('input[name="staff-id"]').value.trim();
  const password = this.querySelector('input[name="password"]').value;

  if (staffId && password) {
    // --- SAVE THE USERNAME HERE ---
    localStorage.setItem('hope_active_user', staffId);
    
    console.log("Login successful for: " + staffId);
    window.location.href = "./pages/dashboard.html"; // Ensure this path matches your folder structure
  } else {
    alert("Please enter both Staff ID and Password");
  }
});

// ========================
// 2. GOOGLE SIGN-IN LOGIC (UPDATED)
// ========================
window.onload = function () {
  gapi.load("auth2", function () {
    gapi.auth2.init({
      client_id: "882139218526-6jg163l2d2771vvsmdec46gsv77h6q9u.apps.googleusercontent.com",
    });
  });

  document.getElementById("google-signin-btn").addEventListener("click", function () {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(
      function (googleUser) {
        const profile = googleUser.getBasicProfile();
        
        // --- SAVE THE GOOGLE NAME HERE ---
        localStorage.setItem('hope_active_user', profile.getName());

        console.log("Google login successful");
        window.location.href = "dashboard.html"; // Ensure this path matches your folder structure
      },
      function (error) {
        console.error("Google Sign-In failed:", error);
        alert("Google Sign-In failed. Please try again.");
      }
    );
  });
};  

// ========================
// Terms & Privacy Modal Logic (unchanged)
// ========================
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const modalCloseBtn = document.getElementById("modal-close");

function openModal(title, content) {
  modalTitle.textContent = title;
  modalContent.innerHTML = content;
  modalOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  document.body.style.overflow = "";
}

modalCloseBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.getElementById("terms-link").addEventListener("click", (e) => {
  e.preventDefault();
  openModal("Terms & Conditions", `Welcome to <strong>HOPE</strong>... (Content Truncated for brevity, keep your original text)`);
});

document.getElementById("privacy-link").addEventListener("click", (e) => {
  e.preventDefault();
  openModal("Privacy Policy", `<strong>HOPE</strong> is committed... (Content Truncated for brevity, keep your original text)`);
});