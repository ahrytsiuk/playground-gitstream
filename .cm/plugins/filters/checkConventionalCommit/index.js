/**
 * @module checkConventionalCommit
 * @description A gitStream plugin to check if commits in branch are conventional.
 * @param {Object} branch - The current branch object.
 * @param {Object} pr - The pr context variable.
 * @param {String} auth - The token.
 * @returns {boolean} Returns true if commits are conventional., otherwise false.
 * @example {{ branch | checkConventionalCommit }}
 **/

const { Octokit } = require("@octokit/rest");

async function checkConventionalCommit(branch, pr, auth, callback) {

  console.log("Tkn: " + auth);

  const octokit = new Octokit({
    request: { fetch },
    auth,
  });

  const owner = pr.author;
  const repo = pr.repo
  const pull_number = pr.number;

  // const res = await octokit.repos.getContent({
  //   owner,
  //   repo,
  //   path: 'CODEOWNERS'
  // });

  const pullRequesrResp = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number,
  });

  // const cont = Buffer.from(res.data.content, 'base64').toString()


  console.log("Cont1: " + JSON.stringify(pullRequesrResp.data));
  // console.log("Cont2: " + cont);


  const listOfCommits = await octokit.rest.pulls.listCommits({
    owner,
    repo,
    pull_number,
  });

  console.log("PR Object" + JSON.stringify(pr));

  console.log("Cont2: " + JSON.stringify(listOfCommits));

  console.log("Branch Object" + JSON.stringify(branch));


  for (const message of branch.commits.messages) {
    console.log("Commit Message: " + message);
  }

  let every = branch.commits.messages
  .filter((message) => !message.includes("Merge branch"))
  .every((message) => {
    return message.match(
        /^(feat|fix|chore|docs|style|refactor|perf|test|build|ci):/,
    )
  });
  let newVar = {rez: every, msg: 'Hello World!'};

  console.log("Result: " + JSON.stringify(newVar));

  // return newVar;

  return callback(null, JSON.stringify(newVar));
}

module.exports = {
  async: true,
  immediate: true, // Required for use in 'if' conditions
  filter: checkConventionalCommit
}


// const cc = require('./index.js');
//
//
// let res = await checkConventionalCommit({
//   commits :{
//     messages: [
//         'feat: hello',
//         'fix: another',
//     ]
//   }
// })
//
// console.log(res)
