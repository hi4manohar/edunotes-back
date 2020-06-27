class article {

	constructor(param) {
		this.dbinst = param.dbinst
	}

	getArticleList(param) {

		console.log('ddd');
		return new Promise((resolve, reject) => {
			let sql = `SELECT 
				wp_posts.ID,
				wp_posts.post_author,
				wp_posts.post_date,
				wp_posts.post_content,
				wp_posts.post_title,
				wp_posts.post_status,
				wp_posts.post_name,
				wp_posts.menu_order,
				wp_posts.post_type,
				wp_posts.guid as post_guid,
				wp_posts.post_mime_type,
				CONCAT('{', GROUP_CONCAT(CONCAT(pm.meta_key, ':', pm.meta_value) ), '}') as postmeta,
				CONCAT(
								
					SUBSTRING(p11.guid, 1, CHAR_LENGTH(p11.guid)-4),
					'-150x150',
					SUBSTRING(p11.guid, CHAR_LENGTH(p11.guid)-3, 4)
				) as guid FROM wp_posts 
			LEFT JOIN wp_postmeta as pm ON 
				wp_posts.ID=pm.post_id AND pm.meta_key='_thumbnail_id'
			LEFT JOIN wp_posts as p11 ON  	
					pm.meta_value = p11.ID

			WHERE wp_posts.post_type="post" AND wp_posts.post_status = "publish" AND wp_posts.ID IN (
			    SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (
			        SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE taxonomy = "category" AND term_id IN (
			            SELECT t.term_id FROM wp_terms t WHERE t.slug IN ("${param.category}")
			        )
			    )
			)
			GROUP BY wp_posts.ID 
			ORDER BY post_date DESC LIMIT ${param.page}, ${param.offset}`;
			this.dbinst.query(sql, function (err, result) {
				if(err) {
					console.log(err);
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

module.exports = article;