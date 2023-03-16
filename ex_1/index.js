const {Create,ConcatFiles} = require('./functions')
const fs = require('node:fs/promises');

async function Main(){
  Create(1,"good day")
  Create(2,"boom boom")
  Create(3,"hello world")
  ConcatFiles();
}

Main()