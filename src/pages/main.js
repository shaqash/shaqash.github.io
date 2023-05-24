// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { mainPage } from '../components';
import { render, query } from '../index';
import { ssrEndpoint } from '../config';

/**
 * @param {typeof query} $ 
 */
export default function main($) {
  const root = $('#root');
  const post = $('.post');

  if (!post) {
    // Client side render
    fetch(ssrEndpoint)
      .catch(function () { }); // Ping the server
    render(mainPage, root);
  }
}

// @license-end
