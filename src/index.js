'use strict';

const childProcess = require('child_process');
const path = require('path');
const express = require('express');

const app = express();
const expressWs = require('express-ws')(app);

const args = process.argv.slice(2);
const bin = args.splice(0,1)[0];

app.use(express.static(path.join(__dirname,'../public')));

app.ws('/shell', (ws, req) => {
  const p = childProcess.spawn(bin, args, {
    stdio: ['pipe','pipe','inherit'],
  });

  p.stdout.on('data' , data => {
    ws.send(data.toString('utf-8'));
  });

  p.once('close', (code) => {
    ws.send(`Process exited (${code})...\n`);
    ws.close();
  });

  p.once('error', err => {
    console.error('Process error', err);
    ws.send('Process error...\n');
    ws.close();
  });

  ws.on('message', msg => {
    p.stdin.write(msg);
  });

  ws.on('close', () => {
    p.kill('SIGKILL');
  });
});

console.log(`Listening on 0.0.0.0:8000`);
console.log(`Spawning: ${bin} ${args.join(' ')}`);

app.listen(process.env.PORT || 8000);
