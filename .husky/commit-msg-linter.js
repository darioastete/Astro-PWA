/**
 * This JavaScript function checks if a Git commit message follows a specific format and provides
 * success or failure messages accordingly.
 * @param buffer - The `buffer` parameter is a buffer object that contains the content of a file. In
 * this code, it is used to read the content of the `.git/COMMIT_EDITMSG` file.
 * @returns The code is returning the first line of the commit message from the `.git/COMMIT_EDITMSG`
 * file.
 */
let supportsColor = { stdout: true };
const fs = require('fs');

try {
  // eslint-disable-next-line global-require
  supportsColor = require('supports-color');
} catch (error) {
  // Do nothing
  // on MODULE_NOT_FOUND when installed by pnpm
}

const colorSupported = supportsColor.stdout;

const YELLOW = colorSupported ? '\x1b[1;33m' : '';
const GRAY = colorSupported ? '\x1b[0;37m' : '';
const RED = colorSupported ? '\x1b[0;31m' : '';
const GREEN = colorSupported ? '\x1b[0;32m' : '';
const BLUE = colorSupported ? '\x1b[1;34m' : '';

/** End of style, removes all attributes (formatting and colors) */
const EOS = colorSupported ? '\x1b[0m' : '';
const BOLD = colorSupported ? '\x1b[1m' : '';

const commitMsgContent = fs.readFileSync('.git/COMMIT_EDITMSG', 'utf-8');
const msg = getFirstLine(commitMsgContent).replace(/\s{2,}/g, ' ');
const branchName = require('child_process')
  .execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' })
  .split('\n')[0];

/*
 * Developer Todo: Change and update regex below according to your preferences.
 */
const pattern = /\[\S+?\]:\s+.+/g;
const result = pattern.test(msg);
const commitResultMsg = result ? 'SUCCESS' : 'FAILED';
console.log(
  'msg:',
  msg,
  'result:',
  result,
  'commitResultMsg:',
  commitResultMsg,
);
if (result) {
  console.log(
    `\n${GREEN}*********** Succesfully commit changes. Goodjob! ***********${EOS}\n`,
  );
  console.log(`${BOLD}Commit result:${EOS} ${GREEN}${commitResultMsg}${EOS}`);
  console.log(`${BOLD}Current branch:${EOS} ${branchName}`);
  console.log(`${BOLD}Commit message:${EOS} ${BLUE}${msg}${EOS}\n`);
  console.log(
    `\n${GREEN}***********************************************************${EOS}\n`,
  );

  process.exit(0);
} else {
  console.log(
    `\n${RED}************* Invalid Git Commit Message *************${EOS}\n`,
  );
  console.log(`${BOLD}Commit result:${EOS} ${RED}${commitResultMsg}${EOS}`);
  console.log(`${BOLD}Current branch:${EOS} ${branchName}`);
  console.log(`${BOLD}Commit message:${EOS} ${RED}${msg}${EOS}`);
  console.log(
    `${BOLD}Correct format:${EOS} ${GREEN}${'[<Ticket Number>]: <Message>'}${EOS}`,
  );
  console.log(
    `${BOLD}Example:${EOS} ${BLUE}[SISUAP-339]: add format commits rules with husky`,
  );
  console.log(
    `\n${RED}*****************************************************${EOS}\n`,
  );

  process.exit(1);
}

/**
 * It takes a buffer and returns the first line of the buffer as a string
 * @param buffer - The buffer to read from.
 * @returns The first line of the buffer.
 */
function getFirstLine(buffer) {
  return buffer.toString().split('\n').shift();
}
