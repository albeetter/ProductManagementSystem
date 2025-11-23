// Dark/Light Mode Toggle Logic & Icon Update
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function updateThemeIcon() {
  if (document.documentElement.classList.contains("dark")) {
    // Moon icon for dark mode
    themeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    `;
    themeToggleBtn.setAttribute("title", "Switch to Light Mode");
  } else {
    // Sun icon for light mode
    themeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
      d="M12 3v1m0 16v1m8.485-8.485h-1
      M4.515 12.515h-1m15.364 4.95l-.707-.707
      M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707
      M6.343 17.657l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    `;
    themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
  }
}

themeToggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  setTimeout(() => {
    if (document.documentElement.classList.contains("dark")) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
    updateThemeIcon();
  }, 10);
});

updateThemeIcon();

// Google Sign-In Logic
window.onload = () => {
  gapi.load("auth2", () => {
    gapi.auth2.init({
      client_id:
        "882139218526-6jg163l2d2771vvsmdec46gsv77h6q9u.apps.googleusercontent.com",
    });
  });

  document
    .getElementById("google-signin-btn")
    .addEventListener("click", () => {
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then((googleUser) => {
          const profile = googleUser.getBasicProfile();
          console.log("Name:", profile.getName());
          console.log("Email:", profile.getEmail());
          console.log("ID Token:", googleUser.getAuthResponse().id_token);
        })
        .catch((err) => {
          console.error("Google sign-in failed:", err);
        });
    });
};

// Terms & Privacy Modal Logic
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
  if (e.target === modalOverlay) {
    closeModal();
  }
});

document.getElementById("terms-link").addEventListener("click", (e) => {
  e.preventDefault();
  openModal(
    "Terms & Conditions",
    `Welcome to <strong>HOPE</strong>, a product management system designed for <strong>staff, admins, and super admins</strong> to oversee inventory, product listings, and operational workflows.

By accessing or using <strong>HOPE</strong>, you agree to these terms. Please read them carefully.

<strong>1. User Roles and Access</strong>: Staff have <strong>read-only access</strong> to product data; Admins can <strong>edit and manage inventory</strong>; Super Admins have <strong>full system control</strong>, including user management. <strong>Misuse of roles</strong> may result in account suspension.

<strong>2. Data Usage and Responsibilities</strong>: You are responsible for <strong>accurate product data entry</strong> and compliance with company policies. Do not share <strong>sensitive information</strong> (e.g., proprietary product details) outside authorized channels.

<strong>3. Security and Confidentiality</strong>: <strong>Protect your login credentials</strong>. Report any security breaches immediately. <strong>Unauthorized access</strong> or data leaks may lead to legal action.

<strong>4. Liability and Disclaimers</strong>: <strong>HOPE is provided "as is."</strong> We are not liable for data loss, system downtime, or indirect damages. Users must back up critical data independently.

<strong>5. Compliance and Termination</strong>: Usage must comply with <strong>applicable laws</strong> (e.g., data protection regulations). We reserve the right to terminate access for violations.

For full details, contact your system administrator. Continued use implies acceptance.`
  );
});

document.getElementById("privacy-link").addEventListener("click", (e) => {
  e.preventDefault();
  openModal(
    "Privacy Policy",
    `<strong>HOPE</strong> is committed to protecting your privacy and personal data in compliance with laws like <strong>GDPR, CCPA</strong>, and other data protection regulations.

<strong>1. Data We Collect</strong>: We collect <strong>authentication details</strong> (e.g., staff ID, email), <strong>product management data</strong> (e.g., inventory levels, product descriptions), and <strong>usage logs</strong> (e.g., login times, actions performed) to facilitate system operations.

<strong>2. Purpose of Data Use</strong>: Data is used solely for <strong>authentication, role-based access control, product tracking, auditing</strong>, and improving system performance. We do not sell or rent your personal information to third parties. Data may be shared only with authorized personnel within the organization or as required by law.

<strong>3. Data Retention</strong>: Personal data is retained only as long as necessary for the purposes outlined, or as required by law.

<strong>4. Security Measures</strong>: We use encryption, access controls, and regular security audits to protect your data from unauthorized access, alteration, or destruction.

<strong>5. Cookies and Tracking</strong>: This system may use cookies for session management and authentication. No tracking for advertising or marketing purposes occurs.

<strong>6. Your Rights</strong>: Depending on applicable laws, you may have rights to access, correct, delete, or restrict processing of your personal data. Contact your administrator to exercise these rights.

<strong>7. Updates to Policy</strong>: This policy may be updated periodically; significant changes will be communicated to users.

<strong>8. Contact Information</strong>: For questions about this privacy policy or data practices, contact your system administrator or support@hope.com.

By using <strong>HOPE</strong>, you acknowledge and consent to this privacy policy.`
  );
});