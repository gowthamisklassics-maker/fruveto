const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const superAdvancedSvg = `
<div class="official-glass-logo">
    <svg width="250" height="70" viewBox="0 0 250 70" fill="none" xmlns="http://www.w3.org/2000/svg" class="animated-logo">
        <defs>
            <!-- Vibrant Multi-stop Gradients -->
            <linearGradient id="fru-grad-adv" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#34A853"/>
                <stop offset="40%" stop-color="#1E5631"/>
                <stop offset="100%" stop-color="#0A2814"/>
            </linearGradient>
            
            <linearGradient id="v-grad-adv" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#A5F24D"/>
                <stop offset="50%" stop-color="#74B72E"/>
                <stop offset="100%" stop-color="#3C6E12"/>
            </linearGradient>
            
            <linearGradient id="eto-grad-adv" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFC078"/>
                <stop offset="50%" stop-color="#F28C28"/>
                <stop offset="100%" stop-color="#A65810"/>
            </linearGradient>

            <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#B7F566"/>
                <stop offset="60%" stop-color="#74B72E"/>
                <stop offset="100%" stop-color="#2D540E"/>
            </linearGradient>

            <!-- Multi-layered 3D Drop Shadow -->
            <filter id="ultra-shadow" x="-10" y="-10" width="300" height="100" filterUnits="userSpaceOnUse">
                <!-- Inner Bevel simulation -->
                <feOffset dx="1" dy="1" in="SourceAlpha" result="off1"/>
                <feGaussianBlur stdDeviation="0.5" result="blur1"/>
                <feComposite operator="out" in="SourceGraphic" in2="blur1" result="bevel"/>
                <!-- Outer Drop Shadow -->
                <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.15" result="shadow1"/>
                <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#1E5631" flood-opacity="0.1" result="shadow2"/>
                <!-- Merge -->
                <feMerge>
                    <feMergeNode in="shadow2"/>
                    <feMergeNode in="shadow1"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        <g filter="url(#ultra-shadow)">
            <!-- Fruveto Text -->
            <text x="18" y="42" font-family="'Inter', sans-serif" font-weight="800" font-size="42" fill="url(#fru-grad-adv)">Fru</text>
            
            <!-- v -->
            <text x="86" y="42" font-family="'Inter', sans-serif" font-weight="800" font-size="42" fill="url(#v-grad-adv)">v</text>
            
            <!-- eto -->
            <text x="113" y="42" font-family="'Inter', sans-serif" font-weight="800" font-size="42" fill="url(#eto-grad-adv)">eto</text>
        </g>

        <!-- Leaf over v -->
        <g filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.2))">
            <path d="M 106 14 C 115 13, 121 16, 122 22 C 122 25, 115 27, 108 28 C 98 29, 98 20, 106 14 Z" fill="url(#leaf-grad)"/>
            <path d="M 106 14 C 111 18, 115 21, 122 22" stroke="#1E5631" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
        </g>
        
        <!-- Tagline Lines (Gradient) -->
        <line x1="18" y1="60" x2="65" y2="60" stroke="url(#fru-grad-adv)" stroke-width="2" stroke-linecap="round"/>
        <line x1="205" y1="60" x2="245" y2="60" stroke="url(#eto-grad-adv)" stroke-width="2" stroke-linecap="round"/>
        
        <!-- Tagline Text -->
        <text x="135" y="63" font-family="'Inter', sans-serif" font-weight="800" font-size="10" fill="#333333" letter-spacing="2.5" text-anchor="middle">FRESH. PURE. NATURAL.</text>
    </svg>
</div>
`;

html = html.replace(/<div class="official-glass-logo">[\s\S]*?<\/svg>\s*<\/div>/, superAdvancedSvg.trim());
fs.writeFileSync('index.html', html);
console.log('Super advanced SVG installed!');
