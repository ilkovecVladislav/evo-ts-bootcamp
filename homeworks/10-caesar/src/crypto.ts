import { Transform, TransformCallback } from "stream";

const ENGLISH_ALPHABET_LENGTH = 26;
const FIRST_UPPER_LETTER_ASCII_CODE = 65;
const LAST_UPPER_LETTER_ASCII_CODE = 90;
const FIRST_LOWER_LETTER_ASCII_CODE = 97;
const LAST_LOWER_LETTER_ASCII_CODE = 122;

const encrypt = (text: string, shift: number): string => {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);

    if (
      char >= FIRST_UPPER_LETTER_ASCII_CODE &&
      char <= LAST_UPPER_LETTER_ASCII_CODE
    ) {
      result += String.fromCharCode(
        ((char - FIRST_UPPER_LETTER_ASCII_CODE + shift) %
          ENGLISH_ALPHABET_LENGTH) +
          FIRST_UPPER_LETTER_ASCII_CODE
      );
    } else if (
      char >= FIRST_LOWER_LETTER_ASCII_CODE &&
      char <= LAST_LOWER_LETTER_ASCII_CODE
    ) {
      result += String.fromCharCode(
        ((char - FIRST_LOWER_LETTER_ASCII_CODE + shift) %
          ENGLISH_ALPHABET_LENGTH) +
          FIRST_LOWER_LETTER_ASCII_CODE
      );
    } else {
      result += text.charAt(i);
    }
  }

  return result;
};

const decrypt = (text: string, shift: number): string => {
  const decryptShift =
    (ENGLISH_ALPHABET_LENGTH - shift) % ENGLISH_ALPHABET_LENGTH;

  return encrypt(text, decryptShift);
};

export class Caesar extends Transform {
  action;
  shift;

  constructor(action: string, shift: number) {
    super();
    this.action = action;
    this.shift = shift;
  }

  _transform(chunk: Buffer, _: any, callback: TransformCallback) {
    const text = chunk.toString();
    const result =
      this.action === "encode"
        ? encrypt(text, this.shift)
        : decrypt(text, this.shift);

    callback(null, result);
  }
}
