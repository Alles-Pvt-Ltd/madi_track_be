import { Request, Response } from "express";
import { AppFunction } from "../../core/app";

export default class Helper {
  public static getToken = (username: string, email: string): { token: string } => {
      const token = AppFunction.createJwtToken(username, email);
      return { token };
  };
}
