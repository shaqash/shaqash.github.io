// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { render } from '../index';
import { posts } from '../components';

/** @param {(selector: string) => HTMLElement} $ */
export default function archive($) {
  const gists = $('#gists');
  const post = $('.post');

  if (!post) {
    // Render
    render(posts, gists);
  }
}

// @license-end