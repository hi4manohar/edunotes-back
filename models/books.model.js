class books {

	constructor(param) {
		this.dbinst = param.dbinst
	}

	getBooksList(param) {
		return new Promise((resolve, reject) => {
			// let sql = `SELECT wp_posts.*, p.guid FROM wp_posts 
			// LEFT JOIN wp_postmeta as pm ON 
			// 	wp_posts.ID=pm.post_id AND pm.meta_key='_thumbnail_id'
			// LEFT JOIN wp_posts as p ON
			// 	pm.meta_value=p.ID

			// WHERE wp_posts.post_type="post" AND wp_posts.post_status = "publish" AND wp_posts.ID IN (
			//     SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (
			//         SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE taxonomy = "category" AND term_id IN (
			//             SELECT t.term_id FROM wp_terms t WHERE t.slug IN ("${param.class}", "books", "${param.board}")
			//         )
			//     ) GROUP by(object_id) having COUNT(object_id)=3
			// )
			// LIMIT 0, 20`;
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
				wp_posts.post_mime_type,
				CONCAT(
					'https://s3.amazonaws.com/edunotes-media/',
					s3t.path
				) as guid
			FROM
				wp_posts
				LEFT JOIN wp_postmeta as pm ON wp_posts.ID = pm.post_id
				AND pm.meta_key = '_thumbnail_id'
				LEFT JOIN wp_as3cf_items as s3t ON pm.meta_value = s3t.source_id
			WHERE
				wp_posts.post_type = "post"
				AND wp_posts.post_status = "publish"
				AND wp_posts.ID IN (
					SELECT
						object_id
					FROM
						wp_term_relationships
					WHERE
						term_taxonomy_id IN (
							SELECT
								term_taxonomy_id
							FROM
								wp_term_taxonomy
							WHERE
								taxonomy = "category"
								AND term_id IN (
									SELECT
										t.term_id
									FROM
										wp_terms t
									WHERE
										t.slug IN ("${param.class}", "books", "${param.board}")
								)
						)
					GROUP by
			(object_id)
					having
						COUNT(object_id) = 3
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

	getBookDetails(params) {

		return new Promise((resolve, reject) => {

			let selectList = [
				'p.ID',
				'p.post_author',
				'p.post_date',
				'p.post_content',
				'p.post_title',
				'p.post_status',
				'p.post_name',
				'p.menu_order',
				'p.post_type',
				'p.post_mime_type'
			];

			let sql = ` SELECT ${selectList.join()},
				CONCAT(
					'https://s3.amazonaws.com/edunotes-media/',
					s3t.path
				) as reflink
			from
				wp_posts as p
				LEFT JOIN wp_postmeta as pm ON 
						p.ID=pm.post_id AND pm.meta_key='_thumbnail_id'
				LEFT JOIN wp_posts as p1 ON
						pm.meta_value=p1.ID
				LEFT JOIN wp_as3cf_items as s3t ON p1.ID = s3t.source_id
				
			WHERE
				p.post_status IN('publish')
				AND p.post_type IN('post')
				AND (p.ID = '${params.bookid}')
				
			UNION

			SELECT
				${selectList.join()},
				CONCAT(
					'https://s3.amazonaws.com/edunotes-media/',
					s3t.path
				) as reflink
			from
				wp_posts as p
				LEFT JOIN wp_as3cf_items as s3t ON p.ID = s3t.source_id
			WHERE
				p.post_status IN('publish', 'inherit')
				AND p.post_type IN('attachment')
				AND (p.post_parent = '${params.bookid}') 
				ORDER BY menu_order, post_date ASC`;

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