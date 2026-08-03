const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const bowlsMatch = html.match(/<div id="view-bowls"[\s\S]*?<div class="product-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>\s*<\/div>/);
const juicesMatch = html.match(/<div id="view-juices"[\s\S]*?<div class="product-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>\s*<\/div>/);
const smoothiesMatch = html.match(/<div id="view-smoothies"[\s\S]*?<div class="product-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>\s*<\/div>/);
const snacksMatch = html.match(/<div id="view-snacks"[\s\S]*?<div class="product-grid">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>\s*<\/div>/);

let bowlsHtml = bowlsMatch ? bowlsMatch[1].replace(/<div class="product-card fade-up"/g, '<div class="product-card fade-up" data-category="bowls"') : '';
let juicesHtml = juicesMatch ? juicesMatch[1].replace(/<div class="product-card fade-up"/g, '<div class="product-card fade-up" data-category="juices"') : '';
let smoothiesHtml = smoothiesMatch ? smoothiesMatch[1].replace(/<div class="product-card fade-up"/g, '<div class="product-card fade-up" data-category="smoothies"') : '';
let snacksHtml = snacksMatch ? snacksMatch[1].replace(/<div class="product-card fade-up"/g, '<div class="product-card fade-up" data-category="snacks"') : '';

html = html.replace(/<!-- ================= VIEW: BOWLS ================= -->[\s\S]*?<\/section>\s*<\/div>/, '');
html = html.replace(/<!-- ================= VIEW: JUICES ================= -->[\s\S]*?<\/section>\s*<\/div>/, '');
html = html.replace(/<!-- ================= VIEW: SMOOTHIES ================= -->[\s\S]*?<\/section>\s*<\/div>/, '');
html = html.replace(/<!-- ================= VIEW: SNACKS ================= -->[\s\S]*?<\/section>\s*<\/div>/, '');

html = html.replace(/data-view="view-bowls"/g, 'data-filter="bowls"');
html = html.replace(/data-view="view-juices"/g, 'data-filter="juices"');
html = html.replace(/data-view="view-smoothies"/g, 'data-filter="smoothies"');
html = html.replace(/data-view="view-snacks"/g, 'data-filter="snacks"');
html = html.replace(/<button class="filter-pill active" data-view="view-products">All Categories<\/button>/g, '<button class="filter-pill active" data-filter="all">All Categories</button>');

const insertPoint = '                    </div>\n                </div>\n            </section>\n        </div>';
const newGrid = `                    </div>\n                    <div class="product-grid" id="main-product-grid" style="display: none;">\n${bowlsHtml}${juicesHtml}${smoothiesHtml}${snacksHtml}                    </div>\n                </div>\n            </section>\n        </div>`;

html = html.replace(insertPoint, newGrid);

fs.writeFileSync('index.html', html);
console.log('Done!');
