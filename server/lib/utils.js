import fs from 'fs';

/**
 * @param {string} dir 
 */
export function getPageList(dir) {
  return fs.readdirSync(dir)
    .reduce((htmlPages, file) => file.endsWith('.js') ?
      htmlPages.concat(file.replace('.js', '')) :
      htmlPages, []
    );
}
