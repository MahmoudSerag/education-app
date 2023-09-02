import { CodeBankDto } from 'src/code-bank/dto/codeBank.dto';
import * as fs from 'fs';

export class HelperFunctions {
  public generateChargingCodes(
    body: CodeBankDto,
  ): { code: string; price: number }[] {
    const generatedCodes = new Array(body.numberOfCodes);
    const min = Math.pow(10, 11);
    const max = Math.pow(10, 12) - 1;

    for (let i = 0; i < body.numberOfCodes; i++) {
      const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

      generatedCodes[i] = {
        code: randomCode.toString(),
        price: body.codePrice,
      };
    }

    return generatedCodes;
  }

  deletePDFFiles(filesPaths: any): void {
    const filesLength = filesPaths.length;
    if (typeof filesPaths[0] === 'string')
      for (let i = 0; i < filesLength; i++) fs.unlinkSync(filesPaths[i]);
    else
      for (let i = 0; i < filesLength; i++) fs.unlinkSync(filesPaths[i].path);
  }
}
