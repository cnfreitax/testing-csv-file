const { error } = require("./constants");
const File = require("./file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./../mocks/empytFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = "./../mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./../mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Victor Freitas",
        id: 123,
        profession: "Jr Developer",
        birthDay: 1998,
      },
      {
        name: "Joao Jhones",
        id: 127,
        profession: "Pl Developer",
        birthDay: 1994,
      },
      {
        name: "MotaSem",
        id: 129,
        profession: "Sr Developer",
        birthDay: 1954,
      },
    ];

    // deepSterictEqual olha para todo o objeto além de verificar o valor
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
