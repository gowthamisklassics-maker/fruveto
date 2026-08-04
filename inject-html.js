const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add theme-toggle to .nav-actions
const themeToggleHtml = `
                <button class="icon-btn theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode">
                    <i class="fa-solid fa-moon"></i>
                </button>`;
html = html.replace(/(<button class="cart-btn".*?>)/s, themeToggleHtml + '\n                $1');

// 2. Add Mobile Drawer to Modals section
const mobileDrawerHtml = `
    <!-- Mobile Nav Drawer -->
    <div class="overlay" id="mobile-overlay"></div>
    <div class="drawer" id="mobile-drawer" style="left: -400px; right: auto; transition: left 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
        <div class="drawer-header">
            <h3>Menu</h3>
            <button class="close-btn modal-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="drawer-body">
            <nav class="mobile-nav-links" style="display:flex; flex-direction:column; gap:1.5rem; font-size:1.2rem; font-weight:600;">
                <a href="#home" class="mobile-link" data-view="view-home"><i class="fa-solid fa-house"></i> Home</a>
                <a href="#products" class="mobile-link" data-view="view-products"><i class="fa-solid fa-leaf"></i> Our Menu</a>
                <a href="#story" class="mobile-link" data-view="view-story"><i class="fa-solid fa-book-open"></i> Our Story</a>
                <a href="#contact" class="mobile-link" data-view="view-contact"><i class="fa-solid fa-location-dot"></i> Contact Us</a>
            </nav>
        </div>
        <div class="drawer-footer">
            <div class="social-links" style="justify-content:center; gap:1.5rem;">
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                <a href="#"><i class="fa-brands fa-twitter"></i></a>
            </div>
        </div>
    </div>
`;
html = html.replace(/<!-- ================= MODALS & DRAWERS ================= -->/, `<!-- ================= MODALS & DRAWERS ================= -->\n${mobileDrawerHtml}`);

// 3. Add Floating Widgets
const floatingWidgetsHtml = `
    <!-- Floating Widgets -->
    <a href="#" class="floating-widget chat-widget" id="chat-widget" aria-label="Chat with us">
        <i class="fa-brands fa-whatsapp"></i>
    </a>
    <button class="floating-widget scroll-top-btn" id="scroll-top-btn" aria-label="Scroll to top">
        <i class="fa-solid fa-arrow-up"></i>
    </button>
`;
html = html.replace(/<\/body>/, `${floatingWidgetsHtml}\n</body>`);

fs.writeFileSync('index.html', html);
console.log('HTML injected successfully!');
