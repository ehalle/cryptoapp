import { DTO } from "./dto";
import Model from "./model";
import mongoose from "../../db/mongo";

const symbolValueSchema = new mongoose.Schema<DTO>({
    symbol: String,
    value: Number,
    when: Date
});

const SymbolValueModel = mongoose.model<DTO>('SymbolValue', symbolValueSchema);

class Mongo implements Model {
    async add(symbolValue: DTO): Promise<DTO> {    
        const newSymbolValue = new SymbolValueModel<DTO>(symbolValue);
        await newSymbolValue.save();
        console.log(`Symbol value created, with id ${newSymbolValue.id}`);
        return newSymbolValue;
    }
}

const mongo = new Mongo();
export default mongo;