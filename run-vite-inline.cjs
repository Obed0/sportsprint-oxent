const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'vite-output.log');
const logStream = fs.createWriteStream(logFile, { flags: 'w' });

console.log('Spawning vite dev server inline, logging to:', logFile);

const child = spawn('node', [path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js')]);

child.stdout.on('data', (data) => {
  logStream.write(data);
  fs.fsyncSync(logStream.fd);
});

child.stderr.on('data', (data) => {
  logStream.write(data);
  fs.fsyncSync(logStream.fd);
});

child.on('close', (code) => {
  logStream.write(`\nChild process exited with code ${code}\n`);
  fs.fsyncSync(logStream.fd);
  process.exit(code);
});
