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

async function checkConventionalCommit(branch, pr, auth) {

  console.log("Tkn: " + auth);

  const octokit = new Octokit({
    request: { fetch },
    auth,
  });

  const owner = pr.author;
  const repo = pr.repo
  const pull_number = 4;

  // const res = await octokit.repos.getContent({
  //   owner,
  //   repo,
  //   path: 'CODEOWNERS'
  // });

  const res = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number,
  });

  // const cont = Buffer.from(res.data.content, 'base64').toString()


  console.log("Cont1: " + res.data);
  // console.log("Cont2: " + cont);

  console.log("PR Object" + JSON.stringify(pr));

  console.log("Branch Object" + JSON.stringify(branch));


  for (const message of branch.commits.messages) {
    console.log("Commit Message: " + message);
  }

  return branch.commits.messages
  .filter((message) => !message.includes("Merge branch"))
  .every((message) => {
    return message.match(
        /^(feat|fix|chore|docs|style|refactor|perf|test|build|ci):/,
    )
  });
}

module.exports = checkConventionalCommit


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
