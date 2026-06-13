import { Injectable } from '@nestjs/common';
import * as XSLX from 'xlsx';

@Injectable()
export class FileUploadService {
    convertToJson(file: any) {
      const workbook = XSLX.read(file.buffer, {
        type: 'buffer',
        raw: false,
        cellDates: true,
      });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XSLX.utils.sheet_to_json(worksheet);
      return data;
    }
}
