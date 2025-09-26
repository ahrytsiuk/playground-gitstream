async function checkConventionalCommit(branch) {

  return branch.commits.messages
  .filter((message) => !message.includes("Merge branch"))
  .every((message) => {
    return message.match(
        /^(feat|fix|chore|docs|style|refactor|perf|test|build|ci):/,
    )
  });
}

module.exports = {filter: checkConventionalCommit, async: true};


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
