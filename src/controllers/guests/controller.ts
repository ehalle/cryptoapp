import { NextFunction, Request, Response } from "express";

export async function welcome(req: Request, res: Response, next: NextFunction) {
    res.render('guests/welcome');
}