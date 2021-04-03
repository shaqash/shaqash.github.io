import { getJSON, withStash } from './utils';
import { ENTRYPOINT, USERNAME } from '../config';

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
  const repos = await getJSON(`${entrypoint}/users/${username}/starred`)

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
  }
}

/**
 * @param {string[]} gistIds
 * @returns {Promise<Gist[]>}
 */
async function getGists(entrypoint, gistIds) {
  return Promise.all(gistIds.map((id) => getGist(entrypoint, id)));
}

const def = {
  /** @type {(username: string) => Promise<Userdata>} */
  getUserData: (username = USERNAME) => withStash(getUserData, 'SHAQ_USER')(ENTRYPOINT, username),
  /** @type {(username: string) => Promise<Repo[]>} */
  getUserRepos: (username = USERNAME) => withStash(getUserRepos, 'SHAQ_REPOS')(ENTRYPOINT, username),
  /** @type {(gistIds: string[]) => Promise<Gist[]>} */
  getGists: (gistIds) => withStash(getGists, 'SHAQ_GIST')(ENTRYPOINT, gistIds),
}

export default def;
