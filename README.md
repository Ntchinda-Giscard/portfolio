# Portfolio — talking-video edition

A one-page developer portfolio built with Next.js. A 3D character introduces you in the hero, standing in front of your name. Below it are an ID badge you can flip, a "periodic table" of your stack, an expanding project showcase, certifications, a timeline, a horizontally scrolling achievements strip and a contact section.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (the page is fully static)
npm start          # serve the production build
```

The round **N** badge in the bottom-left corner only appears in `npm run dev`. It is the Next.js dev indicator and is not part of the site.

## Make it yours

All text and numbers live in **`src/content/portfolio.ts`**: your name, role, links, facts, skills, projects, certifications, timeline and achievements. Edit that one file to update the site.

- **Résumé:** put your PDF at `public/resume.pdf`. Every "Résumé" button links there.
- **Logos:** the skill tiles and tech chips use the SVGs in `public/logos`. Add a new one by dropping `name.svg` in that folder and referencing it as `logo: "name"`.
- **Certifications:** add `url` to an entry to make that row a link.
- **Favicon:** `src/app/icon.svg` holds your initials.

## The hero video

`public/hero/intro.mp4` is a *stacked-alpha* video. Each frame holds the character's colour on top and a transparency mask below. `src/components/HeroStage.tsx` recombines the two with a small WebGL shader. That lets the character stand on the page with no video rectangle, in every browser including Safari.

- **Play/pause** sits under the nav.
- **Speaker button** plays the intro once with sound, then returns to the silent loop.
- **Fallback:** if WebGL is unavailable or the visitor prefers reduced motion, the transparent first frame (`poster.webp`) is shown instead.

### Swapping in a new intro video

You need Python 3.10+ and ffmpeg. Run from the project root:

```bash
python -m venv .hero-venv
.hero-venv/Scripts/pip install onnxruntime numpy pillow      # macOS/Linux: .hero-venv/bin/pip
curl -L -o .hero-tmp/rvm.onnx --create-dirs \
  https://github.com/PeterL1n/RobustVideoMatting/releases/download/v1.0.0/rvm_mobilenetv3_fp32.onnx

# 1) cut the character out (about 3 minutes for 10 s of 720p on a laptop CPU)
.hero-venv/Scripts/python scripts/hero/matte.py my-intro.mp4 .hero-tmp/rvm.onnx .hero-tmp/alpha
# 2) build intro.mp4, poster.webp and portrait.webp (the ID-card photo)
.hero-venv/Scripts/python scripts/hero/compose.py my-intro.mp4 .hero-tmp/alpha public/hero
```

Clips work best with the character standing full-body, centred, on a plain light background (the Google Flow / Veo output style). Pass a frame number as a fourth argument to `compose.py` to choose a different ID-card photo.

## Deploy

Push to GitHub and import the repository on [Vercel](https://vercel.com/new). Any host that runs `npm run build && npm start` also works.
