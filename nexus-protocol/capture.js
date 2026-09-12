const { execFile } = require('child_process');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\40bdb214-1e48-4d91-a9b2-af4aa0bc3590\\screenshots';

const pages = [
  { name: 'missions.png', url: 'http://localhost:3000/missions' },
  { name: 'shop.png', url: 'http://localhost:3000/shop' },
  { name: 'inventory.png', url: 'http://localhost:3000/inventory' },
  { name: 'achievements.png', url: 'http://localhost:3000/achievements' },
];

function capture(item) {
  return new Promise((resolve) => {
    const outFile = path.join(outDir, item.name);
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--window-size=1280,900',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=2500',
      `--screenshot=${outFile}`,
      item.url,
    ];

    execFile(edgePath, args, { timeout: 15000 }, (err) => {
      if (err) {
        console.warn('Capture note:', item.name, err.message);
      } else {
        console.log('✓ Captured', item.name);
      }
      resolve();
    });
  });
}

async function run() {
  for (const p of pages) {
    await capture(p);
  }
  console.log('Done captures.');
}

run();
