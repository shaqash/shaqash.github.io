// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import { getJSON, withStash } from './utils';
import { ENTRYPOINT, USERNAME } from '../config';
import './types';

/**
 * @param {string} entrypoint
 * @param {string} username
 * @returns {Promise<Userdata>}
 */
async function getUserData(entrypoint, username) {
  return getJSON(`${entrypoint}/users/${username}`);
}

/**
 * @param {string} entrypoint
 * @param {string} username
 * @returns {Promise<Repo[]>}
 */
async function getUserRepos(entrypoint, username) {
  /** @type {Repo[]} */
  const repos = await getJSON(`${entrypoint}/users/${username}/starred`);

  return repos.filter((repo) => repo.owner.login === username);
}

/**
 * @param {string} entrypoint
 * @param {string} gistId
 * @returns {Promise<Gist>}
 */
async function getGist(entrypoint, gistId) {
  const url = `${entrypoint}/gists/${gistId}`;
  const [data, comments] = await Promise.all([
    getJSON(url),
    getJSON(`${url}/comments`),
  ]);

  return {
    data,
    comments,
  };
}

/**
 * @param {string[]} gistIds
 * @returns {Promise<Gist[]>}
 */
async function getGists(entrypoint, gistIds) {
  return Promise.all(gistIds.map((id) => getGist(entrypoint, id)));
}

/**
 * @typedef {{
 *  getUserData: {(username?: string): Promise<Userdata>};
 *  getUserRepos: {(username?: string): Promise<Repo[]>};
 *  getGists: {(gistIds: string[]): Promise<Gist[]>};
 * }} Github
 */
/** @type {Github} */
const def = {
  getUserData: (username = USERNAME) => withStash(getUserData, 'SHAQ_USER')(ENTRYPOINT, username),
  getUserRepos: (username = USERNAME) => withStash(getUserRepos, 'SHAQ_REPOS')(ENTRYPOINT, username),
  getGists: (gistIds) => withStash(getGists, 'SHAQ_GIST')(ENTRYPOINT, gistIds),
};

export default def;
// @license-end
