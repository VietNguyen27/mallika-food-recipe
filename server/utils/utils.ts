import fs from 'fs';
import jwt from 'jsonwebtoken';

export const getRandomNumber = (range: number): number => {
  return Math.floor(Math.random() * range);
};

export const base64Encode = (file: string): string => {
  const bitmap = fs.readFileSync(file);

  return Buffer.from(bitmap).toString('base64');
};

export const generateAccessToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
