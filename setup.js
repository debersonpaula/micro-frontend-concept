const { exec } = require('child_process');

runCommand('yarn');
runCommand('cd template-header && yarn');
runCommand('cd micro-home && yarn');
runCommand('cd micro-about && yarn');

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
