import { NextFunction, Request, Response } from "express";

export function dashboard (req: Request, res: Response, next: NextFunction) {
    console.log('dashboard');
    res.send("hello");
}