# Totally not scuffed webshell thing

Let's you pipe stdin/stdout of any program to a website, that looks like a hacker
terminal.

## How to use
```bash
$ git clone https://github.com/Douile/scuffed-webshell
$ cd scuffed-webshell
$ npm i
$ node ./src/index.js program args
```

You can spawn any program when someone connects e.g.
```bash
For nc 127.0.0.1 31337
$ node ./src/index.js nc 127.0.0.1 31337
```

## WARNING
**This has no protections against spam or hacking use at your own risk.**
