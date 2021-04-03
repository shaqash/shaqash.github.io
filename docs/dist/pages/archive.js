import {render, renderGists} from "../index.js";
function main($) {
  const gists = $("#gists");
  render(renderGists, gists);
}
const query = (selector) => document.querySelector(selector);
main(query);
