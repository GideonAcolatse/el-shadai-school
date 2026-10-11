import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://deepskyblue-stork-698121.hostingersite.com/wp-content/uploads";
const OUT_DIR = path.join(process.cwd(), "public", "images", "school");

const ASSETS = [
  // Brand & UI
  { file: "logo.jpg", url: `${BASE_URL}/2025/08/E-Shadai-logo.jpg` },
  { file: "file-icon.svg", url: `${BASE_URL}/2025/08/file.svg` },
  { file: "campus-map.jpg", url: `${BASE_URL}/2026/03/mp.jpg` },

  // Programs & Activities (March 2026)
  { file: "preschool.jpeg", url: `${BASE_URL}/2026/03/WhatsApp-Image-2026-03-17-at-1.49.29-PM.jpeg` },
  { file: "primary.jpeg", url: `${BASE_URL}/2026/03/ell.jpeg` },
  { file: "jhs-stem.jpeg", url: `${BASE_URL}/2026/03/WhatsApp-Image-2026-03-17-at-1.31.32-PM.jpeg` },
  { file: "sports.jpeg", url: `${BASE_URL}/2026/03/sports.jpeg` },
  { file: "culture.jpeg", url: `${BASE_URL}/2026/03/cul.jpeg` },
  { file: "moral-character.jpeg", url: `${BASE_URL}/2026/03/WhatsApp-Image-2026-03-17-at-1.31.20-PM.jpeg` },
  { file: "science.jpeg", url: `${BASE_URL}/2026/03/science.jpeg` },

  // Leadership Team
  { file: "leader-headteacher.jpg", url: `${BASE_URL}/2025/08/DSC_9320-scaled.jpg` },
  { file: "leader-director.jpg", url: `${BASE_URL}/2025/08/DSC_0057-scaled.jpg` },
  { file: "leader-director-alt.jpg", url: `${BASE_URL}/2025/10/madam-pat.jpg` },
  { file: "leader-administrator.jpg", url: `${BASE_URL}/2025/09/photo_2025-09-03_16-10-34.jpg` },
  { file: "leader-bursar.jpg", url: `${BASE_URL}/2025/10/madam-sylvia.jpg` },

  // August 2025 Campus DSLR Photoshoot
  { file: "DSC_0057.jpg", url: `${BASE_URL}/2025/08/DSC_0057-scaled.jpg` },
  { file: "DSC_0064.jpg", url: `${BASE_URL}/2025/08/DSC_0064-scaled.jpg` },
  { file: "DSC_0068.jpg", url: `${BASE_URL}/2025/08/DSC_0068-scaled.jpg` },
  { file: "DSC_0072.jpg", url: `${BASE_URL}/2025/08/DSC_0072-scaled.jpg` },
  { file: "DSC_0100.jpg", url: `${BASE_URL}/2025/08/DSC_0100-scaled.jpg` },
  { file: "DSC_0122.jpg", url: `${BASE_URL}/2025/08/DSC_0122-scaled.jpg` },
  { file: "DSC_0127.jpg", url: `${BASE_URL}/2025/08/DSC_0127-scaled.jpg` },
  { file: "DSC_9246.jpg", url: `${BASE_URL}/2025/08/DSC_9246-scaled.jpg` },
  { file: "DSC_9252.jpg", url: `${BASE_URL}/2025/08/DSC_9252-scaled.jpg` },
  { file: "DSC_9261.jpg", url: `${BASE_URL}/2025/08/DSC_9261-scaled.jpg` },
  { file: "DSC_9263.jpg", url: `${BASE_URL}/2025/08/DSC_9263-scaled.jpg` },
  { file: "DSC_9264.jpg", url: `${BASE_URL}/2025/08/DSC_9264-scaled.jpg` },
  { file: "DSC_9320.jpg", url: `${BASE_URL}/2025/08/DSC_9320-scaled.jpg` },
  { file: "DSC_9421.jpg", url: `${BASE_URL}/2025/08/DSC_9421-scaled.jpg` },
  { file: "DSC_9424.jpg", url: `${BASE_URL}/2025/08/DSC_9424-scaled.jpg` },
  { file: "DSC_9462.jpg", url: `${BASE_URL}/2025/08/DSC_9462-scaled.jpg` },
  { file: "DSC_9495.jpg", url: `${BASE_URL}/2025/08/DSC_9495-scaled.jpg` },

  // September 2025 Campus DSLR Photoshoot
  { file: "DSC_0311.jpg", url: `${BASE_URL}/2025/09/DSC_0311-scaled.jpg` },
  { file: "DSC_0316.jpg", url: `${BASE_URL}/2025/09/DSC_0316-scaled.jpg` },
  { file: "DSC_0360.jpg", url: `${BASE_URL}/2025/09/DSC_0360-scaled.jpg` },
  { file: "DSC_0371.jpg", url: `${BASE_URL}/2025/09/DSC_0371-scaled.jpg` },
  { file: "DSC_0413.jpg", url: `${BASE_URL}/2025/09/DSC_0413-scaled.jpg` },
  { file: "DSC_0414.jpg", url: `${BASE_URL}/2025/09/DSC_0414-scaled.jpg` },
  { file: "DSC_0416.jpg", url: `${BASE_URL}/2025/09/DSC_0416-scaled.jpg` },
  { file: "DSC_0422.jpg", url: `${BASE_URL}/2025/09/DSC_0422-scaled.jpg` },
  { file: "DSC_0729.jpg", url: `${BASE_URL}/2025/09/DSC_0729-scaled.jpg` },
  { file: "DSC_0730.jpg", url: `${BASE_URL}/2025/09/DSC_0730-scaled.jpg` },
  { file: "DSC_0731.jpg", url: `${BASE_URL}/2025/09/DSC_0731-scaled.jpg` },
  { file: "DSC_0732.jpg", url: `${BASE_URL}/2025/09/DSC_0732-scaled.jpg` },
  { file: "DSC_0733.jpg", url: `${BASE_URL}/2025/09/DSC_0733-scaled.jpg` },
  { file: "DSC_0734.jpg", url: `${BASE_URL}/2025/09/DSC_0734-scaled.jpg` },
  { file: "DSC_0735.jpg", url: `${BASE_URL}/2025/09/DSC_0735-scaled.jpg` },
  { file: "DSC_0736.jpg", url: `${BASE_URL}/2025/09/DSC_0736-scaled.jpg` },
  { file: "DSC_0737.jpg", url: `${BASE_URL}/2025/09/DSC_0737-scaled.jpg` },
  { file: "DSC_0738.jpg", url: `${BASE_URL}/2025/09/DSC_0738-scaled.jpg` },
  { file: "DSC_0771.jpg", url: `${BASE_URL}/2025/09/DSC_0771-scaled.jpg` },
];

async function downloadAsset(item) {
  const dest = path.join(OUT_DIR, item.file);
  try {
    const stat = await fs.stat(dest);
    if (stat.size > 100) {
      console.log(`[SKIP] ${item.file} already exists (${stat.size} bytes)`);
      return true;
    }
  } catch {
    // Proceed to download
  }

  const res = await fetch(item.url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${item.url}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buffer);
  console.log(`[OK] Downloaded ${item.file} (${(buffer.length / 1024).toFixed(1)} KB)`);
  return true;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`Downloading ${ASSETS.length} El-Shadai School assets to ${OUT_DIR}...`);

  const concurrency = 6;
  let downloaded = 0;
  for (let i = 0; i < ASSETS.length; i += concurrency) {
    const batch = ASSETS.slice(i, i + concurrency);
    const results = await Promise.allSettled(batch.map(downloadAsset));
    for (const r of results) {
      if (r.status === "fulfilled") downloaded++;
      else console.error("[ERR]", r.reason?.message || r.reason);
    }
  }
  console.log(`Completed: ${downloaded}/${ASSETS.length} assets ready.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
