// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { posts, repositories, header, withLayout } from './';
import { intro } from '../config';

export default async function renderMain() {
  const [_posts, _repositories] = await Promise.all([
    posts(),
    repositories(),
  ]);
  return withLayout(
    header({ text: intro }),
    _posts,
    _repositories
  );
}
// @license-end