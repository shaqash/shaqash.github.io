// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
import {getJSON, withStash} from "./utils.js";
import {ENTRYPOINT, USERNAME} from "../config.js";
import "./types.js";
async function getUserData(entrypoint, username) {
  return getJSON(`${entrypoint}/users/${username}`);
}
async function getReadme(username) {
  return fetch(`https://raw.githubusercontent.com/${username}/${username}/master/README.md`).then((d) => d.text());
}
async function getUserRepos(entrypoint, username) {
  const repos = await getJSON(`${entrypoint}/users/${username}/starred`);
  return repos.filter((repo) => repo.owner.login === username);
}
export async function getGist(entrypoint, gistId) {
  const url = `${entrypoint}/gists/${gistId}`;
  const [data, comments] = await Promise.all([
    getJSON(url),
    getJSON(`${url}/comments`)
  ]);
  return {
    data,
    comments
  };
}
export async function getGists(entrypoint, gistIds) {
  return Promise.all(gistIds.map((id) => getGist(entrypoint, id)));
}
export function extractPostData(gist) {
  const {
    data: {
      owner: {
        avatar_url,
        login
      },
      created_at,
      updated_at
    },
    comments
  } = gist;
  return {
    avatar_url,
    login,
    created_at,
    updated_at,
    comments
  };
}
const def = {
  getUserData: (username = USERNAME) => withStash(getUserData, "SHAQ_USER")(ENTRYPOINT, username),
  getUserRepos: (username = USERNAME) => withStash(getUserRepos, "SHAQ_REPOS")(ENTRYPOINT, username),
  getReadme: (username = USERNAME) => getReadme(username),
  getGists: (gistIds) => withStash(getGists, "SHAQ_GIST")(ENTRYPOINT, gistIds),
  getGist: (gistId) => withStash(getGist, `SHAQ_GIST_${gistId}`)(ENTRYPOINT, gistId),
  extractPostData
};
export default def;
// @license-end
