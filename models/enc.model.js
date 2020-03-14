class enc {

	constructor(param) {
		this.dbinst = param.dbinst
	}

	getEnc(param) {
		return new Promise((resolve, reject) => {
			let sql = "SELECT post_title, post_content, post_date FROM `wp_posts` where post_status='publish' and post_type='post'  LIMIT 0, 20";
			this.dbinst.query(sql, function (err, result) {
				if(err) {
					reject({
						status: true,
						msg: err
					})
				} else {
					resolve({
						status: false,
						data: result
					})
				}
			});
		})		
	}
}

module.exports = enc;