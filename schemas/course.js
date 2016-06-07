var mongoose = require('mongoose');


var CourseSchema = new mongoose.Schema({

	course_address: String,
	course_class: String,
	course_description: String,
	course_tittle: String,
	teacher_id: String,
	create_date: {
		type: Date,
		default: Date.now
	},
	update_date: {
		type: Date,
		default: Date.now
	},
	status: String

});



CourseSchema.statics = {
	findPagination: function(obj, callback) {
		var course = this;
		var q = obj.search || {}
		var col = obj.columns;
		console.log('----------------q-----------' + q);
		var pageNumber = obj.page.num || 1;
		var resultsPerPage = obj.page.limit || 10;

		var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
		var query = course.find(q, col).sort('-create_date').skip(skipFrom).limit(resultsPerPage);

		query.exec(function(error, results) {
			if (error) {
				callback(error, null, null);
			} else {
				course.count(q, function(error, count) {
					if (error) {
						callback(error, null, null);
					} else {
						var pageCount = Math.ceil(count / resultsPerPage);
						console.log('---------------------------' + pageCount);
						console.log('----------------results-----------' + results);
						callback(null, pageCount, results);
					}
				});
			}
		});
	}

}


module.exports = CourseSchema;