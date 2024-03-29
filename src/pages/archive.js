// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { render } from '../index';
import { posts, withLayout } from '../components';

/** @param {(selector: string) => HTMLElement} $ */
export default function archive($) {
  const root = $('#root');
  const post = $('.post');

  if (!post) {
    render(async _ => withLayout(await posts()), root);
  }
}

// @license-end