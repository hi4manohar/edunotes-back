class books {

	constructor(param) {
		this.dbinst = param.dbinst
	}

	getBooksList() {
		return new Promise((resolve, reject) => {
			let sql = `SELECT wp_posts.*, p.guid FROM wp_posts 
			LEFT JOIN wp_postmeta as pm ON 
				wp_posts.ID=pm.post_id AND pm.meta_key='_thumbnail_id'
			LEFT JOIN wp_posts as p ON
				pm.meta_value=p.ID

			WHERE wp_posts.post_type="post" AND wp_posts.post_status = "private" AND wp_posts.ID IN (
			    SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (
			        SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE taxonomy = "category" AND term_id IN (
			            SELECT t.term_id FROM wp_terms t WHERE t.slug IN ("java-tutorial")
			        )
			    )
			)
			LIMIT 0, 20`;
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

	getBookDetails(params) {

		return new Promise((resolve, reject) => {

			let sql = `SELECT p.*, CASE WHEN p1.guid IS NULL THEN p.guid ELSE p1.guid END as reflink from wp_posts as p 

			LEFT JOIN wp_postmeta as pm ON 
				p.ID=pm.post_id AND pm.meta_key='_thumbnail_id'
			LEFT JOIN wp_posts as p1 ON
				pm.meta_value=p1.ID

			WHERE p.post_status IN('private', 'inherit') AND 
			p.post_type IN('post', 'attachment') AND 
			(p.ID='${params.bookid}' OR p.post_parent='${params.bookid}')`;

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

module.exports = books;