import { CodeBankDto } from 'src/code-bank/dto/codeBank.dto';
import * as fs from 'fs';

export class HelperFunctions {
  public generateChargingCodes(body: CodeBankDto): CodeBankDto[] {
    const generatedCodes = [];
    let uniqueCodeCount = 0;

    while (uniqueCodeCount < body.numberOfCodes) {
      const min = Math.pow(10, 7);
      const max = Math.pow(10, 8) - 1;
      const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

      if (generatedCodes.map((el) => el.code !== randomCode)) {
        generatedCodes.push({
          code: randomCode,
          price: body.codePrice,
          prefix: body.prefix,
        });
        uniqueCodeCount++;
      }
    }

    return generatedCodes;
  }

  deletePDFFiles(filesPaths: any): void {
    const filesLength = filesPaths.length;

    for (let i = 0; i < filesLength; i++) {
      if (typeof filesPaths[i] !== 'string') {
        for (let j = 0; j < filesLength; j++) fs.unlinkSync(filesPaths[j].path);
        break;
      } else for (let j = 0; j < filesLength; j++) fs.unlinkSync(filesPaths[j]);
      break;
    }
  }
}
