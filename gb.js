const fs = require("fs");
const { Transform } = require("stream");

const ipNew = ["89.123.1.41", "34.48.240.111"];

const newFile = (ip) => {
   return `./${ip}_requests.log`;
}

const readStream = fs.createReadStream(srcFile, "utf-8");

ipNew.forEach((ip) => {
  const regExp = new RegExp(`^${ip}.*$`, "gm");
  const outputFileName = newFile(ip);

  const transStream = new Transform({
    transform(chunk, _enc, callback) {
      let changeChunk = null;
      const searchArray = chunk.toString().match(regExp);
      if (searchArray) {
        changeChunk = searchArray.join("\n") + "\n";
      }
      callback(null, changeChunk);
    },
  });

  const writeStream = fs.createWriteStream(outputFileName, "utf-8");

  readStream.pipe(transStream).pipe(writeStream);
})