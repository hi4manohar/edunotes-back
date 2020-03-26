class classmodel {

	constructor(param) {
		this.dbinst = param.dbinst
	}

	getClassList() {
		return new Promise((resolve, reject) => {
			let sql = `SELECT *
				FROM wp_term_relationships
				LEFT JOIN wp_term_taxonomy
				   ON (wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id)
				LEFT JOIN wp_terms on wp_term_taxonomy.term_taxonomy_id = wp_terms.term_id
				WHERE wp_term_taxonomy.taxonomy = 'category'
				GROUP BY wp_term_taxonomy.term_id`;
			this.dbinst.query(sql, function (err, result) {
				if(err) {
					reject({
						status: false,
						msg: err
					})
				} else {
					resolve({
						status: true,
						data: result
					})
				}
			});
		})		
	}

	getArticleByClass(param) {
		return new Promise((resolve, reject) => {
			let sql = `SELECT wp_posts.*, p.guid FROM wp_posts 
			LEFT JOIN wp_postmeta as pm ON 
				wp_posts.ID=pm.post_id AND pm.meta_key='_thumbnail_id'
			LEFT JOIN wp_posts as p ON
				pm.meta_value=p.ID

			WHERE wp_posts.post_type="post" AND wp_posts.post_status = "publish" AND wp_posts.ID IN (
			    SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (
			        SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE taxonomy = "category" AND term_id IN (
			            SELECT t.term_id FROM wp_terms t WHERE t.slug IN ("${param.slug}")
			        )
			    )
			)
			LIMIT 0, 20`;
			this.dbinst.query(sql, function (err, result) {
				if(err) {
					reject({
						status: false,
						msg: err
					})
				} else {
					resolve({
						status: true,
						data: result
					})
				}
			});
		})	
	}

	getboardlist(param) {
		return new Promise((resolve, reject) => {
			let sql = `SELECT tt.description, t.name, t.slug FROM wp_term_taxonomy as tt 
				INNER JOIN wp_terms as t ON t.term_id=tt.term_id WHERE tt.parent IN(
					SELECT wt.term_id FROM wp_terms as wt WHERE wt.slug='board'
				)`;
			this.dbinst.query(sql, function (err, result) {
				if(err) {
					reject({
						status: false,
						msg: err
					})
				} else {
					resolve({
						status: true,
						data: result
					})
				}
			});
		})
	}
}

module.exports = classmodel;