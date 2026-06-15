import { Injectable } from '@nestjs/common';
import * as XSLX from 'xlsx';
import * as ExcelJS from 'exceljs';

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

  convertToExcel(data: Record<string, any>[]): ExcelJS.Workbook {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Dados');

    if (data.length) {
      worksheet.columns = Object.keys(data[0])?.map(key => ({
        header: key,
        key,
        width: 25,
      }));

      worksheet.addRows(data);
    }

    return workbook;
  }
}
