const {Octokit} = require("@octokit/rest");

const getClientPayloadParsed = () => {
  const afterOneParsing = JSON.parse(process.env.CLIENT_PAYLOAD || '{}');

  if (typeof afterOneParsing === 'string') {
    return JSON.parse(afterOneParsing);
  }

  return afterOneParsing;
};

async function getPullRequestCommits(repo, pr, callback) {

  try {
    const clientPayload = getClientPayloadParsed();
    const { githubToken, headSha: commit_sha, owner, repo } = clientPayload;

    if (!githubToken || typeof githubToken !== 'string') {
      console.log(`missing githubToken or bad format`);
      return callback(null, '[]');
    }

    const octokit = new Octokit({ auth: githubToken });

    const listCommits = await octokit.paginate(octokit.rest.pulls.listCommits, {
      owner: repo.owner,
      repo: repo.name,
      pull_number: pr.number,
      per_page: 100
    });

    core.getIDToken()

    console.log(`Successfully fetched ${listCommits.length} commits.`);

    const commits = listCommits.map(item => {
      return {
        sha: item.sha,
        message: item.commit.message.replace(/\n/g, "\\n"),
        author: item.commit.author.name
      };
    });

    console.log("Result: " + JSON.stringify(commits));

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
