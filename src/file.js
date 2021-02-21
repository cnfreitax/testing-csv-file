const { readFile } = require("fs/promises");
const { error } = require("./constants");
const User = require('./user')
 
const DEFAUTL_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    const users = File.aprseCSVToJson(content)
    return users
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString("utf8");
  }

  static isValid(cstString, options = DEFAUTL_OPTIONS) {
    const [header, ...fileWithouHeader] = cstString.split("\n");
    const isValidHeader = header === options.fields.join(",");

    if (!isValidHeader) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      fileWithouHeader.length > 0 &&
      fileWithouHeader.length === options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static aprseCSVToJson(csvString) {
    const lines = csvString.split("\n");
    // remove o primeiro item e joga na variavel
    const firstLine = lines.shift();
    const header = firstLine.split(",");
    const users = lines.map((line) => {
      const columns = line.split(",");
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }
      return new User(user)
    });
    return users
  }
}

(async () => {
  const result = await File.csvToJson("./../mocks/threeItems-valid.csv");
  // const result = await File.csvToJson("./../mocks/fourItems-invalid.csv");
  // const result = await File.csvToJson("./../mocks/invalid-header.csv");
})();

module.exports = File;
