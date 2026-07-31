#!/usr/bin/env bash
set -u
cd /home/z/my-project
OUT=public/images
mkdir -p "$OUT"
STYLE="matte warm cinematic photography, soft directional side light, muted earthy palette of bone parchment espresso tobacco and stone, fine film grain, understated heritage luxury tailoring atmosphere, no text, no watermark, no logos"

gen() {
  local name="$1"; local size="$2"; local prompt="$3"
  local f="$OUT/$name"
  if [ -f "$f" ] && [ "$(stat -c%s "$f" 2>/dev/null || echo 0)" -gt 20000 ]; then
    echo "skip (exists): $name"; return
  fi
  echo "generating: $name [$size]"
  if timeout 150 z-ai image -p "$prompt" -o "$f" -s "$size" >/dev/null 2>&1; then
    echo "ok: $name ($(stat -c%s "$f" 2>/dev/null) bytes)"
  else
    echo "fail: $name (exit $?)"
  fi
}

gen hero.jpg 768x1344 "Extreme close-up of a master tailor's hands marking white chalk lines on dark midnight wool cloth spread across a wooden cutting table, scissors and tailor's chalk nearby, shallow depth of field, intimate quiet craftsmanship. $STYLE"
gen cloth-chalk.jpg 768x1344 "Macro detail of white tailor's chalk measurement marks and basting stitches on warm charcoal wool suiting fabric, soft folds, directional light raking across the cloth. $STYLE"
gen fabric-rolls.jpg 768x1344 "Stacked rolls of fine wool, linen and cotton suiting fabrics in tobacco, espresso, stone and bone tones on wooden shelves of a quiet tailoring atelier, warm ambient light. $STYLE"
gen tailoring-bench.jpg 768x1344 "A tailoring workbench with polished shears, spools of thread, wooden bobbins, measuring tape and a half-finished jacket, warm side light, organized craft. $STYLE"
gen suit-lapel.jpg 768x1344 "Close-up of a notch lapel on a dark espresso wool bespoke suit on a mannequin, pick-stitching visible along the edge, subtle sheen, restrained elegance. $STYLE"
gen shirt-detail.jpg 768x1344 "Close-up of a crisp ivory cotton poplin shirt cuff with mother-of-pearl buttons and a refined collar, softly lit against a warm bone background, fine cloth texture. $STYLE"
gen trousers-detail.jpg 768x1344 "Neatly folded tobacco Irish linen trousers with a sharp centre crease, laid on a warm wooden surface, side light revealing the weave, quiet composition. $STYLE"
gen ethnic-textile.jpg 768x1344 "Subtle handwoven Indian silk and cotton textile in muted gold, tobacco and bone tones with a restrained woven motif, draped in soft folds, dignified not ornamental, warm light. $STYLE"
gen ready-made-look.jpg 768x1344 "Full editorial menswear look, a model in a softly tailored tobacco linen suit and ivory shirt, standing in warm directional light against a bone plaster wall, understated, contemporary heritage. $STYLE"
gen atelier.jpg 768x1344 "Quiet interior of a contemporary Bengaluru tailoring atelier, wooden cutting table, fabric rolls, a mannequin with a half-made jacket, warm afternoon light through tall windows, calm and considered. $STYLE"

echo "IMAGE_GEN_DONE"
ls -la "$OUT"
