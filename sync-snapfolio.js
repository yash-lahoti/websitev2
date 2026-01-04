import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const sourceFile = join(process.cwd(), 'SnapFolio', 'assets', 'js', 'data.json');
const destFile = join(process.cwd(), 'public', 'snapfolio', 'assets', 'js', 'data.json');

if (!existsSync(sourceFile)) {
  console.error(`❌ Source file not found: ${sourceFile}`);
  process.exit(1);
}

try {
  copyFileSync(sourceFile, destFile);
  console.log('✅ Successfully synced data.json from SnapFolio to public/snapfolio');
} catch (error) {
  console.error('❌ Error syncing file:', error.message);
  process.exit(1);
}

