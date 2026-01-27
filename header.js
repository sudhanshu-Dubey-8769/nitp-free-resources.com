function toggleDarkMode() {
    const html = document.documentElement;
    if (html.getAttribute("data-theme") === "dark") {
        html.removeAttribute("data-theme");
    } else {
        html.setAttribute("data-theme", "dark");
    }
}

fetch("header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("header").innerHTML = html;

    // ===================================================================
    //  DARK MODE WITH ICON (🌙 / 🔆) — FULL & FINAL
    // ===================================================================

    // Set icon inside toggle ball based on theme
    function updateToggleIcon() {   
      const ball = document.querySelector(".toggle-ball");
      if (!ball) return;

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      ball.textContent = isDark ? "🔆" : "🌙"; 
    }

    // Toggle Dark Mode
    window.toggleDarkMode = function () { 
      const htmlEl = document.documentElement;
      const isDark = htmlEl.getAttribute("data-theme") === "dark";

      if (isDark) {
        htmlEl.removeAttribute("data-theme");
        try { localStorage.setItem("theme", "light"); } catch (e) {}
      } else {
        htmlEl.setAttribute("data-theme", "dark");
        try { localStorage.setItem("theme", "dark"); } catch (e) {}
      }

      updateToggleIcon(); 
    };

    // Load saved theme
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch (e) {}

    updateToggleIcon(); // ⚠️⚠️⚠️ ensure icon loads on first load



    // ===================================================================
    // ⭐ HAMBURGER MENU / OVERLAY
    // ===================================================================

    window.toggleMenu = function () {
      const sidebar = document.getElementById("sbSidebar");
      const overlay = document.getElementById("sbOverlay");
      const btn = document.querySelector(".sb-menu-btn");

      sidebar.classList.toggle("open");
      overlay.classList.toggle("show");
      btn.classList.toggle("active");

      document.body.classList.toggle("sb-menu-open");
    };


    // ===================================================================
    // ⚡ SIDEBAR OPEN/CLOSE
    // ===================================================================
    window.openSidebar = function () {
      document.getElementById("sbSidebar").classList.add("active");
    };

    window.closeSidebar = function () {
      document.getElementById("sbSidebar").classList.remove("active");
    };


    // ===================================================================
    // 🔔 NOTIFICATION POP-UP LOGIC
    // ===================================================================
    window.showNotification = function () {
        // You can replace 'alert' with a custom modal later if you want!
        const message = "\n1. Only EE department resources are available upto 5th semester.\n\n2. We don't claim fully over the content on the website,as some resources might have been taken from other platforms.\n\n3. We provide the best resources aligned to the corresponding NITP Professors.";
        alert(`LATEST UPDATE✅✅\n`+message);
        
        // Logic to play a small sound or change bell color after clicking
        const bell = document.getElementById("notif-bell");
        bell.style.color = "white"; 
    };

    // ===================================================================
    // ⚡ DROPDOWN TOGGLE INSIDE SIDEBAR
    // ===================================================================
    document.querySelectorAll(".sb-dropdown > span").forEach(drop => {
      drop.addEventListener("click", () => {
        drop.parentElement.classList.toggle("open");
      });
    });

  })
  .catch(err => console.error("Header load error:", err));
