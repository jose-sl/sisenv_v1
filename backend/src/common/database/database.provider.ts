import * as mongoose from 'mongoose';

export const databaseProvider = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>

    await mongoose.connect('mongodb://localhost:27017/sis_env?authSource=admin', {
      useNewUrlParser: true,
      useFindAndModify: false
    })
  }
];

