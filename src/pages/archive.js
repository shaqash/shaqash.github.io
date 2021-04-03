import { render, renderGists } from '../index';

function main($) {
  const gists = $('#gists');

  // Render
  render(renderGists, gists);
}

const query = (selector) => document.querySelector(selector);
main(query);