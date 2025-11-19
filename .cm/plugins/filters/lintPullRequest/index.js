const {Octokit} = require("@octokit/rest");

async function lintPullRequest(repo, branch, pr, ghToken, callback) {

  const octokit = new Octokit({
    request: {fetch},
    auth: ghToken,
  });

  try {
    const allCommits = await octokit
    .paginate(octokit.rest.pulls.listCommits, {
      owner: repo.owner,
      repo: repo.name,
      pull_number: pr.number,
    });
    console.log(`Successfully fetched ${allCommits.length} commits.`);
    console.log("Commits: " + JSON.stringify(allCommits));
  } catch (error) {
    console.error("Error fetching commits:", error);
  }

  const result = {
    hasErrors: true,
  }

  return callback(null, JSON.stringify(result));
}

module.exports = {
  async: true,
  immediate: true,
  filter: lintPullRequest
}
