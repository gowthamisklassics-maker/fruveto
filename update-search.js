const fs = require('fs');
let jsCode = fs.readFileSync('js/script.js', 'utf8');

jsCode = jsCode.replace(/category: 'view-bowls'/g, "category: 'bowls'");
jsCode = jsCode.replace(/category: 'view-juices'/g, "category: 'juices'");
jsCode = jsCode.replace(/category: 'view-smoothies'/g, "category: 'smoothies'");
jsCode = jsCode.replace(/category: 'view-snacks'/g, "category: 'snacks'");

const oldSearchClick = `                const viewId = row.getAttribute('data-view');
                closeAllModals();
                window.location.hash = viewToHashMap[viewId] || '#home';`;

const newSearchClick = `                const filterId = row.getAttribute('data-view');
                closeAllModals();
                window.location.hash = '#' + filterId;`;

jsCode = jsCode.replace(oldSearchClick, newSearchClick);

fs.writeFileSync('js/script.js', jsCode);
console.log('Search fixed!');
