class answers {

    constructor(param) {
        this.dbinst = param.dbinst
    }

    getAnswersList(param) {
        return new Promise((resolve, reject) => {
            // let sql = `SELECT 
			// 	wp_posts.ID,
			// 	wp_posts.post_author,
			// 	wp_posts.post_date,
			// 	wp_posts.post_content,
			// 	wp_posts.post_title,
			// 	wp_posts.post_status,
			// 	wp_posts.post_name,
			// 	wp_posts.menu_order,
			// 	wp_posts.post_type,
			// 	wp_posts.post_mime_type,
			// 	CONCAT(
			// 		'https://s3.amazonaws.com/edunotes-media/',
			// 		s3t.path
			// 	) as guid FROM wp_posts 
			// LEFT JOIN wp_postmeta as pm ON 
			// 	wp_posts.ID=pm.post_id AND pm.meta_key='_thumbnail_id'
			// LEFT JOIN wp_as3cf_items as s3t ON 
			// 		pm.meta_value = s3t.source_id

			// WHERE wp_posts.post_type="post" AND wp_posts.post_status = "publish" AND wp_posts.ID IN (
			//     SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (
			//         SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE taxonomy = "category" AND term_id IN (
            //             SELECT t.term_id FROM wp_terms t WHERE 
            //             t.slug IN ("${param.class}", "answers", "${param.board}")
			//         )
			//     ) GROUP by (object_id)
			// 		having COUNT(object_id) = 3
			// )
            // LIMIT ${param.page}, ${param.offset}`;

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
                    GROUP_CONCAT(wtr.term_taxonomy_id) as txids, 
                    GROUP_CONCAT(t.name) as tags,
                    CONCAT(
                        'https://s3.amazonaws.com/edunotes-media/',      
                        s3t.path
                    ) as guid FROM wp_posts
            LEFT JOIN wp_postmeta as pm ON
                    wp_posts.ID=pm.post_id AND pm.meta_key='_thumbnail_id'   
            LEFT JOIN wp_as3cf_items as s3t ON
                            pm.meta_value = s3t.source_id
            LEFT JOIN wp_term_relationships as wtr ON
                        wtr.object_id=wp_posts.ID LEFT JOIN wp_term_taxonomy as tt ON
                        (tt.term_id=wtr.term_taxonomy_id and tt.taxonomy="post_tag") 
                        LEFT JOIN wp_terms as t ON
                        t.term_id=tt.term_id
            WHERE wp_posts.post_type="post" AND wp_posts.post_status = "publish" AND wp_posts.ID IN (
                SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (
                    SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE 
                    taxonomy = "category" AND term_id IN (
                        SELECT t.term_id FROM wp_terms t WHERE
                        t.slug IN ("${param.class}", "answers", "${param.board}")
                    )
                ) GROUP by (object_id) having COUNT(object_id) = 3
            ) GROUP by(ID) LIMIT ${param.page}, ${param.offset}`;
            this.dbinst.query(sql, function (err, result) {
                if (err) {
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

module.exports = answers;