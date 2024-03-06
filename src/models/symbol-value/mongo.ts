import { DTO } from "./dto";
import Model from "./model";
import mongoose from "../../db/mongo";

const symbolValueSchema = new mongoose.Schema<DTO>({
    symbol: String,
    value: Number,
    when: Date
});

const symbolValueModel = mongoose.model<DTO>('SymbolValue', symbolValueSchema);

class Mongo implements Model {
    async add(symbolValue: DTO): Promise<DTO> {    
        const newSymbolValue = new symbolValueModel<DTO>(symbolValue);
        await newSymbolValue.save();
        console.log(`Symbol value created, with id ${newSymbolValue.id}`);
        return newSymbolValue;
    }

    async getLatest(symbol: string): Promise<DTO> {
        const symbolValue: DTO[] = await symbolValueModel.find({ symbol }).sort({ when: -1}).limit(1);
        return symbolValue[0];
    }
}

const mongo = new Mongo();
export default mongo;