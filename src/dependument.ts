/// <reference path="../typings/node/node.d.ts" />

import * as fs from 'fs';

export class Dependument {
  private source: string;
  private output: string;

  constructor(options: any) {
    if (!options) {
      throw new Error("No options provided");
    }

    if (!options.source) {
      throw new Error("No source path specified in options");
    }

    if (!options.output) {
      throw new Error("No output path specified in options");
    }

    this.source = options.source;
    this.output = options.output;
  }

  public process() {
    this.readInfo((info: string) => {
      this.writeOutput(info);
    });
  }

  private readInfo(success: (info: string) => any) {
    fs.readFile(this.source, (err, data: Buffer) => {
      if (err) {
        throw err;
      }

      success(data.toString());
    });
  }

  private writeOutput(output: string) {
    fs.writeFile(this.output, output, (err) => {
      if (err) throw err;
      console.log(`Output written to ${this.output}`);
    });
  }
}
