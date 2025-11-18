const {Octokit} = require("@octokit/rest");

async function lintPullRequest(branch, pr, ghToken, callback) {

  const octokit = new Octokit({
    request: {fetch},
    auth: ghToken,
  });

  let hasErrors = true;

  let branchName = branch.name;

  let comment = `
    **PR Lint Failed**
    
    
    
    See the spec: https://www.conventionalcommits.org/en/v1.0.0/
  `;

  const result = {
    hasErrors,
    comment
  }

  return callback(null, JSON.stringify(result));
}

module.exports = {
  async: true,
  immediate: true,
  filter: lintPullRequest
}
