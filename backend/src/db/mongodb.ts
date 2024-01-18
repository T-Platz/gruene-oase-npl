import mongoose from 'mongoose';

export function connect() {
    if (process.env.MONGODB_URI) {
        try {
            mongoose.connect(process.env.MONGODB_URI).then(_ => console.log('Connected to db'));
        } catch (e) {
            console.error('Failed to connect to database:', e);
        }
    } else {
        console.error('MongoDB URL is missing');
    }
}

export enum ReportCategory {
    MESSAGE = 'Message',
    WATER = 'Water',
    HARVEST = 'Harvest',
    PRUNE = 'Prune',
    FERTILIZE = 'Fertilize',
    PEST = 'Pest'
};

export type Report = {
    _id: mongoose.ObjectId,
    lotNr: number,
    timestamp: number,
    category: ReportCategory,
    description: string,
    viewed: boolean
};
export const Report = mongoose.model<Report>('Reports', new mongoose.Schema({
    lotNr: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    category: { type: String, enum: Object.values(ReportCategory), required: true },
    description: { type: String, required: false },
    viewed: { type: Boolean, required: true }
}, {
    toJSON: {
        transform: (_: Document, ret: any) => {
            delete ret._id;
            delete ret.__v;
        }
    }
}));

export enum CommunityGarden {
    ZAK_BEWOHNERGARTEN = 'ZAK Bewohnergarten',
    ZAK_KINDERGARTEN = 'ZAK Kindergarten',
    KRAEUTERGARTEN_RMD = 'Kräutergarten Strehleranger',
    MIETERGARTEN_WSB = 'Mietergarten Karl-Marx-Allee',
    COMMUNITY_KITCHEN = 'Community Kitchen',
    KRAEUTERGARTEN_LTK = 'Kräutergarten Lätarekirche'
};

export type Lot = {
    _id: mongoose.ObjectId,
    nr: number,
    owner: mongoose.ObjectId | User,
    garden: CommunityGarden,
    name: string,
    timestamp: number
};
export const Lot = mongoose.model<Lot>('Lots', new mongoose.Schema({
    nr: { type: Number, required: true, unique: true },
    owner: { type: mongoose.Types.ObjectId, ref: 'Users', required: true },
    garden: { type: String, enum: Object.values(CommunityGarden), required: false },
    name: { type: String, required: true },
    timestamp: { type: Number, required: true }
}, {
    toJSON: {
        transform: (_: Document, ret: any) => {
            delete ret._id;
            delete ret.__v;
        }
    }
}));

export type Counter = {
    _id: mongoose.ObjectId,
    count: number
};
export const Counter = mongoose.model<Counter>('Counter', new mongoose.Schema({
    count: { type: Number, required: true, default: 0}
}));

export type User = {
    _id: mongoose.ObjectId,
    email: string,
    phoneNumber: string,
    passwordhash: string,
    lots: (mongoose.ObjectId | Lot)[],
    notify: boolean
};
export const User = mongoose.model<User>('Users', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordhash: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    lots: { type: [mongoose.Types.ObjectId], ref: 'Lots', required: true, default: [] },
    notify: { type: Boolean, required: true }
}, {
    toJSON: {
        transform: (_: Document, ret: any) => {
            delete ret._id;
            delete ret.__v;
            delete ret.passwordhash;
        }
    }
}));
