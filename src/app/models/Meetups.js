import Sequelize, { Model } from 'sequelize';
import { format } from 'date-fns';

class Meetups extends Model{
    static init(sequelize){
        super.init({
            title: Sequelize.STRING,
            description: Sequelize.STRING,
            localization: Sequelize.STRING,
            date: Sequelize.DATE,
        },
        { sequelize }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user_meet'});
        this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner'});
        this.belongsToMany(models.User, { through: 'UserMeet', foreignKey: 'fk_meets_id', as: 'meetUserId'})
    }
}


export default Meetups;