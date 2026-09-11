const fs = require('fs');

const filePath = 'src/lib/mockData.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Find the start of the MOCK_LICOES array
const startIndex = content.indexOf('export const MOCK_LICOES: LicaoBiblica[] = [');
if (startIndex !== -1) {
  // Find the end of this array. It ends with '];' right before 'export const CATEGORIAS_MATERIAIS'
  const endIndex = content.indexOf('];\r\n\r\nexport const CATEGORIAS_MATERIAIS', startIndex);
  if (endIndex !== -1 || content.indexOf('];\n\nexport const CATEGORIAS_MATERIAIS', startIndex) !== -1) {
    let exactEnd = content.indexOf('];\r\n\r\nexport const CATEGORIAS_MATERIAIS', startIndex);
    if (exactEnd === -1) exactEnd = content.indexOf('];\n\nexport const CATEGORIAS_MATERIAIS', startIndex);
    
    const before = content.substring(0, startIndex);
    const after = content.substring(exactEnd + 2); // skip '];'
    
    const newContent = "import { MOCK_LICOES } from './mockLicoes';\nexport { MOCK_LICOES };" + after;
    
    // Also we need to add the import at the top if we didn't use `export { MOCK_LICOES } from './mockLicoes';`
    // Actually, `export { MOCK_LICOES } from './mockLicoes';` is best.
    const finalContent = before + "export { MOCK_LICOES } from './mockLicoes';\n" + after;
    
    fs.writeFileSync(filePath, finalContent);
    console.log('mockData.ts patched successfully');
  } else {
    console.log('Could not find end of MOCK_LICOES array');
  }
} else {
  console.log('Could not find start of MOCK_LICOES array');
}
