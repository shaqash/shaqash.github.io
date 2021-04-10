// @license magnet:?xt=urn:btih:b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt ISC
/**
 * @typedef {{
 * "login": string;
 * "avatar_url": string;
 * "name": string;
 * "company": null | string;
 * "blog": string | null;
 * "location": string;
 * "email": null | string;
 * "hireable": boolean;
 * "bio": null | string;
 * "twitter_username": null | string;
 * "public_repos": number;
 * "public_gists": number;
 * "followers": number;
 * "following": number;
 * "created_at": Date | string;
 * "updated_at": Date | string;
 * }} Userdata
 */

/**
 * @typedef {{
 * "name": string;
 * "html_url": string;
 * "description": string;
 * "fork": boolean;
 * "created_at": Date | string;
 * "updated_at": Date | string;
 * "pushed_at": Date | string;
 * "owner": {
 *  login: string;
 * };
 * "ssh_url": string;
 * "clone_url": string;
 * "homepage": null | string;
 * "size": number;
 * "stargazers_count": number;
 * "watchers_count": number;
 * "language": "JavaScript" | "TypeScript" | "Python" | "HTML" | string;
 * "forks_count": number;
 * "archived": boolean;
 * "disabled": boolean;
 * "open_issues_count": number;
 * "license": {
 *  "name": string;
 * };
 * "forks": number;
 * "open_issues": number;
 * "watchers": number;
 * }} Repo
 */

/**
 * @typedef {{
 *  "files": {
 *  [filename: string]: {
 *   filename: string;
 *   language: string;
 *   "raw_url": string;
 *   content: string;
 *  }
 *  };
 * owner: { login: "string"; avatar_url: "string" };
 * updated_at: Date | string;
 * created_at: Date | string;
 * description: string;
 * comments: number;
 * }} GistBody
 */

/**
 * @typedef {{
 *  user: {
 *  login: string;
 *  avatar_url: string;
 * };
 * body: string;
 * created_at: Date | string;
 * updated_at: Date | string;
 * author_association: "OWNER";
 * }} GistComment
 */

/**
 * @typedef {{
 *  data: GistBody;
 *  comments: GistComment[];
 * }} Gist
 */


// @license-end