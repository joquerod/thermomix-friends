import fs from 'fs';
import { parse } from 'csv-parse';
import { Consultant, CSVRow } from './types';
import { v4 as uuidv4 } from 'uuid';

export const parseConsultantsCSV = async (filePath: string): Promise<Consultant[]> => {
  return new Promise((resolve, reject) => {
    const consultants: Consultant[] = [];
    
    fs.createReadStream(filePath)
      .pipe(parse({ 
        columns: true, 
        skip_empty_lines: true,
        trim: true 
      }))
      .on('data', (row: CSVRow) => {
        const consultant: Consultant = {
          id: uuidv4(),
          originalIdentifier: row.Identifier,
          consultant: row.Consultant,
          branch: row.Branch,
          lead: row.Lead,
          city: row.City,
          zipcode: row.Zipcode,
        };
        consultants.push(consultant);
      })
      .on('end', () => {
        console.log(`Parsed ${consultants.length} consultants from CSV`);
        resolve(consultants);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};