import { parseArgs } from 'node:util';

const options = {
  port: {
    type: 'string',
    short: 'p',
  },
} as const;

/**
 * First, it checks the CLI parameter `--port`, if it does not exist,
 * it returns the default value passed in the parameters `defaultPort` of this function.
 */
export function checkCliAndSetPort(port: number = 3000): number {
  const { values } = parseArgs({ options, strict: true });
  if (values.port) {
    port = Number(values.port);
  }

  return port;
}
