const { exec } = require('child_process');

runCommand('mkdir dist');
runCommand('cp index.html dist/index.html');
runCommand('cd template-header && yarn build');
runCommand('cd micro-home && yarn build');
runCommand('cd micro-about && yarn build');

function runCommand(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
