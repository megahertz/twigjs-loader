import * as express from "express";

declare module "express" {
  interface Response {
    render(
      view: any,
      options?: object,
      callback?: (err: Error, html: string) => void,
    ): void;
    render(view: any, callback?: (err: Error, html: string) => void): void;
  }
}
