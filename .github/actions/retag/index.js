const yaml = require('yaml')

function main() {
  let docs = yaml.parseAllDocuments(`${process.env.WORKING_DIRECTORY_PATH}/sample.yaml`);
  for (let doc of docs) {
    const asJson = doc.toJS();
    console.log("Document as JSON: ", asJson);
  }
  console.log("Running something at the moment");
}

main()
