// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { render } from '../index';
import { posts } from '../components';

/** @param {(selector: string) => HTMLElement} $ */
function main($) {
  const gists = $('#gists');

  // Render
  render(posts, gists);
}

/** 
 * @param {string} selector 
 * @returns {HTMLElement}
 */
const query = (selector) => document.querySelector(selector);
main(query);

// @license-end