const fs = require("fs");
const path = require("path");

const fileRemover = (filename) => {
    fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
        if (err && err.code == "ENOENT") {
            // file doesn't exit
            console.log(`File ${filename} does not exist.`);
        } else if (err) {
            console.log(
                `Error occurred while trying to remove file ${filename}`
            );
        } else {
            console.log(`${filename} removed successfully`);
        }
    });
};

module.exports = fileRemover;
