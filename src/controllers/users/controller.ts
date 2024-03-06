import { NextFunction, Request, Response } from "express";
import getModel from "../../models/user-symbol/factory";
import getSymbolValueModel from "../../models/symbol-value/factory";
import { DTO } from "../../models/user-symbol/dto";
import config from "config";

export async function dashboard (req: Request, res: Response, next: NextFunction) {
    try {
        const userSymbols = await getModel().getForUser(1);
        const symbolValues = await Promise.all(userSymbols.map(symbol => 
            getSymbolValueModel().getLatest(symbol.symbol)
        ));
        res.render('users/dashboard', {
            userSymbols,
            symbolValues,
            io: {
                host: config.get<string>('app.io.host'),
                port: config.get<string>('app.io.port')
            } 
        });
    } catch(err) {
        next(err);
    }
}

export async function addSymbol (req: Request, res: Response, next: NextFunction) {
    try {
        const userSymbolModel = getModel();
        const inputUserSymbol: DTO = {
            ...req.body,
            userId: 1
        };
        const newUserSymbol = await userSymbolModel.add(inputUserSymbol);
        console.log(`New user-symbol added with id ${newUserSymbol.id}`);
        res.redirect('/users/dashboard');
    } catch(err) {
        next(err);
    }
}