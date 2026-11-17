import fs from 'node:fs';
import path from 'node:path';
import ws from 'ws';
import { createClient } from '@supabase/supabase-js';

if (!globalThis.WebSocket) {
  globalThis.WebSocket = ws;
}

const ROOT = process.cwd();
const SEED_PATH = path.join(ROOT, 'src', 'data', 'seedProjects.ts');
const ENV_PATH = path.join(ROOT, '.env.local');
const PUBLIC_PROJECTS_DIR = path.join(ROOT, 'public', 'projects');

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateProjectSvgs(id, title, category, techStack, highlights, owner, repoName) {
  const dir = path.join(PUBLIC_PROJECTS_DIR, id);
  fs.mkdirSync(dir, { recursive: true });

  const accent =
    category === 'AI & Machine Learning'
      ? '#a855f7'
      : category === 'Lakehouse & BI'
      ? '#38bdf8'
      : category === 'Distributed Systems'
      ? '#6366f1'
      : '#22d3ee';

  const pills = techStack
    .slice(0, 5)
    .map((t, i) => {
      const x = 64 + i * 165;
      return `<rect x="${x}" y="310" width="150" height="36" rx="18" fill="rgba(255,255,255,0.06)" stroke="${accent}" stroke-opacity="0.45"/>
      <text x="${x + 75}" y="333" font-family="Inter,Segoe UI,sans-serif" font-size="13" fill="#e2e8f0" text-anchor="middle">${escapeXml(t.slice(0, 16))}</text>`;
    })
    .join('\n');

  const bulletLines = highlights
    .slice(0, 4)
    .map((h, i) => {
      const y = 175 + i * 58;
      return `<rect x="64" y="${y}" width="1072" height="44" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
      <circle cx="88" cy="${y + 22}" r="5" fill="${accent}"/>
      <text x="108" y="${y + 27}" font-family="Inter,Segoe UI,sans-serif" font-size="14" fill="#cbd5e1">${escapeXml(h.slice(0, 105))}${h.length > 105 ? '...' : ''}</text>`;
    })
    .join('\n');

  const overviewSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="55%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#0b1120"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="32" y="32" width="1136" height="566" rx="24" fill="rgba(15,23,42,0.72)" stroke="rgba(255,255,255,0.12)"/>
  <rect x="64" y="68" width="210" height="32" rx="16" fill="${accent}" fill-opacity="0.16" stroke="${accent}" stroke-opacity="0.5"/>
  <text x="169" y="89" font-family="monospace" font-size="13" font-weight="bold" fill="${accent}" text-anchor="middle">${escapeXml(category.toUpperCase())}</text>
  <text x="64" y="155" font-family="Inter,Segoe UI,sans-serif" font-size="44" font-weight="800" fill="#f8fafc">${escapeXml(title.slice(0, 42))}</text>
  <text x="64" y="200" font-family="monospace" font-size="18" fill="#94a3b8">github.com/${escapeXml(owner)}/${escapeXml(repoName)}</text>
  ${pills}
  <rect x="64" y="385" width="1072" height="170" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
  <text x="90" y="422" font-family="monospace" font-size="13" fill="${accent}">PROJECT OVERVIEW &amp; CAPABILITIES</text>
  <text x="90" y="458" font-family="Inter,Segoe UI,sans-serif" font-size="16" fill="#cbd5e1">${escapeXml((highlights[0] || title).slice(0, 96))}</text>
  <text x="90" y="492" font-family="Inter,Segoe UI,sans-serif" font-size="16" fill="#94a3b8">${escapeXml((highlights[1] || 'Full documentation &amp; source code available on GitHub.').slice(0, 96))}</text>
  <text x="90" y="526" font-family="Inter,Segoe UI,sans-serif" font-size="16" fill="#94a3b8">${escapeXml((highlights[2] || '').slice(0, 96))}</text>
</svg>`;

  const archSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#070b14"/>
  <rect x="32" y="32" width="1136" height="566" rx="24" fill="rgba(15,23,42,0.8)" stroke="rgba(255,255,255,0.12)"/>
  <text x="64" y="88" font-family="monospace" font-size="14" fill="${accent}">ARCHITECTURE &amp; KEY HIGHLIGHTS</text>
  <text x="64" y="132" font-family="Inter,Segoe UI,sans-serif" font-size="32" font-weight="700" fill="#f8fafc">${escapeXml(title.slice(0, 48))}</text>
  ${bulletLines}
  <text x="64" y="560" font-family="monospace" font-size="14" fill="#64748b">Source: https://github.com/${escapeXml(owner)}/${escapeXml(repoName)}</text>
</svg>`;

  fs.writeFileSync(path.join(dir, 'overview.svg'), overviewSvg, 'utf8');
  fs.writeFileSync(path.join(dir, 'architecture.svg'), archSvg, 'utf8');
  return [`/projects/${id}/overview.svg`, `/projects/${id}/architecture.svg`];
}

const GITHUB_USERS = ['islamsamyy', 'islam-samy'];
const EXCLUDED_REPOS = new Set([
  '-',
  'deployed-bid',
  'SPRITE-NAFS',
  'nexalytics',
  'bidjobsupload',
  'spider-',
]);

// Fallback repo list in case unauthenticated GitHub REST API is rate-limited
const FALLBACK_REPOS = [
  { name: 'nexa', owner: 'islamsamyy', branch: 'main', lang: 'HTML', desc: 'NexaLytix single-page HTML5/CSS3 corporate landing page.' },
  { name: 'nexaa', owner: 'islamsamyy', branch: 'main', lang: 'HTML', desc: 'NexaLytix standalone HTML5/CSS3 dark-theme data analytics landing page.' },
  { name: 'SHMAL-ELHEJAZ', owner: 'islamsamyy', branch: 'main', lang: 'CSS', desc: 'Tailwind CSS design tokens and Arabic subscription pricing UI snippets (Silver/Gold/Diamond).' },
  { name: 'sotexerp', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'Textile & garment manufacturing ERP (BOM, OEE, fabric inventory, quality, finance, HR, RBAC approvals).' },
  { name: 'shamalelhejaz', owner: 'islamsamyy', branch: 'main', lang: 'HTML', desc: 'Multi-vendor MENA e-commerce marketplace (Next.js 16, Prisma, Supabase) with HyperPay, Moyasar, Tap & Stripe.' },
  { name: 'naafs', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'Live reverse-auction & freelance bidding marketplace built with Next.js 16, Supabase, and next-intl.' },
  { name: 'Breast-Cancer-prediction', owner: 'islamsamyy', branch: 'main', lang: 'Jupyter Notebook', desc: 'Binary classification ML model for breast cancer diagnosis prediction.' },
  { name: 'customer-Churn-analysis', owner: 'islamsamyy', branch: 'main', lang: 'Power BI', desc: 'Power BI telecom customer churn analytics dashboard.' },
  { name: 'Iris-Flower-Classification', owner: 'islamsamyy', branch: 'main', lang: 'Jupyter Notebook', desc: 'Supervised ML classification of Iris flower species using Python and Jupyter Notebook.' },
  { name: 'Multi-Class-Prediction-of-Obesity-Risk', owner: 'islamsamyy', branch: 'main', lang: 'Jupyter Notebook', desc: 'Multi-class ML classification model for obesity risk categories.' },
  { name: 'Startup-Expansion-Analysis-', owner: 'islamsamyy', branch: 'main', lang: 'Jupyter Notebook', desc: 'Startup market expansion analysis using Python, Jupyter Notebook, and Power BI.' },
  { name: 'supply-chain-', owner: 'islamsamyy', branch: 'main', lang: 'Power BI', desc: 'Power BI supply chain analytics dashboard for shipments, products, and regional sales.' },
  { name: 'Sales-Prediction-using-Python', owner: 'islamsamyy', branch: 'main', lang: 'Jupyter Notebook', desc: 'Regression ML model predicting sales from advertising spend using Python.' },
  { name: 'Unemployment-Data-in-India', owner: 'islamsamyy', branch: 'main', lang: 'Jupyter Notebook', desc: 'Exploratory data analysis of unemployment trends in India using Python and Jupyter.' },
  { name: 'faireer', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'Modern Next.js & TypeScript web application styled with Tailwind CSS and shadcn/ui.' },
  { name: 'fakret-mashrou-final-', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'Arabic startup & investor matching platform with KYC, funding progress, Stripe checkout, and analytics.' },
  { name: 'bidjobsup', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'AI-powered Next.js 16 & Supabase bidding and freelance marketplace with Stripe and Anthropic SDK.' },
  { name: 'idea-business', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'Arabic business & startup idea submission and moderation platform built with Next.js and Supabase.' },
  { name: 'maadi-website', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'Full-stack Next.js & Supabase stone/marble manufacturing catalog, quote request, and admin portal.' },
  { name: 'spider-marketingagencyplateform', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'Black Spider Marketing Agency Platform with Stitch-extracted Tailwind design system.' },
  { name: 'Amani-KhalIi', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'Luxury bridal & occasion makeup artist platform in Riyadh with online booking, gallery, and admin CRM.' },
  { name: 'wirecut-', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'Industrial operations & costing analytics platform for wire-cut production logs, downtime, energy, and inventory.' },
  { name: 'ISLAMSAMYPROTOFILIO', owner: 'islamsamyy', branch: 'main', lang: 'TypeScript', desc: 'Interactive Next.js 15 & Three.js developer portfolio with client booking system, blog, and CRM admin.' },
];

function loadEnv(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

async function fetchRawReadme(owner, repo, branch) {
  for (const b of [branch, 'main', 'master']) {
    for (const file of ['README.md', 'readme.md', 'Readme.md']) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${b}/${file}`);
          if (res.ok) {
            return { text: await res.text(), branch: b };
          }
          if (res.status === 404) break;
        } catch {
          // retry
        }
      }
    }
  }
  return { text: '', branch };
}

function resolveImageUrl(rawSrc, owner, repo, branch) {
  if (!rawSrc) return null;
  let src = rawSrc.trim().split(/\s+/)[0].replace(/^<|>$/g, '');
  if (!src || src.startsWith('data:')) return null;
  if (/shields\.io|badgen\.net|img\.shields|travis-ci|codecov|coveralls/i.test(src)) return null;
  if (/^https?:\/\//i.test(src)) return src;
  src = src.replace(/^\.\//, '').replace(/^\/+/, '');
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${src}`;
}

function rewriteReadmeImageUrls(readme, owner, repo, branch) {
  if (!readme) return readme;
  let out = readme.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (full, alt, rawSrc) => {
    const resolved = resolveImageUrl(rawSrc, owner, repo, branch);
    if (!resolved) return full;
    return `![${alt}](${resolved})`;
  });
  out = out.replace(/<img([^>]+)src=["']([^"']+)["']/gi, (full, attrs, rawSrc) => {
    const resolved = resolveImageUrl(rawSrc, owner, repo, branch);
    if (!resolved) return full;
    return `<img${attrs}src="${resolved}"`;
  });
  return out;
}

function extractImagesFromReadme(readme, owner, repo, branch) {
  const urls = [];
  const seen = new Set();
  const mdRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
  const htmlRegex = /<img[^>]+src=["']([^"']+)["']/gi;

  for (const match of readme.matchAll(mdRegex)) {
    const resolved = resolveImageUrl(match[1], owner, repo, branch);
    if (resolved && !seen.has(resolved)) {
      seen.add(resolved);
      urls.push(resolved);
    }
  }
  for (const match of readme.matchAll(htmlRegex)) {
    const resolved = resolveImageUrl(match[1], owner, repo, branch);
    if (resolved && !seen.has(resolved)) {
      seen.add(resolved);
      urls.push(resolved);
    }
  }
  return urls;
}

async function fetchRepoTreeImages(owner, repo, branch) {
  const found = [];
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, {
      headers: { 'User-Agent': 'islam-samy-portfolio-importer', Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return found;
    const data = await res.json();
    const tree = data.tree || [];
    for (const item of tree) {
      if (item.type !== 'blob') continue;
      const p = item.path;
      if (/\.(png|jpg|jpeg|webp)$/i.test(p) && !/node_modules|\.next|favicon/i.test(p)) {
        const encodedPath = p.split('/').map(encodeURIComponent).join('/');
        found.push({
          path: p,
          url: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${encodedPath}`,
        });
      }
    }
  } catch {
    // ignore tree fetch error
  }
  // Prioritize screenshots/charts/heroes first, logos separate
  const score = (p) => {
    if (/screenshot|screens\/|stitch|docs\/images\/chart|hero/i.test(p)) return 0;
    if (/stones\/|amani|portrait/i.test(p)) return 1;
    if (/logo|mark|icon|artboard/i.test(p)) return 3;
    return 2;
  };
  found.sort((a, b) => score(a.path) - score(b.path));
  return found.map((f) => f.url);
}

async function downloadLocalAssets(id, allUrls) {
  const dir = path.join(PUBLIC_PROJECTS_DIR, id);
  fs.mkdirSync(dir, { recursive: true });
  const localGallery = [];
  let localLogo = '';

  const logoUrl = allUrls.find((u) => /logo|mark|icon|artboard/i.test(u)) || '';
  const galleryUrls = allUrls.filter((u) => u !== logoUrl).slice(0, 8);

  const downloadOne = async (url, targetName) => {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 500) return null;
      fs.writeFileSync(path.join(dir, targetName), buf);
      return `/projects/${id}/${targetName}`;
    } catch {
      return null;
    }
  };

  if (logoUrl) {
    const ext = path.extname(logoUrl.split('?')[0]) || '.png';
    const saved = await downloadOne(logoUrl, `logo${ext}`);
    if (saved) localLogo = saved;
  }

  let idx = 1;
  for (const url of galleryUrls) {
    const ext = path.extname(url.split('?')[0]) || '.png';
    const rawBase = path.basename(url.split('?')[0], ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 32);
    const filename = `screen_${idx}_${rawBase}${ext}`;
    const saved = await downloadOne(url, filename);
    if (saved) {
      localGallery.push(saved);
      idx++;
    }
  }

  if (localGallery.length === 0 && localLogo) {
    localGallery.push(localLogo);
  }
  return { localLogo, localGallery };
}

function stripMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, ''))
    .replace(/[*_~>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseReadmeSections(readme) {
  const lines = readme.split(/\r?\n/);
  const sections = [];
  let currentHeading = 'Overview';
  let currentLines = [];

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch) {
      if (currentLines.length > 0) {
        sections.push({ heading: currentHeading, body: currentLines.join('\n').trim() });
      }
      currentHeading = stripMarkdown(headingMatch[1]);
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0) {
    sections.push({ heading: currentHeading, body: currentLines.join('\n').trim() });
  }

  const bullets = [];
  for (const line of lines) {
    const b = line.match(/^\s*(?:[-*+]|\d+\.)\s+(.+)$/);
    if (b) {
      const cleaned = stripMarkdown(b[1]);
      if (
        cleaned.length >= 14 &&
        !/^https?:\/\//i.test(cleaned) &&
        !/^(npm |pnpm |yarn |git clone|cd |pip install|cp \.env)/i.test(cleaned)
      ) {
        bullets.push(cleaned);
      }
    }
  }

  const paragraphs = [];
  for (const sec of sections) {
    for (const block of sec.body.split(/\n\s*\n/)) {
      const trimmed = block.trim();
      if (!trimmed || trimmed.startsWith('```') || trimmed.startsWith('|') || /^[-*+]\s/.test(trimmed)) continue;
      const cleaned = stripMarkdown(trimmed);
      if (cleaned.length >= 35 && !/^!\[/.test(trimmed)) {
        paragraphs.push({ heading: sec.heading, text: cleaned });
      }
    }
  }

  return { sections, bullets: [...new Set(bullets)], paragraphs };
}

function inferCategory(name, desc, readme) {
  const text = `${name} ${desc || ''} ${readme.slice(0, 2000)}`.toLowerCase();
  if (/ml|machine learning|classification|regression|prediction|xgboost|scikit|cancer|iris|obesity|churn|sales-prediction|unemployment/.test(text)) {
    return 'AI & Machine Learning';
  }
  if (/power bi|analytics|dashboard|supply chain|lakehouse|bi|costing|telemetry/.test(text)) {
    return 'Lakehouse & BI';
  }
  if (/erp|marketplace|auction|e-commerce|ecommerce|booking|cms|portal|platform|saas/.test(text)) {
    return 'Distributed Systems';
  }
  return 'Cloud Native';
}

function formatTitle(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractTechStack(primaryLang, readme) {
  const stack = new Set();
  if (primaryLang) stack.add(primaryLang);
  const keywords = [
    'Next.js', 'Next.js 16', 'Next.js 15', 'React', 'TypeScript', 'Tailwind CSS',
    'Supabase', 'Prisma', 'PostgreSQL', 'Stripe', 'HyperPay', 'Moyasar',
    'Python', 'Jupyter Notebook', 'Power BI', 'Scikit-Learn', 'Pandas',
    'NumPy', 'Matplotlib', 'Seaborn', 'XGBoost', 'Docker', 'Three.js',
    'Anthropic SDK', 'shadcn/ui', 'next-intl', 'Framer Motion', 'HTML5', 'CSS3',
  ];
  const lower = readme.toLowerCase();
  for (const kw of keywords) {
    if (lower.includes(kw.toLowerCase()) && stack.size < 10) {
      stack.add(kw);
    }
  }
  return Array.from(stack);
}

async function filterValidImageUrls(urls) {
  const valid = [];
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) valid.push(url);
    } catch {
      // skip unreachable image
    }
  }
  return valid;
}

async function buildProjectFromRepo(repoInfo) {
  const { name, owner, branch: initialBranch, lang, desc, htmlUrl, homepage, stars } = repoInfo;
  const { text: rawReadme, branch } = await fetchRawReadme(owner, name, initialBranch);
  const readme = rewriteReadmeImageUrls(rawReadme, owner, name, branch);
  const id = `gh-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

  let logoImg = '';
  let galleryImages = [];
  if (id !== 'gh-startup-expansion-analysis' && !name.toLowerCase().includes('startup-expansion')) {
    const readmeImgs = extractImagesFromReadme(rawReadme, owner, name, branch);
    const treeImgs = await fetchRepoTreeImages(owner, name, branch);
    const combinedUrls = [...new Set([...treeImgs, ...readmeImgs])];
    const { localLogo, localGallery } = await downloadLocalAssets(id, combinedUrls);
    logoImg = localLogo;
    galleryImages = localGallery;
  }

  const { sections, bullets, paragraphs } = parseReadmeSections(rawReadme);
  const category = inferCategory(name, desc, rawReadme);
  const techStack = extractTechStack(lang, rawReadme);
  const title = formatTitle(name);

  // Build rich, detailed descriptions from all relevant README paragraphs & sections
  const allParaTexts = paragraphs.map((p) => p.text);
  const combinedIntro = allParaTexts.slice(0, 3).join(' ');
  const summary =
    desc && combinedIntro && !combinedIntro.toLowerCase().includes(desc.toLowerCase().slice(0, 25))
      ? `${desc} ${combinedIntro}`.slice(0, 900)
      : (combinedIntro || desc || `Open-source ${category} project (${name}) documented on GitHub.`).slice(0, 900);

  const challengeMatches = paragraphs
    .filter((p) => /problem|challenge|overview|about|background|why|motivation|context|objective|goal/i.test(p.heading))
    .map((p) => p.text);
  const challengeBase = challengeMatches.length > 0 ? challengeMatches.slice(0, 3).join(' ') : (allParaTexts.slice(0, 2).join(' ') || summary);
  const challenge =
    challengeBase.length >= 280
      ? challengeBase
      : `${challengeBase} Organizations and engineering teams working in ${category.toLowerCase()} frequently face fragmented workflows, manual data reconciliation, and limited real-time visibility. ${title} was engineered to eliminate these bottlenecks with a structured, auditable, and scalable architecture.`;

  const solutionMatches = paragraphs
    .filter((p) => /solution|architecture|implementation|features|system|how|design|stack|workflow|methodology/i.test(p.heading))
    .map((p) => p.text);
  const solutionBase =
    solutionMatches.length > 0
      ? solutionMatches.slice(0, 4).join(' ')
      : (allParaTexts.slice(1, 5).join(' ') || allParaTexts[0] || summary);
  const solution =
    solutionBase.length >= 320
      ? solutionBase
      : `${solutionBase} The platform is built using ${techStack.join(', ') || 'modern full-stack & data tooling'}, combining modular service boundaries, clean state management, and automated validation. Every module is documented in ${owner}/${name} with reproducible setup instructions, clear data flows, and production-ready patterns.`;

  const architectureHighlights =
    bullets.slice(0, 12).length > 0
      ? bullets.slice(0, 12)
      : [
          `Implemented with ${techStack.slice(0, 5).join(', ') || 'modern tooling'} for reliability, performance, and maintainability.`,
          `Modular architecture separating presentation, business logic, and data persistence layers.`,
          `Full source code, configuration, and documentation published on GitHub (${owner}/${name}).`,
        ];

  if (galleryImages.length === 0) {
    galleryImages = generateProjectSvgs(id, title, category, techStack, architectureHighlights, owner, name);
  }

  const keyDecisions = [
    {
      title: `Core Architecture: ${techStack.slice(0, 3).join(' + ') || lang || 'Modern Stack'}`,
      rationale: `Selected ${techStack.slice(0, 3).join(', ') || 'this architecture'} to deliver high reliability, clean modularity, and fast iteration for ${title}.`,
      tradeOff: 'Requires adhering to the documented environment variables and runtime dependencies in the repository README.',
    },
    ...(techStack.length > 3
      ? [
          {
            title: `Ecosystem Integrations: ${techStack.slice(3, 6).join(', ')}`,
            rationale: `Integrated ${techStack.slice(3, 6).join(', ')} to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.`,
            tradeOff: 'Introduces external library/service configuration managed via environment setup.',
          },
        ]
      : []),
    {
      title: 'Documentation-First Repository Structure',
      rationale: `Maintained structured README documentation, visual assets (${galleryImages.length} images), and clear module boundaries in ${owner}/${name}.`,
      tradeOff: 'Requires keeping README documentation and screenshots synchronized as features evolve.',
    },
  ];

  const sectionFlow = sections
    .map((s) => s.heading)
    .filter((h) => h && !/table of contents|license|acknowledgments|author|contact/i.test(h))
    .slice(0, 6);

  const systemFlow =
    architectureHighlights.length >= 4
      ? architectureHighlights.slice(0, 6)
      : sectionFlow.length >= 2
      ? sectionFlow.map((h) => `${h}: Documented module & workflow in ${owner}/${name}.`)
      : [
          `Repository Initialization: Clone ${owner}/${name} (${branch} branch) and configure environment.`,
          `Core Implementation: ${techStack.slice(0, 4).join(', ') || 'Modular architecture'}.`,
          `Feature Execution: End-to-end user & data workflows documented in README.`,
          `Verification & Assets: Visual outputs and documentation hosted on GitHub.`,
        ];

  const outcomeMetrics = [
    {
      label: 'Documentation',
      value: readme ? `${Math.max(1, Math.round(readme.length / 1024))} KB` : 'GitHub',
      description: `Detailed README documentation covering architecture, features, setup, and usage.`,
    },
    {
      label: 'Visual Assets',
      value: `${galleryImages.length} ${galleryImages.length === 1 ? 'Image' : 'Images'}`,
      description: 'Screenshots, analytical charts, or architecture preview cards.',
    },
    {
      label: 'Tech Modules',
      value: `${techStack.length} Stack`,
      description: techStack.join(', ') || 'Modular repository structure.',
    },
  ];

  const steps = architectureHighlights.slice(0, 4).map((d, idx) => ({
    title: `Capability ${idx + 1}`,
    description: d,
  }));

  if (id === 'gh-startup-expansion-analysis' || name.toLowerCase().includes('startup-expansion')) {
    const startupImages = [
      '/projects/gh-startup-expansion-analysis/dashboard-overview.jpg',
      '/projects/gh-startup-expansion-analysis/dashboard-states.jpg',
      '/projects/gh-startup-expansion-analysis/dashboard-cities.jpg',
    ];

    const customReadme = `# Startup Expansion & Market ROI Analysis (\`Startup-Expansion-Analysis-\`) — Power BI & K-Means Clustering

## Executive Summary
An enterprise-grade commercial expansion and marketing ROI intelligence suite evaluating **150 stores** across the United States. Combining **Python machine learning (K-Means clustering)** with a **3-screen interactive Power BI executive cockpit**, this project analyzes **$5.0M in total profit**, **$428K in marketing spend**, and an exceptional **1,890% Return on Marketing Spend (ROMS)** to guide territory expansion and capital allocation.

---

## Interactive Power BI Dashboard Showcase

### 1. Executive Overview Dashboard
Key Metrics: **$5M Profit** | **203.50K ROI** | **$428K Marketing Spend** | **188.70K ROMS** | **1.89K% ROMS Ratio**
- **Revenue by Sales Region**: Region 1 (43.3% / $3M) vs Region 2 (56.7% / $3M)
- **Store Distribution**: 138 Established Stores (93.24%) vs 10 New Expansion Locations (6.76%)
- **Geographic Mapping**: Store revenue and marketing spend distributed across US states and cities

![Executive Overview Dashboard](/projects/gh-startup-expansion-analysis/dashboard-overview.jpg)

---

### 2. States Performance Analysis
- **Top Revenue States**: California, Texas, Florida, Washington, Illinois, Alabama, New York, Connecticut, Georgia, Colorado
- **Store Profitability Rankings**: Identified top 10 most profitable and 10 least profitable store locations
- **Spend vs Revenue Scatter**: Precise correlation between state marketing allocations and generated returns
- **Profit by State Treemap**: Visualizing revenue density across all 50 states

![States Performance Analysis](/projects/gh-startup-expansion-analysis/dashboard-states.jpg)

---

### 3. City-Level Granularity & Unit Economics
- **Top Profitable Cities**: Deep dive into Elgin, Rochester, West Palm Beach, Rialto, Temecula, Ventura, Murrieta, Lewisville, and Wichita Falls
- **City Marketing Efficiency**: Highlighting cities with high revenue but minimal marketing expenditure
- **Distribution Analysis**: Clustering stores by revenue brackets ($0K to $100K+) against local marketing budgets

![City-Level Granularity Dashboard](/projects/gh-startup-expansion-analysis/dashboard-cities.jpg)

---

## Strategic Recommendations (Executive Action Plan)

Based on the multi-dimensional analysis across the 150 store locations, the following 9 strategic recommendations have been developed:

### 1. Optimize Marketing Spending in High-Performing States
**California**, **Texas**, and **Florida** are among the top states in terms of total revenue. However, it is essential to ensure that the marketing spend in these states provides a strong return on investment (ROI). Conduct a detailed ROI analysis for these states to determine if the marketing budget can be optimized further without diminishing revenue velocity.

### 2. Increase Marketing Spend in Mid-Performing States
States like **Tennessee**, **New Jersey**, and **Arizona** demonstrate strong potential for growth with relatively lower marketing spend compared to their revenue output. Increasing the marketing budget in these states can deliver a significant boost in incremental revenue with high capital efficiency.

### 3. Focus on High-Performing Cities
Major metropolitan hubs like **Los Angeles**, **Chicago**, and **Houston** contribute significantly to overall revenue. Drill down into these specific cities to understand the unique operational and marketing factors driving their success, and replicate those proven playbooks in secondary markets.

### 4. Invest in Promising Cities with Low Marketing Spend
Cities displaying high revenue despite low marketing expenditures (e.g., specific high-performing municipalities in California, Texas, and Florida) must be prioritized for increased marketing investment. These cities offer immediate growth potential with relatively low incremental cost.

### 5. Reallocate Resources from Underperforming Areas
Cities and states with high marketing spend but lagging revenue must be reviewed immediately. Reduce the marketing budget in these unprofitable or saturated areas and reallocate capital toward higher-margin, under-marketed regions.

### 6. Expand into New Regions
The **"New Expansion"** segment reveals compelling potential for greenfield territory growth. Conduct formal feasibility studies to identify the most promising new regional markets, focusing on territories with high demand indicators and low competitive density.

### 7. Develop a Strategic Expansion Plan
Based on the geographic and clustering analysis, formulate a phased strategic roadmap for entering new territories. Evaluate market potential, competitor presence, logistics, and infrastructure requirements prior to capital commitment.

### 8. Monitor and Adjust Marketing Strategies in Real Time
Continuously track the performance of regional and municipal marketing campaigns using the Power BI telemetry cockpit. Leverage real-time dashboards to dynamically adjust budget allocations based on emerging ROI signals.

### 9. Invest in Data Visualization and Stakeholder Reporting
Continuously enhance the Power BI dashboards with interactive drill-throughs, predictive scenario modeling, and automated alerting to facilitate faster, data-driven decisions across executive leadership.

---

## Technical Architecture & Pipeline

\`\`\`mermaid
flowchart TD
    A["Raw Commercial Dataset (150 Store Records)"] --> B["Python / Pandas Preprocessing & Metric Engineering"]
    B --> C["K-Means Clustering & Segmentation (Jupyter Notebook)"]
    C --> D["Cleaned & Enriched Dataset (modified.csv)"]
    D --> E["Power BI Star Schema & DAX Modeling (nm.pbix)"]
    E --> F1["Overview Dashboard (KPIs, Maps, Regions)"]
    E --> F2["States Analysis (Treemaps, Spend vs Revenue)"]
    E --> F3["Cities Analysis (Top Profitable Cities, Scatter)"]
    F1 & F2 & F3 --> G["9-Point Strategic Executive Recommendation Plan"]
\`\`\`

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Data Ingestion & Cleaning** | Python, Pandas, NumPy | Cleansed 150 commercial store records from Excel |
| **Metric Engineering** | Python, DAX | Engineered Profit, ROI, ROMS, and ROMS % ratios |
| **Unsupervised Segmentation** | \`sklearn.cluster.KMeans\` | Clustered store performance profiles |
| **Business Intelligence** | Microsoft Power BI (\`nm.pbix\`) | 3-page interactive executive cockpit with GIS mapping |
| **Exploratory Visuals** | Matplotlib, Seaborn | Distribution analysis and correlation plots in Jupyter |

---

## Key Metrics Summary
- **Total Stores Analyzed**: 150
- **Total Portfolio Profit**: $5.0M
- **Total Marketing Spend**: $428K
- **Portfolio Marketing ROI**: 203.50K
- **Return on Marketing Spend (ROMS)**: $188.70K
- **ROMS Efficiency Ratio**: 1,890%
- **Sales Regions**: Region 1 ($3.0M / 43.3%) • Region 2 ($3.0M / 56.7%)
- **Store Status**: 138 Established (93.24%) • 10 New Expansion (6.76%)
`;

    return {
      id,
      title: 'Startup Expansion & Market ROI Intelligence',
      client: `GitHub • ${owner}/${name}`,
      companyLogo: startupImages[0],
      category: 'Lakehouse & BI',
      role: 'Creator & Lead Engineer',
      impactMetric: '$5.0M Profit • 150 Stores',
      metrics: [
        { label: 'Total Profit', value: '$5.0M' },
        { label: 'Marketing ROI', value: '203.5K' },
        { label: 'Marketing Spend', value: '$428K' },
        { label: 'ROMS Efficiency', value: '1,890%' },
      ],
      techStack: [
        'Power BI',
        'Python',
        'Jupyter Notebook',
        'K-Means Clustering',
        'Pandas',
        'NumPy',
        'Matplotlib',
        'Seaborn',
        'DAX',
        'Excel',
      ],
      summary:
        'Comprehensive Power BI retail analytics and machine learning expansion model evaluating 150 store branches across the United States. Integrates K-Means clustering in Python with an interactive 3-screen executive cockpit (Overview, States, and Cities) to analyze $5M total profit, $428K marketing expenditure, and 1,890% ROMS, delivering 9 strategic recommendations for capital allocation and territory expansion.',
      architectureHighlights: [
        'Interactive 3-tier Power BI telemetry suite: Executive Overview, State-level Performance, and City Granularity.',
        'Comprehensive business metrics tracked: $5.0M Profit, $428K Marketing Spend, 203.5K ROI, 188.7K ROMS, and 1,890% ROMS efficiency.',
        'Recommendation 1: Optimize Marketing Spending in High-Performing States (California, Texas, Florida) with rigorous ROI verification.',
        'Recommendation 2: Increase Marketing Spend in Mid-Performing States (Tennessee, New Jersey, Arizona) to capture proven revenue upside.',
        'Recommendation 3: Focus on High-Performing Cities (Los Angeles, Chicago, Houston) to isolate success drivers and replicate them nationally.',
        'Recommendation 4: Prioritize Promising Cities with Low Marketing Spend to achieve high growth with minimal capital outlay.',
        'Recommendation 5: Reallocate resources from underperforming areas with high marketing spend but low revenue to more profitable regions.',
        'Recommendation 6: Expand into new regions with targeted feasibility studies focusing on high growth potential and low competitive density.',
        'Recommendation 7: Develop a structured strategic expansion plan evaluating market potential, competition, and logistics infrastructure.',
        'Recommendation 8: Continuously monitor and adjust regional marketing campaigns in real time using interactive dashboard telemetry.',
        'Recommendation 9: Invest in enhanced data visualization and Power BI reporting to facilitate fast, stakeholder-aligned decision-making.',
        'Unsupervised K-Means clustering in Jupyter Notebook to segment store profiles by revenue density and spend efficiency.',
      ],
      liveDemoUrl: homepage || htmlUrl || `https://github.com/${owner}/${name}`,
      featured: false,
      challenge:
        'Retail enterprises and multi-unit startups often face severe challenges allocating expansion capital and marketing budgets across national territories. Without granular state- and city-level unit economics, businesses risk overspending in saturated markets while underfunding high-potential growth regions. In this portfolio of 150 branches across 2 sales regions (138 established stores vs 10 new expansion locations), leadership required clear data visualization to identify why certain territories yielded high revenue despite low marketing spend, and how to restructure budgets for maximum ROI.',
      solution:
        'Constructed an end-to-end analytical intelligence platform combining unsupervised Python machine learning with a dark-themed, tri-screen Power BI command center. In Python, standardized commercial metrics and executed K-Means clustering to identify store profitability archetypes. In Power BI, built interconnected dashboards across Overview KPIs, State-level treemaps/scatter plots, and City-level unit distributions. Formulated 9 concrete executive recommendations to optimize high-performing states, scale mid-tier opportunities, and reallocate capital from underperforming branches.',
      keyDecisions: [
        {
          title: 'Tri-Screen Hierarchical Architecture (Overview -> States -> Cities)',
          rationale:
            'Allowed C-level executives to view top-line $5M profit and $428K spend immediately, while enabling regional directors and store managers to drill into specific states (e.g. California vs Texas) and city-level scatter distributions.',
          tradeOff:
            'Required building clean star-schema data modeling in Power BI and synchronized cross-filtering across all 3 dashboard pages.',
        },
        {
          title: 'Return on Marketing Spend (ROMS) Normalization',
          rationale:
            'Raw revenue alone distorts performance by favoring large metropolitan stores. Calculating ROMS (188.7K) and ROMS % (1,890%) provided a fair efficiency benchmark for both established and new expansion branches.',
          tradeOff:
            'Required custom DAX measures and handling zero/near-zero spend outlier edge cases in Python prep.',
        },
        {
          title: 'Actionable 9-Point Recommendation Framework',
          rationale:
            'Directly translated data distributions (e.g. top profitable cities like Elgin, Rochester, and West Palm Beach) into actionable budget optimization steps rather than leaving the dashboards as passive reporting.',
          tradeOff:
            'Requires regular dashboard re-ingestion to validate post-implementation ROI changes across the 150 stores.',
        },
      ],
      systemFlow: [
        '1. Raw Ingestion: Ingested 150 store records across commercial attributes (State, City, Sales Region, New Expansion, Spend, Revenue).',
        '2. Feature Engineering: Computed Net Profit, ROI, ROMS, and ROMS % in Python using Pandas and NumPy.',
        '3. Unsupervised Clustering: Performed K-Means clustering in Jupyter Notebook to group branches into investment archetypes.',
        '4. Power BI Modeling: Modeled star schema and DAX measures across Overview, State, and City dimensions.',
        '5. Visual Dashboarding: Built geographic GIS maps, state treemaps, store profit rankings, and marketing-to-revenue scatter matrices.',
        '6. Executive Strategic Plan: Formulated 9 actionable recommendations for regional budget reallocation and territory expansion.',
      ],
      outcomeMetrics: [
        { label: 'Total Profit', value: '$5.0M', description: 'Consolidated profit generated across 150 analyzed commercial stores.' },
        { label: 'Marketing ROI', value: '203.5K', description: 'Overall return on investment index across all evaluated regions.' },
        { label: 'Marketing Spend', value: '$428K', description: 'Total capital invested in store marketing and customer acquisition.' },
        { label: 'ROMS Efficiency', value: '1,890%', description: 'Return on Marketing Spend ratio proving high operational leverage.' },
      ],
      galleryImages: startupImages,
      steps: [
        { title: '1. Regional & State Optimization', description: 'Audit ROI in California, Texas, and Florida while scaling spend in high-potential states like Tennessee, New Jersey, and Arizona.' },
        { title: '2. City-Level Capital Reallocation', description: 'Direct capital to low-spend high-yield cities and replicate Los Angeles, Chicago, and Houston operational models.' },
        { title: '3. Strategic New Territory Expansion', description: 'Leverage the 10 pilot expansion branches to execute structured feasibility studies in high-margin, low-competition markets.' },
        { title: '4. Continuous Monitoring & Visual BI', description: 'Use live Power BI interactive dashboards for continuous telemetry, rapid feedback loops, and stakeholder alignment.' },
      ],
      readmeContent: customReadme,
      githubUrl: htmlUrl || `https://github.com/${owner}/${name}`,
    };
  }

  return {
    id,
    title,
    client: `GitHub • ${owner}/${name}`,
    companyLogo: logoImg || galleryImages[0] || '',
    category,
    role: 'Creator & Lead Engineer',
    impactMetric: stars > 0 ? `${stars} ★ GitHub` : (lang || 'Open Source'),
    metrics: [
      { label: 'Primary Stack', value: lang || techStack[0] || 'Multi-Stack' },
      { label: 'Repository', value: `${owner}/${name}` },
      { label: 'Visuals', value: `${galleryImages.length} Assets` },
      { label: 'Highlights', value: `${architectureHighlights.length} Items` },
    ],
    techStack,
    summary,
    architectureHighlights,
    liveDemoUrl: homepage || htmlUrl || `https://github.com/${owner}/${name}`,
    featured: false,
    challenge,
    solution,
    keyDecisions,
    systemFlow,
    outcomeMetrics,
    galleryImages,
    steps,
    readmeContent: readme || undefined,
    githubUrl: htmlUrl || `https://github.com/${owner}/${name}`,
  };
}

async function main() {
  let repoList = [];
  try {
    const seen = new Set();
    for (const user of GITHUB_USERS) {
      const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, {
        headers: { 'User-Agent': 'islam-samy-portfolio-importer', Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const repos = await res.json();
      for (const r of repos) {
        if (r.fork || r.archived || EXCLUDED_REPOS.has(r.name)) continue;
        if (seen.has(r.name.toLowerCase())) continue;
        seen.add(r.name.toLowerCase());
        repoList.push({
          name: r.name,
          owner: r.owner.login,
          branch: r.default_branch || 'main',
          lang: r.language,
          desc: r.description,
          htmlUrl: r.html_url,
          homepage: r.homepage,
          stars: r.stargazers_count || 0,
        });
      }
    }
  } catch (err) {
    console.warn(`GitHub API list fallback (${err.message}); using known 23 repositories.`);
    repoList = FALLBACK_REPOS.map((r) => ({
      ...r,
      htmlUrl: `https://github.com/${r.owner}/${r.name}`,
      homepage: '',
      stars: 0,
    }));
  }

  console.log(`Processing ${repoList.length} repositories via raw.githubusercontent.com...`);

  const importedProjects = [];
  for (const repo of repoList) {
    const proj = await buildProjectFromRepo(repo);
    console.log(`  ✔ ${repo.name}: ${proj.galleryImages.length} images, ${proj.architectureHighlights.length} highlights`);
    importedProjects.push(proj);
  }

  const seedContent = fs.readFileSync(SEED_PATH, 'utf8');
  const marker = '// --- IMPORTED GITHUB PROJECTS ---';
  const baseContent = (seedContent.includes(marker)
    ? seedContent.split(marker)[0]
    : seedContent
  )
    .trimEnd()
    .replace(/\];\s*$/, '')
    .replace(/,+\s*$/, '');

  const serialized = importedProjects
    .map((p) => `  ${JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')}`)
    .join(',\n');

  const updatedSeed = `${baseContent},\n  ${marker}\n${serialized}\n];\n`;
  fs.writeFileSync(SEED_PATH, updatedSeed, 'utf8');
  console.log(`Updated ${SEED_PATH} with ${importedProjects.length} richly documented GitHub projects.`);

  const env = loadEnv(ENV_PATH);
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.warn('Supabase credentials not found in .env.local; skipping DB sync.');
    return;
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const rows = importedProjects.map((p, idx) => ({
    id: p.id,
    title: p.title,
    client: p.client,
    company_logo: p.companyLogo || '',
    category: p.category,
    role: p.role,
    impact_metric: p.impactMetric,
    metrics: p.metrics || [],
    tech_stack: p.techStack || [],
    summary: p.summary,
    architecture_highlights: p.architectureHighlights || [],
    live_demo_url: p.liveDemoUrl || null,
    featured: Boolean(p.featured),
    challenge: p.challenge || null,
    solution: p.solution || null,
    key_decisions: p.keyDecisions || [],
    system_flow: p.systemFlow || [],
    outcome_metrics: p.outcomeMetrics || [],
    display_order: 10 + idx,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from('projects').upsert(rows, { onConflict: 'id' });
  if (error) {
    console.error('Supabase upsert error:', error);
    process.exit(1);
  }
  console.log(`Successfully synced ${rows.length} GitHub projects to Supabase.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
