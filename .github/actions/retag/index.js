const yaml = require('yaml')
const fs = require('fs')

function main() {
  const content = fs.readFileSync(`${process.env.WORKING_DIRECTORY_PATH}/sample.yaml`, 'utf8');
  let docs = yaml.parseAllDocuments(content);
  for (let doc of docs) {
    const asJson = doc.toJS();
    console.log("Document as JSON: ", asJson);
  }
  console.log("Running something at the moment");
}

main()
