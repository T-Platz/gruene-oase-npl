import mongoose from 'mongoose';

export function connect() {
    if (process.env.MONGODB_URI)
        mongoose.connect(process.env.MONGODB_URI).then(_ => console.log("Connected to db"));
    else
        console.error("MongoDB URL is missing");
}

export type Report = {
    _id: mongoose.ObjectId,
    lotId: mongoose.Schema.Types.ObjectId,
    timestamp: number,
    categoryId: number,
    description: string
};
export const Report = mongoose.model<Report>('Reports', new mongoose.Schema({
    lotId: { type: mongoose.Schema.Types.ObjectId, required: true },
    timestamp: { type: Number, required: true },
    categoryId: { type: Number, required: true },
    description: { type: String, required: true }
}, {
    toJSON: {
        transform: (_: Document, ret: any) => {
            delete ret._id;
            delete ret.__v;
        }
    }
}));

export type Lot = {
    _id: mongoose.ObjectId
};
export const Lot = mongoose.model<Lot>('Lots', new mongoose.Schema({}, {
    toJSON: {
        transform: (_: Document, ret: any) => ret._id
    }
}));

export type User = {
    _id: mongoose.ObjectId,
    email: string,
    phoneNumber: string,
    passwordhash: string,
    lots: Lot[]
};
export const User = mongoose.model<User>('Users', new mongoose.Schema({
    email: { type: String, required: true },
    passwordhash: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    lots: { type: [Lot.schema], required: true, default: [] }
}, {
    toJSON: {
        transform: (_: Document, ret: any) => {
            delete ret._id;
            delete ret.__v;
            delete ret.passwordhash;
        }
    }
}));
