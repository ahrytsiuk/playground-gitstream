const {Octokit} = require("@octokit/rest");

function getClientPayloadParsed() {

  console.log("CLIENT_PAYLOAD: " + process.env.CLIENT_PAYLOAD);

  const afterOneParsing = JSON.parse(process.env.CLIENT_PAYLOAD || '{}');

  if (typeof afterOneParsing === 'string') {
    return JSON.parse(afterOneParsing);
  }

  return afterOneParsing;
}

async function getPullRequestCommits(repo, pr, callback) {

  try {
    const clientPayload = getClientPayloadParsed();

    const githubToken = clientPayload.githubToken;
    const owner_name = clientPayload.owner;
    const repo_name = clientPayload.repo;
    const pull_number = clientPayload.prContext.number;

    if (!githubToken || typeof githubToken !== 'string') {
      console.log(`missing githubToken or bad format`);
      return callback(null, '[]');
    }

    const octokit = new Octokit({ auth: githubToken });

    const listCommits = await octokit.paginate(octokit.rest.pulls.listCommits, {
      owner: owner_name,
      repo: repo_name,
      pull_number: pull_number,
      per_page: 100
    });

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
