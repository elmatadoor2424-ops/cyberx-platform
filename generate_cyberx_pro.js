const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const targetPrompt = "A high-end 3D cinematic promotional poster for CyberX digital power platform. Dark obsidian futuristic background, glowing neon cyan and electric purple holographic cyber shield, intricate AI circuit networks, photorealistic 8k resolution, Unreal Engine 5 style, volumetric lighting, hyper-detailed, sleek high-tech corporate aesthetic.";

async function generateCyberXPro() {
  console.log("=== بدء توليد بوستر CyberX_Pro.png وفق المواصفات المحددة ===");
  console.log("-> البرومبت:", targetPrompt);

  const targetDir = 'C:\\Users\\Dell\\Desktop\\CyberX_Outputs';
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetFile = path.join(targetDir, 'CyberX_Pro.png');

  const pollUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(targetPrompt)}?width=1080&height=1920&model=flux&seed=42&nologo=true`;
  console.log("\n[1] إرسال الطلب إلى Pollinations.ai (Flux - Unreal Engine 5 Style)...");
  
  const res = await fetch(pollUrl);
  if (!res.ok) {
    throw new Error(`Pollinations HTTP Error: ${res.status}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  console.log(`-> تم استلام الصورة بنجاح! الحجم: ${(buffer.length / 1024).toFixed(2)} KB`);

  console.log("\n[2] حفظ الصورة باسم CyberX_Pro.png...");
  fs.writeFileSync(targetFile, buffer);
  console.log(`-> تم حفظ الملف بنجاح في: ${targetFile}`);

  console.log("\n[3] فتح الصورة على الشاشة فوراً...");
  exec(`start "" "${targetFile}"`, (err) => {
    if (err) console.error("Error opening image:", err);
    else console.log("-> تم فتح CyberX_Pro.png في عارض الصور على الشاشة بنجاح!");
  });
}

generateCyberXPro().catch(err => {
  console.error("خطأ:", err);
  process.exit(1);
});
