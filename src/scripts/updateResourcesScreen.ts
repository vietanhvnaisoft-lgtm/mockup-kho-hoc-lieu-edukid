import fs from 'fs';

const text = fs.readFileSync('src/screens/ResourcesScreen.tsx', 'utf8');
const lines = text.split('\n');
const start = lines.findIndex(l => l.startsWith('interface PreviewModalProps {'));
const end = lines.findIndex(l => l.startsWith('export default function ResourcesScreen() {'));
if (start !== -1 && end !== -1) {
  lines.splice(start, end - start);
  const importLine = 'import PreviewModal from \'../components/PreviewModal\';\n';
  const newLines = lines;
  const insertIndex = newLines.findIndex(l => l.includes('import { APP_CONFIG }'));
  if (insertIndex !== -1) {
    newLines.splice(insertIndex + 1, 0, importLine);
  }
  fs.writeFileSync('src/screens/ResourcesScreen.tsx', newLines.join('\n'));
  console.log('Modified ResourcesScreen.tsx');
} else {
  console.log('Failed to find boundaries');
}
