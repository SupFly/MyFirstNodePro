var mongoose = require('mongoose');
var crypto = require('crypto');


var UserSchema = new mongoose.Schema({
user_name : String,
user_email : String,
phone_number:String,
create_date : { type: Date, default: Date.now},
user_password:String
});


UserSchema.pre('save', function (next) {
	var user = this;

	// if (this.isNew) {
	// 	this.meta.createAt = this.meta.updateAt = Date.now();
	// } else {
	// 	this.meta.updateAt = Date.now();
	// }

	//每次都要重新构建hash，否则会报Caught exception: TypeError: HashUpdate fail
	var sha1 = crypto.createHash('sha1');

	user.user_password = sha1.update(user.user_password).digest('hex');

	next();
});


//静态方法
UserSchema.statics = {
	findByEmail:function(user_email,cb){
		return this.findOne({ user_email: user_email}, cb);
	}
}
//实例方法
UserSchema.methods = {
	comparePassword: function (password, cb) {
		//将密码进行sha算法加密
		
		var sha1 = crypto.createHash('sha1'),
			_password = sha1.update(password).digest('hex');

		cb(_password == this.user_password);
	}
};




module.exports = UserSchema;