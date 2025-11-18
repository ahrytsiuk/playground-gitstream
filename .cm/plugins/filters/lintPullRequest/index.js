const {Octokit} = require("@octokit/rest");

async function lintPullRequest(branch, pr, ghToken, callback) {

  const octokit = new Octokit({
    request: {fetch},
    auth: ghToken,
  });

  let hasValidTitle = pr.title.match(/^(feat|fix|chore|docs|style|refactor|perf|test|build|ci):/);
  let isValid = hasValidTitle;

  const result = {
    isValid,
    hasValidTitle
  }

  return callback(null, JSON.stringify(result));
}

module.exports = {
  async: true,
  immediate: true,
  filter: lintPullRequest
}
