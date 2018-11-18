import { Readable } from "stream";

export const toStream = (string: string): Readable => {
  const read = new Readable();
  read.push(string);
  read.push(null);
  return read;
};
