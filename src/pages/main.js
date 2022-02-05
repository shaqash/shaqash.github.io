// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { mainPage } from '../components';
import { render, query } from '../index';

/**
 * @param {typeof query} $ 
 */
export default function main($) {
  const root = $('#root');
  const post = $('.post');

  if (!post) {
    // Render
    render(mainPage, root);
  }
}

// @license-end
