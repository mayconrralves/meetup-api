import Sequelize, { Model } from 'sequelize';


class Meet extends Model{
    static init(sequelize){
        super.init({
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
    }
}


export default Meet;