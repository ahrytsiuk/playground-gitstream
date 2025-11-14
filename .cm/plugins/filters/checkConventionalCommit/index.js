/**
 * @module checkConventionalCommit
 * @description A gitStream plugin to check if commits in branch are conventional.
 * @param {Object} branch - The current branch object.
 * @param {Object} pr - The pr context variable.
 * @returns {boolean} Returns true if commits are conventional., otherwise false.
 * @example {{ branch | checkConventionalCommit }}
 * @license MIT
 **/
async function checkConventionalCommit(branch, pr) {

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
