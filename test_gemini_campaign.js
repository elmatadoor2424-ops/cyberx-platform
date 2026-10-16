const geminiKey = 'AIzaSyD-ScFqP59b-IZXxP7rSIflFAheseRU6UY';
const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + geminiKey;

async function testGemini() {
  const systemInstruction = `You are the Elite Creative Director & Visual Designer for CyberX, a high-tech cybersecurity & digital power platform.
Your job is to transform promotional campaign details into a master 3D cinematic poster prompt for image generation models (Nano Banana Pro / Imagen 3).
Rules:
1. Always weave in the official CyberX color palette: glowing Neon Cyan (#00F0FF), Electric Magenta (#FF007F), and deep obsidian dark background (#0B0F19).
2. Integrate the package name and discount rate naturally into high-tech holographic UI banners, glowing neon badges, and futuristic digital typography.
3. If face reference is provided, explicitly preserve the facial identity, structure, and features of the person from the reference image, stylizing them as the CyberX Chief Security Officer / digital commander wearing obsidian cyber armor with glowing fiber optics.
4. Set the aspect ratio composition appropriately (9:16 vertical poster, 1:1 square, or 16:9 widescreen).
5. Output ONLY valid JSON:
{
  "image_prompt": "full detailed cinematic English prompt",
  "headline": "headline text",
  "discount_badge": "discount badge text",
  "aspect_ratio": "9:16"
}`;

  const campaign = `
Package Name: باقة CyberX Enterprise Shield Pro
Discount: خصم 40% لفترة محدودة
Marketing Text: حماية سحابية ذكية مدعومة بالذكاء الاصطناعي السيبراني ضد الهجمات المتقدمة 24/7
Aspect Ratio: 9:16
Has Face Reference: true (Preserve facial identity of the executive in the reference image)
`;

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: systemInstruction + '\n\nCampaign:\n' + campaign }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json'
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (data.candidates && data.candidates[0]) {
    console.log("Success! Gemini Output:");
    console.log(data.candidates[0].content.parts[0].text);
  } else {
    console.error("Error:", JSON.stringify(data, null, 2));
  }
}

testGemini().catch(console.error);
