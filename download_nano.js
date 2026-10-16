const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

async function downloadAndOpen() {
  const imageUrl = 'https://tempfile.aiquickdraw.com/workers/images/image_213486729fa9a09902aca83c62d87b67.png';
  const outDir = 'C:\\Users\\Dell\\Desktop\\CyberX_Outputs';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outFile = path.join(outDir, 'CyberX_Nano.png');

  console.log('Downloading Nano Banana Pro image from:', imageUrl);
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error('Fetch failed: ' + res.status);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outFile, buffer);
  console.log('Saved image successfully to:', outFile, 'Size:', (buffer.length / 1024).toFixed(2), 'KB');

  exec(`start "" "${outFile}"`, (err) => {
    if (err) console.error('Error opening file:', err);
    else console.log('Image opened on screen successfully!');
  });
}

downloadAndOpen().catch(console.error);
