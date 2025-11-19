const {Octokit} = require("@octokit/rest");

async function getPullRequestCommits(repo, pr, ghToken, callback) {

  const octokit = new Octokit({
    request: {fetch},
    auth: ghToken,
  });

  try {
    const listCommits = await octokit.paginate(octokit.rest.pulls.listCommits, {
      owner: repo.owner,
      repo: repo.name,
      pull_number: pr.number,
      per_page: 100
    });

    console.log(`Successfully fetched ${listCommits.length} commits.`);

    const commits = listCommits.map(item => {
      return {
        sha: item.sha,
        message: item.commit.message,
        author: item.commit.author.name
      };
    });

    return callback(null, JSON.stringify(commits));
  } catch (error) {
    console.error("Error fetching commits:", error);
    return callback(null, []);
  }
}

module.exports = {
  async: true,
  immediate: true,
  filter: getPullRequestCommits
}
