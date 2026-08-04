document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
    if (window.scrollY > 40) header.classList.add('scrolled');

    // Animations Setup
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, observerOptions);
    
    function observeAnimations() {
        document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
            el.classList.remove('visible'); // reset for SPA transitions
            observer.observe(el);
        });
    }
    observeAnimations();

    // ==========================================
    // SPA ROUTING WITH NATIVE BROWSER BACK/FORWARD SUPPORT
    // ==========================================
    const pageViews = document.querySelectorAll('.page-view');

    const hashToViewMap = {
        '': 'view-home',
        '#home': 'view-home',
        '#products': 'view-products',
        '#bowls': 'view-products',
        '#juices': 'view-products',
        '#smoothies': 'view-products',
        '#snacks': 'view-products',
        '#story': 'view-story',
        '#contact': 'view-contact'
    };

    const viewToHashMap = {
        'view-home': '#home',
        'view-products': '#products',
        'view-products-bowls': '#bowls',
        'view-products-juices': '#juices',
        'view-products-smoothies': '#smoothies',
        'view-products-snacks': '#snacks',
        'view-story': '#story',
        'view-contact': '#contact'
    };

    function renderViewFromHash() {
        const hash = window.location.hash || '#home';
        const targetViewId = hashToViewMap[hash] || 'view-home';

        pageViews.forEach(view => {
            view.classList.add('hidden');
            view.classList.remove('active');
        });
        
        const targetView = document.getElementById(targetViewId);
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('active');
        }

        // Handle category filtering
        let activeFilter = 'all';
        if (hash === '#bowls') activeFilter = 'bowls';
        if (hash === '#juices') activeFilter = 'juices';
        if (hash === '#smoothies') activeFilter = 'smoothies';
        if (hash === '#snacks') activeFilter = 'snacks';

        const categoryGrid = document.getElementById('main-category-grid');
        const productGrid = document.getElementById('main-product-grid');

        if (targetViewId === 'view-products') {
            document.querySelectorAll('.filter-pill').forEach(pill => {
                if (pill.getAttribute('data-filter') === activeFilter) {
                    pill.classList.add('active');
                } else {
                    pill.classList.remove('active');
                }
            });
            
            if (!categoryGrid) {
                 const cg = document.querySelector('.category-grid');
                 if(cg) cg.id = 'main-category-grid';
            }

            if (activeFilter === 'all') {
                if (document.getElementById('main-category-grid')) document.getElementById('main-category-grid').style.display = 'grid';
                if (document.getElementById('main-product-grid')) {
                    document.getElementById('main-product-grid').style.display = 'grid';
                    document.querySelectorAll('#main-product-grid .product-card').forEach(card => card.style.display = 'block');
                }
            } else {
                if (document.getElementById('main-category-grid')) document.getElementById('main-category-grid').style.display = 'none';
                if (document.getElementById('main-product-grid')) {
                    document.getElementById('main-product-grid').style.display = 'grid';
                    document.querySelectorAll('#main-product-grid .product-card').forEach(card => {
                        if (card.getAttribute('data-category') === activeFilter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            }
        }
        
        window.scrollTo(0, 0);
        observeAnimations();
    }

    window.addEventListener('hashchange', renderViewFromHash);

    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = btn.getAttribute('data-filter');
            if (filter === 'all') window.location.hash = '#products';
            else window.location.hash = '#' + filter;
        });
    });

    document.querySelectorAll('[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = link.getAttribute('data-view');
            const targetHash = viewToHashMap[viewId] || '#home';
            
            if (window.location.hash === targetHash) {
                renderViewFromHash();
            } else {
                window.location.hash = targetHash;
            }
        });
    });

    renderViewFromHash();


    // ==========================================
    // MODALS & DRAWERS
    // ==========================================
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginOverlay = document.getElementById('login-overlay');

    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchOverlay = document.getElementById('search-overlay');

    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutOverlay = document.getElementById('checkout-overlay');
    const checkoutTotalVal = document.getElementById('checkout-total-val');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutBody = document.getElementById('checkout-body');

    function openModal(modal, overlay) {
        if (!modal || !overlay) return;
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeAllModals() {
        document.querySelectorAll('.modal, .drawer, .overlay').forEach(el => el.classList.remove('active'));
        document.body.style.overflow = '';
    }

    if (loginBtn) loginBtn.addEventListener('click', () => openModal(loginModal, loginOverlay));
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            openModal(searchModal, searchOverlay);
            const input = searchModal.querySelector('input');
            if(input) { input.value = ''; input.focus(); renderSearchResults(''); }
        });
    }

    // Checkout Modal Open
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const total = calculateCartTotal();
            if (total === 0) {
                alert('Your bag is empty. Please add items before checking out!');
                return;
            }
            checkoutTotalVal.textContent = 'र ' + total.toLocaleString('en-IN');
            closeAllModals();
            openModal(checkoutModal, checkoutOverlay);
        });
    }

    // Checkout Form Submit (Simulate Order)
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const orderId = 'FRV-' + Math.floor(10000 + Math.random() * 90000);
            
            checkoutBody.innerHTML = `
                <div style="text-align:center; padding: 1.5rem 0;">
                    <i class="fa-solid fa-circle-check" style="font-size: 3.5rem; color: var(--fresh-green); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--primary-green); margin-bottom: 0.5rem;">Order Placed Successfully!</h3>
                    <p style="margin-bottom: 1rem;">Order Reference: <strong>${orderId}</strong></p>
                    <p style="font-size:0.9rem; color: var(--gray-text);">Thank you for choosing Fruveto! Your fresh meal is being prepared with care.</p>
                </div>
            `;

            // Reset Cart & Storage
            cart = [];
            saveCartToStorage();
            updateCartUI();

            setTimeout(() => {
                closeAllModals();
                setTimeout(() => {
                    checkoutBody.innerHTML = `
                        <form class="auth-form" id="checkout-form">
                            <div class="form-group"><label>Full Name</label><input type="text" required placeholder="John Doe"></div>
                            <div class="form-group"><label>Delivery Address</label><input type="text" required placeholder="Flat No, Street, Landmark"></div>
                            <div class="form-group">
                                <label>Payment Method</label>
                                <select required style="width:100%; padding:0.9rem; border-radius:12px; border:1px solid rgba(0,0,0,0.1); background:rgba(255,255,255,0.7); outline:none; font-family:inherit;">
                                    <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
                                    <option value="cod">Cash on Delivery (COD)</option>
                                    <option value="card">Credit / Debit Card</option>
                                </select>
                            </div>
                            <div style="display:flex; justify-content:space-between; margin:1.5rem 0; font-weight:700; font-size:1.1rem; color:var(--primary-green);">
                                <span>Amount Payable</span><span id="checkout-total-val">र 0</span>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Place Order Now</button>
                        </form>
                    `;
                }, 500);
            }, 3000);
        });
    }

    document.querySelectorAll('.close-btn, .modal-close, .overlay').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    document.querySelectorAll('.modal, .drawer').forEach(el => {
        el.addEventListener('click', (e) => e.stopPropagation());
    });


    // ==========================================
    // ADVANCED LIVE SEARCH
    // ==========================================
    const allProductsData = [
        { id: 'p1', name: 'Tropical Mango Bowl', category: 'bowls', price: 1050, img: 'prod-mango-bowl.jpg', desc: 'Fresh mango, coconut flakes, chia seeds, kiwi.' },
        { id: 'p2', name: 'Berry Bliss Bowl', category: 'bowls', price: 1100, img: 'prod-berry-bliss.jpg', desc: 'Acai blend, fresh berries, granola.' },
        { id: 'p3', name: 'Citrus Energy Juice', category: 'juices', price: 650, img: 'prod-citrus.jpg', desc: 'Orange, grapefruit, lemon, ginger.' },
        { id: 'p4', name: 'Green Detox Smoothie', category: 'juices', price: 700, img: 'prod-detox.jpg', desc: 'Spinach, green apple, cucumber, mint.' },
        { id: 'p5', name: 'Berry Blast Smoothie', category: 'smoothies', price: 850, img: 'prod-berry-smoothie.jpg', desc: 'Mixed berries, banana, almond milk.' },
        { id: 'p6', name: 'Oat Energy Balls', category: 'snacks', price: 450, img: 'cat-snacks.jpg', desc: 'Oats, peanut butter, chia seeds, dark chocolate.' },
        { id: 'p7', name: 'Tropical Mango Smoothie', category: 'smoothies', price: 750, img: 'prod-mango-smoothie.jpg', desc: 'Ripe mango, pineapple, coconut milk, mint.' },
        { id: 'p8', name: 'Avocado Green Protein', category: 'smoothies', price: 800, img: 'prod-avocado.jpg', desc: 'Avocado, spinach, matcha, plant protein.' },
        { id: 'p9', name: 'Peanut Butter Power', category: 'smoothies', price: 900, img: 'prod-pb.jpg', desc: 'Peanut butter, cocoa, banana, oat milk.' },
        { id: 'p10', name: 'Almond Granola Clusters', category: 'snacks', price: 500, img: 'prod-granola.jpg', desc: 'Baked rolled oats, almonds, honey, cranberries.' },
        { id: 'p11', name: 'Raw Chia Pudding Cup', category: 'snacks', price: 400, img: 'prod-chia-pudding.jpg', desc: 'Coconut milk chia pudding, fresh fruits.' },
        { id: 'p12', name: 'Roasted Veggie Chips', category: 'snacks', price: 350, img: 'prod-veggie.jpg', desc: 'Beetroot, sweet potato, kale chips.' }
    ];

    const searchInput = searchModal.querySelector('input');
    const searchForm = searchModal.querySelector('.search-form');

    let searchResultsContainer = searchModal.querySelector('.search-results-list');
    if (!searchResultsContainer) {
        searchResultsContainer = document.createElement('div');
        searchResultsContainer.className = 'search-results-list';
        searchModal.appendChild(searchResultsContainer);
    }

    function renderSearchResults(query) {
        const q = query.trim().toLowerCase();
        if (!q) {
            searchResultsContainer.innerHTML = '<p style="text-align:center; color:var(--gray-text); margin-top:1rem;">Type to search products...</p>';
            return;
        }
        
        const matches = allProductsData.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
        if (matches.length === 0) {
            searchResultsContainer.innerHTML = '<p style="text-align:center; color:var(--gray-text); margin-top:1rem;">No matching products found.</p>';
            return;
        }

        searchResultsContainer.innerHTML = matches.map(p => `
            <div class="search-item-result" data-view="${p.category}">
                <img src="assets/images/${p.img}" alt="${p.name}">
                <div style="flex-grow:1">
                    <h5 style="margin:0; font-size:0.95rem;">${p.name}</h5>
                    <span style="font-size:0.8rem; color:var(--primary-green); font-weight:600;">र ${p.price.toLocaleString('en-IN')}</span>
                </div>
                <button class="btn btn-primary add-to-cart-btn" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-img="${p.img}" style="padding:0.4rem 0.8rem; font-size:0.8rem;">
                    <i class="fa-solid fa-plus"></i> Add
                </button>
            </div>
        `).join('');

        searchResultsContainer.querySelectorAll('.search-item-result').forEach(row => {
            row.addEventListener('click', (e) => {
                if (e.target.closest('.add-to-cart-btn')) return;
                const filterId = row.getAttribute('data-view');
                closeAllModals();
                window.location.hash = '#' + filterId;
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
    }
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            renderSearchResults(searchInput.value);
        });
    }


    // ==========================================
    // ADVANCED PERSISTENT CART FUNCTIONALITY
    // ==========================================
    let cart = [];

    function loadCartFromStorage() {
        try {
            const saved = localStorage.getItem('fruveto_cart');
            if (saved) {
                cart = JSON.parse(saved);
            } else {
                cart = [{ id: 'p1', name: 'Tropical Mango Bowl', price: 1050, img: 'prod-mango-bowl.jpg', quantity: 1 }];
                saveCartToStorage();
            }
        } catch(e) {
            cart = [{ id: 'p1', name: 'Tropical Mango Bowl', price: 1050, img: 'prod-mango-bowl.jpg', quantity: 1 }];
        }
    }

    function saveCartToStorage() {
        try {
            localStorage.setItem('fruveto_cart', JSON.stringify(cart));
        } catch(e) {}
    }

    loadCartFromStorage();

    const cartItemsContainer = document.getElementById('cart-items');
    const cartBadge = document.querySelector('.cart-badge');
    const cartTotalPrice = document.getElementById('cart-total-price');

    function calculateCartTotal() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartBadge) cartBadge.textContent = totalItems;
        
        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your bag is currently empty.</p>';
            if (cartTotalPrice) cartTotalPrice.textContent = 'र 0';
            return;
        }

        let html = '';
        let total = calculateCartTotal();
        
        cart.forEach((item, index) => {
            html += `
                <div class="cart-item">
                    <img src="assets/images/${item.img}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <div class="cart-item-price">र ${item.price.toLocaleString('en-IN')}</div>
                        <div class="cart-qty-ctrl">
                            <button class="cart-qty-btn qty-minus" data-index="${index}">-</button>
                            <span class="cart-qty-count">${item.quantity}</span>
                            <button class="cart-qty-btn qty-plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = html;
        if (cartTotalPrice) cartTotalPrice.textContent = 'र ' + total.toLocaleString('en-IN');

        document.querySelectorAll('.qty-plus').forEach(btn => {
            btn.onclick = (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                cart[index].quantity += 1;
                saveCartToStorage();
                updateCartUI();
            };
        });

        document.querySelectorAll('.qty-minus').forEach(btn => {
            btn.onclick = (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                saveCartToStorage();
                updateCartUI();
            };
        });

        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.onclick = (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                cart.splice(index, 1);
                saveCartToStorage();
                updateCartUI();
            };
        });
    }

    function showToast(name, img) {
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            toast.className = 'cart-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `
            <img src="assets/images/${img}" alt="${name}">
            <div>
                <strong>Added to Bag!</strong>
                <p>${name}</p>
            </div>
            <button class="btn btn-primary" id="toast-view-bag-btn" style="padding:0.35rem 0.8rem; font-size:0.75rem; margin-left:auto;">View Bag</button>
        `;
        toast.classList.add('active');
        
        const viewBtn = toast.querySelector('#toast-view-bag-btn');
        if (viewBtn) {
            viewBtn.onclick = () => {
                toast.classList.remove('active');
                openModal(cartDrawer, cartOverlay);
            };
        }

        setTimeout(() => toast.classList.remove('active'), 3500);
    }

    updateCartUI();

    // Global Bulletproof Click Delegation
    document.addEventListener('click', (e) => {
        // 1. Tapping the Shopping Bag Button (Icon or Badge) -> Open "Your Bag" Drawer
        const bagBtn = e.target.closest('#cart-btn, .cart-btn, .cart-badge');
        if (bagBtn) {
            e.preventDefault();
            e.stopPropagation();
            updateCartUI();
            openModal(cartDrawer, cartOverlay);
            return;
        }

        // 2. Tapping Add to Cart Button -> Add Item & Show Toast
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn) {
            e.preventDefault();
            e.stopPropagation();

            const targetCard = addBtn.closest('.product-card') || addBtn.closest('.search-item-result');

            const id = addBtn.getAttribute('data-id') || ('p-' + Math.random().toString(36).substr(2, 5));
            const name = addBtn.getAttribute('data-name') || targetCard?.querySelector('.product-name, h5')?.textContent?.trim() || 'Fresh Item';
            
            const priceAttr = addBtn.getAttribute('data-price');
            const priceDom = targetCard?.querySelector('.product-price, span')?.textContent;
            const priceNum = parseInt((priceAttr || priceDom || '500').replace(/[^0-9]/g, '')) || 500;

            let img = addBtn.getAttribute('data-img');
            if (!img) {
                const imgSrc = targetCard?.querySelector('img')?.getAttribute('src') || '';
                img = imgSrc.replace('assets/images/', '') || 'prod-mango-bowl.jpg';
            }

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price: priceNum, img, quantity: 1 });
            }
            
            saveCartToStorage();
            updateCartUI();
            
            const originalHTML = addBtn.innerHTML;
            addBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
            addBtn.style.backgroundColor = 'var(--fresh-green)';
            setTimeout(() => {
                addBtn.innerHTML = originalHTML;
                addBtn.style.backgroundColor = '';
            }, 1500);
            
            showToast(name, img);
        }
    });

    // ==========================================
    // FLOATING WIDGETS & NEW FEATURES
    // ==========================================

    // 1. Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // 2. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. Mobile Navigation Drawer
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (mobileToggle) {
        // Remove old alert if it exists by replacing the node (quickest way to remove anon listeners)
        const newMobileToggle = mobileToggle.cloneNode(true);
        mobileToggle.parentNode.replaceChild(newMobileToggle, mobileToggle);
        
        newMobileToggle.addEventListener('click', () => {
            openModal(mobileDrawer, mobileOverlay);
        });
    }

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            closeModal(mobileDrawer, mobileOverlay);
        });
    });

    // 4. Newsletter Toast
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showToast('Newsletter Subscribed!', 'cat-juices.jpg'); // Reusing existing toast logic
                emailInput.value = '';
            }
        });
    }

});


