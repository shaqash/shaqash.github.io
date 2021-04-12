// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { posts, repositories } from '../components';
import { render, query } from '../index';

/**
 * @param {typeof query} $ 
 */
function main($) {
  const gists = $('#gists');
  const repos = $('#repos');
  const post = $('.post');

  if (!post) {
    // Render
    render(posts, gists);
    render(repositories, repos);
  }
}

main(query);
// @license-end
