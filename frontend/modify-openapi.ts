import * as fs from 'node:fs/promises';
import axios, { type AxiosResponse } from 'axios';

const URL: string = `${import.meta.env.FASTAPI_URL}/api/v1/openapi.json`;
const FILE_PATH: string = './openapi.json';

// Type definitions for OpenAPI components
interface OpenAPIOperation {
  tags?: string[];
  operationId?: string;
}

interface OpenAPIPath {
  [method: string]: OpenAPIOperation;
}

interface OpenAPIDocument {
  paths: { [path: string]: OpenAPIPath };
}

async function downloadOpenAPIFile(
  url: string,
  filePath: string,
): Promise<void> {
  try {
    const response: AxiosResponse = await axios.get(url);
    await fs.writeFile(
      filePath,
      JSON.stringify(response.data, null, 2),
      'utf-8',
    );
    log('File successfully downloaded');
  } catch (err) {
    logError('Error downloading the file', err);
  }
}

async function modifyOpenAPIFile(filePath: string): Promise<void> {
  try {
    const data: string = await fs.readFile(filePath, 'utf-8');
    const openapiContent: OpenAPIDocument = JSON.parse(data);

    for (const pathKey of Object.keys(openapiContent.paths)) {
      const pathData = openapiContent.paths[pathKey];
      for (const method of Object.keys(pathData)) {
        const operation = pathData[method];
        if (
          operation.tags &&
          operation.tags.length > 0 &&
          operation.operationId
        ) {
          const tag: string = operation.tags[0];
          const toRemove = `${tag}-`;
          if (operation.operationId.startsWith(toRemove)) {
            operation.operationId = operation.operationId.slice(
              toRemove.length,
            );
          }
        }
      }
    }

    await fs.writeFile(
      filePath,
      JSON.stringify(openapiContent, null, 2),
      'utf-8',
    );
    log('File successfully modified');
  } catch (err) {
    logError('Error modifying the file', err);
  }
}

async function main(): Promise<void> {
  await downloadOpenAPIFile(URL, FILE_PATH);
  await modifyOpenAPIFile(FILE_PATH);
}

function log(message: string): void {
  console.log(`[INFO] ${message}`);
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function logError(message: string, error: any): void {
  console.error(`[ERROR] ${message}:`, error);
}

main().catch((err) => logError('Unexpected error in main execution', err));
