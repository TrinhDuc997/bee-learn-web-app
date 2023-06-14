import readXlsxFile from "read-excel-file";
import { dictionary } from "cmu-pronouncing-dictionary";
import { toEnglishPhoneticAlphabet } from "arpabet-and-ipa-convertor-ts";

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

  // Handle name user - START
  export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  export function stringAvatar(name = "") {
    return `${name.split(" ")[0][0]}${
      name.split(" ")[name.split(" ").length - 1][0]
    }`;
  }

  export function invertColor(hexColor: string) {
    if (hexColor.indexOf("#") === 0) {
      hexColor = hexColor.slice(1);
    }
    // convert hex color to decimal value
    let decimalColor = parseInt(hexColor, 16);
    // invert the color
    let invertedDecimalColor = 0x00ffffff - decimalColor;
    // convert the inverted decimal color back to hex
    let invertedHexColor = invertedDecimalColor.toString(16);
    // add leading zeros if needed
    invertedHexColor = ("000000" + invertedHexColor).slice(-6);
    // add the "#" prefix
    invertedHexColor = "#" + invertedHexColor;
    return invertedHexColor;
  }
  // Handle name user - END

  // Handle Phonetic - START
  export function getIpaPronunciation(word: string) {
    const arrayWords = word.split(" ");
    let pronunciations: string[] = [];
    arrayWords.forEach((i) => {
      const pronunciation = dictionary[i];
      pronunciations.push(toEnglishPhoneticAlphabet(pronunciation) || "");
    });

    return pronunciations.length > 0 ? pronunciations.join(" ") : "";
  }
  //Handle Phonetic - END
}
export default actionCommon;
