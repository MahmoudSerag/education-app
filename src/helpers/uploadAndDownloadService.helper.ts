import { Response } from 'express';
import * as mongoose from 'mongoose';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { extname } from 'path';
import * as ExcelJS from 'exceljs';
import { readFileSync } from 'fs';
import * as path from 'path';
import { CodeBankDto } from 'src/code-bank/dto/codeBank.dto';

export class UploadAndDownloadService {
  public async generateFile(
    generatedCodes: { code: string; price: number }[],
    body: CodeBankDto,
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('Code-Bank');

    worksheet.addRow(['Code', 'Price']);

    for (const obj of generatedCodes) {
      worksheet.addRow([`${body.prefix}-${obj.code}`, obj.price]);
    }

    const centerAlignedCellStyle = {
      alignment: { horizontal: 'center' },
    } as Partial<ExcelJS.Style>;

    worksheet.columns.forEach((column) => {
      column.eachCell((cell) => {
        cell.style = centerAlignedCellStyle;
      });
    });
    const fileName = 'Code-Bank.xlsx';

    const filePath = path.join(__dirname, `../../uploads/${fileName}`);

    await workbook.xlsx.writeFile(filePath);
  }

  public downloadFile(
    res: Response,
    fileName: string,
    fileMimeType: string,
  ): void {
    const filePath = path.join(__dirname, `../../uploads/${fileName}`);
    const fileContent = readFileSync(filePath);

    res.setHeader('Content-Type', `application/${fileMimeType}`);
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.status(200).send(fileContent);
  }
}

export const MulterConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req: any, file: { originalname: string }, callback) => {
      const originalName = file.originalname.split('.')[0];
      const fileId = new mongoose.Types.ObjectId().toString();
      const fileExtension = extname(file.originalname);
      const fileName = `${originalName}-${fileId}-${Date.now()}${fileExtension}`;

      return callback(null, fileName);
    },
  }),
  fileFilter: (req: Request, file: any, callback) => {
    if (!file.mimetype.includes('pdf') && req.files instanceof Array) {
      req.files.unshift(file);
      return callback(null, false);
    }

    return callback(null, true);
  },
  limits: { filesSize: 15 * 1024 * 1024, files: 5 },
};
