const fs = require('fs');
const path = require('path');
const https = require('https');
const { exec } = require('child_process');

const geminiKey = 'AIzaSyD-ScFqP59b-IZXxP7rSIflFAheseRU6UY';
const kieKey = '6957a0e1e488db0c3f6f86d086cf0970';

// Configuration inputs
const campaignConfig = {
  packageName: 'CyberX Enterprise Shield Pro',
  discountRate: 'خصم 40% لفترة محدودة (40% OFF)',
  marketingText: 'حماية سحابية ذكية مدعومة بالذكاء الاصطناعي السيبراني ضد الهجمات المتقدمة 24/7',
  aspectRatio: '9:16', // '9:16' | '1:1' | '16:9'
  useFaceReference: true,
  referenceImage: 'avatar.jpg' // inside Assets folder
};

function httpsPost(urlStr, dataObj, customHeaders = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const postData = typeof dataObj === 'string' ? dataObj : JSON.stringify(dataObj);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: 'POST',
      family: 4,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        ...customHeaders
      }
    };
    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function httpsGet(urlStr, customHeaders = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: 'GET',
      family: 4,
      headers: customHeaders
    };
    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function uploadReferenceImage(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
    const form = new FormData();
    form.append('file', blob, path.basename(filePath));

    const res = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: form
    });
    const data = await res.json();
    if (data.data && data.data.url) {
      return data.data.url.replace(/^http:\/\/tmpfiles\.org\/(\d+)\/(.*)$/i, 'https://tmpfiles.org/dl/$1/$2');
    }
  } catch (e) {
    console.error('Upload reference failed:', e.message);
  }
  return null;
}

async function runCampaign() {
  console.log('=== [1] بدء تشغيل أتمتة بوستر CyberX الديناميكي ===');
  console.log('البيانات المدخلة:', JSON.stringify(campaignConfig, null, 2));

  let publicImageUrl = null;
  if (campaignConfig.useFaceReference) {
    const assetPath = path.join(__dirname, 'Assets', campaignConfig.referenceImage);
    if (fs.existsSync(assetPath)) {
      console.log('\n[2] قراءة الصورة المرجعية من مجلد Assets ورفعها:', assetPath);
      publicImageUrl = await uploadReferenceImage(assetPath);
      console.log('-> رابط الصورة المرجعية المباشر:', publicImageUrl);
    }
  }

  console.log('\n[3] تشغيل Gemini 2.5 Flash لصياغة البرومبت السينمائي المخصص...');
  const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + geminiKey;
  
  const systemPrompt = `You are the Lead Visual AI Director & Creative Prompt Engineer for CyberX — the premier enterprise AI solutions and cybersecurity defense platform.
Your task is to transform promotional campaign details into a master 3D cinematic poster prompt for Nano Banana Pro (Google Imagen 3).
Design Rules:
1. Palette: Deep obsidian dark background (#0B0F19), glowing Neon Cyan (#00F0FF), vibrant Electric Magenta (#FF007F).
2. Prominently incorporate high-tech holographic UI typography displaying the Package Name, and an illuminated glowing neon badge displaying the Discount Rate.
3. If face reference is provided, instruct: "Preserve the facial identity, facial structure, and features of the person in the reference image, stylizing them as an elite CyberX Chief Security Officer / digital executive wearing sleek dark obsidian cyber defense armor with illuminated neon cyan and magenta circuit inlays".
4. Set the visual composition to match the aspect ratio: ${campaignConfig.aspectRatio}.
5. Output valid JSON only:
{
  "image_prompt": "detailed cinematic prompt in English",
  "headline": "headline"
}`;

  const promptInput = `
Package Name: ${campaignConfig.packageName}
Discount: ${campaignConfig.discountRate}
Marketing Text: ${campaignConfig.marketingText}
Aspect Ratio: ${campaignConfig.aspectRatio}
Has Face Reference: ${campaignConfig.useFaceReference}
`;

  const geminiData = await httpsPost(geminiUrl, {
    contents: [{ role: 'user', parts: [{ text: systemPrompt + '\n\nCampaign:\n' + promptInput }] }],
    generationConfig: { responseMimeType: 'application/json' }
  });

  const parsed = JSON.parse(geminiData.candidates[0].content.parts[0].text);
  console.log('\n-> البرومبت الذي صاغه Gemini بنجاح:');
  console.log(parsed.image_prompt);

  console.log('\n[4] إرسال مهمة التوليد إلى Nano Banana Pro (kie.ai)...');
  const taskBody = {
    model: 'nano-banana-pro',
    input: {
      prompt: parsed.image_prompt,
      aspect_ratio: campaignConfig.aspectRatio,
      resolution: '2K',
      output_format: 'png'
    }
  };
  if (publicImageUrl) {
    taskBody.input.image_urls = [publicImageUrl];
  }

  const kieData = await httpsPost(
    'https://api.kie.ai/api/v1/jobs/createTask',
    taskBody,
    { 'Authorization': 'Bearer ' + kieKey }
  );
  const taskId = kieData.data?.taskId;
  console.log('-> معرف المهمة على kie.ai:', taskId);

  console.log('\n[5] جاري انتظار اكتمال التوليد من الذكاء الاصطناعي...');
  let resultImageUrl = null;
  for (let i = 1; i <= 25; i++) {
    await new Promise(r => setTimeout(r, 4000));
    const pollJson = await httpsGet(
      'https://api.kie.ai/api/v1/jobs/recordInfo?taskId=' + taskId,
      { 'Authorization': 'Bearer ' + kieKey }
    );
    const state = pollJson.data?.state;
    console.log(`- فحص ${i}: الحالة = ${state}`);
    if (state === 'success') {
      const resJson = JSON.parse(pollJson.data?.resultJson || '{}');
      resultImageUrl = resJson.resultUrls?.[0] || pollJson.data?.response?.resultUrls?.[0];
      break;
    }
    if (state === 'fail') {
      throw new Error('Image generation failed: ' + pollJson.data?.failMsg);
    }
  }

  if (!resultImageUrl) {
    throw new Error('Timeout waiting for image generation');
  }

  console.log('\n[6] تنزيل البوستر النهائي من:', resultImageUrl);
  const outDir = 'C:\\Users\\Dell\\Desktop\\CyberX_Outputs';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const finalFile = path.join(outDir, 'CyberX_Campaign_Poster.png');

  const imgBuf = await new Promise((resolve, reject) => {
    https.get(resultImageUrl, { family: 4 }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });

  fs.writeFileSync(finalFile, imgBuf);
  console.log(`-> تم حفظ البوستر بنجاح في: ${finalFile} (الحجم: ${(imgBuf.length / 1024).toFixed(2)} KB)`);

  console.log('\n[7] فتح البوستر على الشاشة فوراً...');
  exec(`start "" "${finalFile}"`, (err) => {
    if (!err) console.log('-> تم فتح CyberX_Campaign_Poster.png على الشاشة بنجاح!');
  });
}

runCampaign().catch(err => {
  console.error('حدث خطأ:', err);
  process.exit(1);
});
