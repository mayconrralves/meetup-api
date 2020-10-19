import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Meetups from '../app/models/Meetups';
import UserMeet from '../app/models/UserMeet';

const models = [ User, File, Meetups, UserMeet ];
class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }

    mongo() {
    	this.mongoConnection = mongoose.connect(
    		process.env.MONGO_URL,
    		{ useNewUrlParser: true, useUnifiedTopology: true }
    	);
    }
}


export default new Database();