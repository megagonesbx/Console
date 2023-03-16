import express from "express";
import { IUser } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      user  : IUser;
      uid   : string;
    }
  }
}