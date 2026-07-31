import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT = path.join(process.cwd(), 'public', 'images');
fs.mkdirSync(OUT, { recursive: true });

// Shared aesthetic suffix to keep the pool cohesive: warm, matte, cinematic, quiet.
const STYLE = 'matte warm cinematic photography, soft directional side light, muted earthy palette of bone parchment espresso tobacco and stone, fine film grain, understated heritage luxury tailoring atmosphere, no text, no watermark, no logos';

const jobs = [
  { name: 'hero.jpg', size: '768x1344', prompt: `Extreme close-up of a master tailor's hands marking white chalk lines on dark midnight wool cloth spread across a wooden cutting table, scissors and tailor's chalk nearby, shallow depth of field, intimate quiet craftsmanship. ${STYLE}` },
  { name: 'cloth-chalk.jpg', size: '768x1344', prompt: `Macro detail of white tailor's chalk measurement marks and basting stitches on warm charcoal wool suiting fabric, soft folds, directional light raking across the cloth. ${STYLE}` },
  { name: 'fabric-rolls.jpg', size: '768x1344', prompt: `Stacked rolls of fine wool, linen and cotton suiting fabrics in tobacco, espresso, stone and bone tones on wooden shelves of a quiet tailoring atelier, warm ambient light. ${STYLE}` },
  { name: 'tailoring-bench.jpg', size: '768x1344', prompt: `A tailoring workbench with polished shears, spools of thread, wooden bobbins, measuring tape and a half-finished jacket, warm side light, organized craft. ${STYLE}` },
  { name: 'suit-lapel.jpg', size: '768x1344', prompt: `Close-up of a notch lapel on a dark espresso wool bespoke suit on a mannequin, pick-stitching visible along the edge, subtle sheen, restrained elegance. ${STYLE}` },
  { name: 'shirt-detail.jpg', size: '768x1344', prompt: `Close-up of a crisp ivory cotton poplin shirt cuff with mother-of-pearl buttons and a refined collar, softly lit against a warm bone background, fine cloth texture. ${STYLE}` },
  { name: 'trousers-detail.jpg', size: '768x1344', prompt: `Neatly folded tobacco Irish linen trousers with a sharp centre crease, laid on a warm wooden surface, side light revealing the weave, quiet composition. ${STYLE}` },
  { name: 'ethnic-textile.jpg', size: '768x1344', prompt: `Subtle handwoven Indian silk and cotton textile in muted gold, tobacco and bone tones with a restrained woven motif, draped in soft folds, dignified not ornamental, warm light. ${STYLE}` },
  { name: 'ready-made-look.jpg', size: '768x1344', prompt: `Full editorial menswear look, a model in a softly tailored tobacco linen suit and ivory shirt, standing in warm directional light against a bone plaster wall, understated, contemporary heritage. ${STYLE}` },
  { name: 'atelier.jpg', size: '768x1344', prompt: `Quiet interior of a contemporary Bengaluru tailoring atelier, wooden cutting table, fabric rolls, a mannequin with a half-made jacket, warm afternoon light through tall windows, calm and considered. ${STYLE}` },
];

async function run() {
  const zai = await ZAI.create();
  for (const job of jobs) {
    const outPath = path.join(OUT, job.name);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 20000) {
      console.log(`skip (exists): ${job.name}`);
      continue;
    }
    try {
      console.log(`generating: ${job.name} [${job.size}]`);
      const res = await zai.images.generations.create({ prompt: job.prompt, size: job.size });
      const b64 = res.data[0].base64;
      fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
      console.log(`ok: ${job.name} (${fs.statSync(outPath).size} bytes)`);
    } catch (e) {
      console.error(`fail: ${job.name} -> ${e.message}`);
    }
  }
  console.log('IMAGE_GEN_DONE');
}

run();
