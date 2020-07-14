import Sequelize, {Model} from 'sequelize';

class UserMeet extends Model {
	static init(sequelize) {
		super.init({
		}, { sequelize } );
		return this;
	}

	static associate(models){
		this.belongsTo(models.User, {foreignKey: 'fk_users_id', as: 'fk_users'});
		this.belongsTo(models.Meetups, {foreignKey: 'fk_meets_id', as: 'fk_meets'});
	}
}

export default UserMeet;