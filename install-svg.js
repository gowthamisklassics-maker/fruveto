const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const advancedSvg = `
<div class="official-glass-logo">
    <svg width="240" height="65" viewBox="0 0 240 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="fru-grad" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#2A7B44"/>
                <stop offset="100%" stop-color="#123B20"/>
            </linearGradient>
            <linearGradient id="v-grad" x1="70" y1="0" x2="70" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#8CE838"/>
                <stop offset="100%" stop-color="#5B9322"/>
            </linearGradient>
            <linearGradient id="eto-grad" x1="100" y1="0" x2="100" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#FFB347"/>
                <stop offset="100%" stop-color="#E07010"/>
            </linearGradient>
            <filter id="text-shadow" x="-5" y="-5" width="250" height="75" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.1"/>
            </filter>
        </defs>
        
        <g filter="url(#text-shadow)">
            <!-- Fruveto Text -->
            <text x="15" y="38" font-family="'Inter', sans-serif" font-weight="700" font-size="38" fill="url(#fru-grad)">Fru</text>
            
            <!-- v -->
            <text x="76" y="38" font-family="'Inter', sans-serif" font-weight="700" font-size="38" fill="url(#v-grad)">v</text>
            
            <!-- eto -->
            <text x="100" y="38" font-family="'Inter', sans-serif" font-weight="700" font-size="38" fill="url(#eto-grad)">eto</text>
        </g>

        <!-- Leaf over v -->
        <path d="M 94 13 C 102 12, 107 15, 108 20 C 108 23, 102 24, 96 25 C 88 26, 88 18, 94 13 Z" fill="url(#v-grad)"/>
        <path d="M 94 13 C 98 16, 102 19, 108 20" stroke="#123B20" stroke-width="1.5" fill="none" opacity="0.6"/>
        
        <!-- Tagline Lines -->
        <line x1="15" y1="55" x2="55" y2="55" stroke="#1E5631" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="195" y1="55" x2="235" y2="55" stroke="#1E5631" stroke-width="1.5" stroke-linecap="round"/>
        
        <!-- Tagline Text -->
        <text x="125" y="58.5" font-family="'Inter', sans-serif" font-weight="700" font-size="10" fill="#222222" letter-spacing="2" text-anchor="middle">FRESH. PURE. NATURAL.</text>
    </svg>
</div>
`;

html = html.replace(/<div class="official-glass-logo">[\s\S]*?<\/svg>\s*<\/div>/, advancedSvg.trim());
fs.writeFileSync('index.html', html);
console.log('Advanced SVG installed!');
