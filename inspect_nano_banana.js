const fs = require('fs');
const path = require('path');

function findFiles(dir, filter) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(file, filter));
    } else if (file.includes(filter)) {
      results.push(file);
    }
  });
  return results;
}

const files = findFiles('D:\\N8N', 'Nano Banana Pro');
console.log("Found files:", files);

if (files.length > 0) {
  const content = JSON.parse(fs.readFileSync(files[0], 'utf8'));
  console.log("Workflow Name:", content.name);
  content.nodes.forEach(node => {
    if (node.type.includes('httpRequest') || node.name.toLowerCase().includes('nano') || node.name.toLowerCase().includes('banana') || node.name.toLowerCase().includes('image')) {
      console.log("\n--- Node:", node.name, "(", node.type, ") ---");
      console.log(JSON.stringify(node.parameters, null, 2));
    }
  });
}
