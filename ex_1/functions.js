const fs = require("node:fs/promises");
const path = require("node:path");

async function Create(fileNum, text) {
  try {
    await fs.writeFile(
      path.join(__dirname, "files", "file" + fileNum + ".txt"),
      text
    );
    console.log("done");
  } catch (err) {
    console.error(err);
  }
}

async function Read(fileNum) {
  try {
    let data = await fs.readFile(
      path.join(__dirname, "files", "file" + fileNum + ".txt")
    );
    console.log(data.toString());
    return data.toString();
  } catch (err) {
    console.error("err");
  }
}

async function GetRandNumber() {
  return Math.floor(Math.random() * 5) + 1;
}

async function ConcatFiles() {
  let folder = path.join(__dirname, "files");
  let data = "";
  let allFiels = [];

  try {
    const files = await fs.readdir(folder);

    for (const file of files) {
      if (file.includes("concatTextFile.txt")) {
        await fs.unlink(path.join(__dirname, "files", "concatTextFile.txt"));
      }

      if (/\d/.test(file.toString())) {
        allFiels.push(file.toString());
      }
    }

    allFiels.sort();

    let randomNum = await GetRandNumber();
    // let randomNum = 2;

    for (const file of allFiels) {
      console.log(/\d/.test(file.toString()));

      if (file.includes(randomNum)) {
        break;
      } 


      data +=
        (await fs.readFile(path.join(__dirname, "files", file))).toString() +
        "\n";

    }

    await fs.writeFile(path.join(__dirname, "files", "stringtxt.txt"), data);

    await fs.rename(
      path.join(__dirname, "files", "stringtxt.txt"),
      path.join(__dirname, "files", "concatTextFile.txt")
    );

    console.log("done");

  } catch (err) {
    console.error(err);
  }

  console.log(data);
}

module.exports = { Create, Read, ConcatFiles };
