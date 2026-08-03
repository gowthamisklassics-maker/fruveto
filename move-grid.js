const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startStr = '<div class="product-grid" id="main-product-grid" style="display: none;">';
const endIndex = html.indexOf('<!-- ================= VIEW: PRODUCTS');

if (endIndex === -1) {
    console.log('Not found');
    process.exit(1);
}
const startIndex = html.indexOf(startStr);

let chunkToMove = html.substring(startIndex, endIndex);

const match = chunkToMove.match(/([\s\S]*?)(\s*<\/div>\s*<\/div>\s*<\/section>\s*<\/div>\s*)$/);
let pureGrid = match[1];
let closingTags = match[2];

html = html.replace(pureGrid, '');

const endOfCategoryGridRegex = /(<div class="category-card fade-up cursor-pointer" style="transition-delay: 0.3s" data-filter="snacks">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/;

html = html.replace(endOfCategoryGridRegex, `$1\n                    ${pureGrid}`);

fs.writeFileSync('index.html', html);
console.log('Moved product grid!');
