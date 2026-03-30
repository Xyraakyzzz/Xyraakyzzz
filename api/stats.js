// api/stats.j
export default function handler(req, res) {
  // CORS publik
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "image/svg+xml");

  // Realtime data
  const totalContributions = "100.110.000"; // bisa diganti realtime
  const currentStreak = "999+";             // bisa diganti realtime
  const longestStreak = "9999+";            // bisa diganti realtime

  const today = new Date();
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const formattedDate = `${monthNames[today.getMonth()]} ${today.getDate()}`;

  // SVG kamu asli (tidak diubah) tapi angka diganti realtime
  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
                style='isolation: isolate' viewBox='0 0 495 195' width='495px' height='195px' direction='ltr'>
<style>
@keyframes currstreak {0% { font-size: 3px; opacity: 0.2; } 80% { font-size: 34px; opacity: 1; } 100% { font-size: 28px; opacity: 1; }}
@keyframes fadein {0% { opacity: 0; } 100% { opacity: 1; }}
.heart path:last-child { animation: fireGlow 1s infinite alternate; }
@keyframes fireGlow {0%{fill:#ff3300;filter:drop-shadow(0 0 4px #ff4500);transform:scale(1) translateY(0);}40%{fill:#ff6600;filter:drop-shadow(0 0 10px #ff9900);transform:scale(1.05) translateY(-2px);}80%{fill:#ff6600;filter:drop-shadow(0 0 10px #ff8800);transform:scale(1.05) translateY(-1px);}100%{fill:#ff3300;filter:drop-shadow(0 0 6px #ff4400);transform:scale(1) translateY(0);}}
</style>
<!-- ...semua defs, clipPath, mask tetap sama... -->
<g clip-path='url(#outer_rectangle)'>
  <!-- Total Contributions -->
  <g transform='translate(82.5,48)'>
    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#151515' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.6s'>
      ${totalContributions}
    </text>
  </g>

  <!-- Current Streak -->
  <g transform='translate(247.5,48)'>
    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#FF0000' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='animation: currstreak 0.6s linear forwards'>
      ${currentStreak}
    </text>
  </g>
  <g transform='translate(247.5,145)'>
    <text x='0' y='21' stroke-width='0' text-anchor='middle' fill='#464646' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
      ${formattedDate}
    </text>
  </g>

  <!-- Longest Streak -->
  <g transform='translate(412.5,48)'>
    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 1.2s'>
      ${longestStreak}
    </text>
  </g>
</g>
</svg>
`;

  res.status(200).send(svg);
}
