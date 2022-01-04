// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { posts, repositories, withLayout } from '../components';
import { render, query } from '../index';

/**
 * @param {typeof query} $ 
 */
export default function main($) {
  const gists = $('#gists');
  const repos = $('#repos');
  const post = $('.post');

  if (!post) {
    // Render
    render(posts, gists);
    render(repositories, repos);
  }
}

// @license-end
