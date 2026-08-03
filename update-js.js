const fs = require('fs');
let jsCode = fs.readFileSync('js/script.js', 'utf8');

// Update the hashToViewMap since we removed the individual views
jsCode = jsCode.replace(/        '#bowls': 'view-bowls',\n        '#juices': 'view-juices',\n        '#smoothies': 'view-smoothies',\n        '#snacks': 'view-snacks',/g, 
"        '#bowls': 'view-products',\n        '#juices': 'view-products',\n        '#smoothies': 'view-products',\n        '#snacks': 'view-products',");

jsCode = jsCode.replace(/        'view-bowls': '#bowls',\n        'view-juices': '#juices',\n        'view-smoothies': '#smoothies',\n        'view-snacks': '#snacks',/g, 
"        'view-products-bowls': '#bowls',\n        'view-products-juices': '#juices',\n        'view-products-smoothies': '#smoothies',\n        'view-products-snacks': '#snacks',");

// Let's add the filter logic inside renderViewFromHash
const originalRender = `        // Highlight active filter pill if on view-products
        document.querySelectorAll('.filter-pill').forEach(pill => {
            if (pill.getAttribute('data-view') === targetViewId || (targetViewId === 'view-products' && pill.getAttribute('data-view') === 'view-products')) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });
        
        window.scrollTo(0, 0);
        observeAnimations();
    }`;

const newRender = `        // Handle category filtering
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
                if (document.getElementById('main-product-grid')) document.getElementById('main-product-grid').style.display = 'none';
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
    }`;

jsCode = jsCode.replace(originalRender, newRender);

// Also we need to make sure the data-filter links change hash instead of trying to change views directly.
// The easiest way is to add an event listener for data-filter
const originalLinks = `    document.querySelectorAll('[data-view]').forEach(link => {`;
const newLinks = `    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = btn.getAttribute('data-filter');
            if (filter === 'all') window.location.hash = '#products';
            else window.location.hash = '#' + filter;
        });
    });

    document.querySelectorAll('[data-view]').forEach(link => {`;

jsCode = jsCode.replace(originalLinks, newLinks);

fs.writeFileSync('js/script.js', jsCode);
console.log('Done script.js!');
