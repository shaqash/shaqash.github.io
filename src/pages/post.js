// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { render } from '../index';
import { post as renderPost } from '../components';
import { getQueryParams } from '../lib/utils';
import { getGist } from '../lib/github';
import { ENTRYPOINT, gists } from '../config';

/** @param {(selector: string) => HTMLElement} $ */
export default async function post($) {
  const root = $('#root');
  const _post = $('.post');

  if (!_post) {
    // Render
    render(renderPost, root);
  }
}

// @license-end