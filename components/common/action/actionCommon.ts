import readXlsxFile from "read-excel-file";

namespace actionCommon {
  export function capitalizeFirstLetter(str = "") {
    return str[0].toUpperCase() + str.slice(1);
  }
  export async function readFileExcel(file: File) {
    let data;
    await readXlsxFile(file).then((rows) => {
      data = rows;
    });
    return data;
  }

  export function capitalizeWord(string: string) {
    let words = string.split(" ");
    let capitalizedWords = [];
    for (let i = 0; i < words.length; i++) {
      capitalizedWords.push(
        words[i].charAt(0).toUpperCase() + words[i].slice(1)
      );
    }
    let capitalizedString = capitalizedWords.join(" ");
    return capitalizedString;
  }
}
export default actionCommon;
