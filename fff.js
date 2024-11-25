import { readFile, writeFile } from 'fs';
import { join } from 'path';
import glob from 'glob';
import pkg from 'js-yaml';
const { dump } = pkg
const mdxDir = './src/contents';

glob(`${mdxDir}/**/*.mdx`, (err, files) => {
  if (err) {
    console.error('Error finding MDX files:', err);
    return;
  }

  files.forEach(file => {
    readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      const frontmatterMatch = data.match(/export const frontmatter =\s*{[\s\S]*?}/);
      if (frontmatterMatch) {
        const frontmatterJson = frontmatterMatch[0];
        console.log(frontmatterJson.replace('export const frontmatter = ', ''))
        const frontmatter = eval('('+frontmatterJson.replace('export const frontmatter = ', '')+')');
        const yamlFrontmatter = dump(frontmatter);
        const newData = `---\n${yamlFrontmatter}---\n${data.replace(frontmatterJson, '')}`;

        writeFile(file, newData, 'utf8', err => {
          if (err) {
            console.error(`Error writing file ${file}:`, err);
          } else {
            console.log(`Updated frontmatter in ${file}`);
          }
        });
      }
    });
  });
})