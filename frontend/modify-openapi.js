import axios from 'axios';
import * as fs from 'node:fs';

async function downloadOpenAPIFile(url, filePath) {
  try {
    const response = await axios.get(url);
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(response.data, null, 2),
    );
    console.log('File successfully downloaded');
  } catch (err) {
    console.error('Error downloading the file:', err);
  }
}

async function modifyOpenAPIFile(filePath) {
  try {
    const data = await fs.promises.readFile(filePath);
    const openapiContent = JSON.parse(data);

    const paths = openapiContent.paths;
    for (const pathKey of Object.keys(paths)) {
      const pathData = paths[pathKey];
      for (const method of Object.keys(pathData)) {
        const operation = pathData[method];
        if (operation.tags && operation.tags.length > 0) {
          const tag = operation.tags[0];
          const operationId = operation.operationId;
          const toRemove = `${tag}-`;
          if (operationId.startsWith(toRemove)) {
            const newOperationId = operationId.substring(toRemove.length);
            operation.operationId = newOperationId;
          }
        }
      }
    }

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(openapiContent, null, 2),
    );
    console.log('File successfully modified');
  } catch (err) {
    console.error('Error modifying the file:', err);
  }
}

const url = 'http://localhost:8000/api/v1/openapi.json';
const filePath = './openapi.json';

async function main() {
  await downloadOpenAPIFile(url, filePath);
  await modifyOpenAPIFile(filePath);
}

main();
