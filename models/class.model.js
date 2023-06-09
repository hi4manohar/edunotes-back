class classmodel {

	constructor(param) {
		this.dbinst = param.dbinst
	}

	getSubjectList(param) {
		return new Promise((resolve, reject) => {
			// let sql = `SELECT t.name, t.slug, t.term_id, tt.description 
			// FROM wp_term_taxonomy as tt INNER JOIN wp_terms as t 
			// on tt.term_id=t.term_id WHERE tt.parent IN (
			//     select term_id from wp_terms where wp_terms.slug='subjects'
			// )`;

			let sql = `SELECT 
			wp_posts.post_title as name,
			wp_posts.post_name as slug from wp_posts
			WHERE wp_posts.post_type="post" AND 
				wp_posts.post_status = "publish" AND 
				wp_posts.ID IN (
			    SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (
			        SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE taxonomy = "category" AND term_id IN (
			            SELECT t.term_id FROM wp_terms t WHERE t.slug IN ("${param.class}", "${param.board}", "subjects-list", 'Syllabus')
			        )
			    ) GROUP by(object_id) having COUNT(object_id)=4
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

	getclasslist(param) {
		return new Promise((resolve, reject) => {
			let sql = `SELECT tt.description, t.name, t.slug FROM wp_term_taxonomy as tt 
				INNER JOIN wp_terms as t ON t.term_id=tt.term_id WHERE tt.parent IN(
					SELECT wt.term_id FROM wp_terms as wt WHERE wt.slug='class'
				) ORDER BY t.term_order ASC`;
			this.dbinst.query(sql, function (err, result) {
				if (err) {
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

	getArticleBySubject(param) {
		return new Promise((resolve, reject) => {
			let sql = `SELECT wp_posts.*, p.guid FROM wp_posts 
			LEFT JOIN wp_postmeta as pm ON 
				wp_posts.ID=pm.post_id AND pm.meta_key='_thumbnail_id'
			LEFT JOIN wp_posts as p ON
				pm.meta_value=p.ID

			WHERE wp_posts.post_type="post" AND wp_posts.post_status = "publish" AND wp_posts.ID IN (
			    SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (
			        SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE taxonomy = "category" AND term_id IN (
			            SELECT t.term_id FROM wp_terms t 
			            WHERE t.slug IN ("${param.class}", "${param.board}", "chapters", 'Syllabus', '${param.subjectname}')
			        )
			    ) GROUP by(object_id) having COUNT(object_id)=5
			)
			ORDER BY menu_order ASC LIMIT 0, 20`;
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

	getArticleByChapter(param) {
		return new Promise((resolve, reject) => {
			let sql = `SELECT wp_posts.*, p.guid FROM wp_posts 
			LEFT JOIN wp_postmeta as pm ON 
				wp_posts.ID=pm.post_id AND pm.meta_key='_thumbnail_id'
			LEFT JOIN wp_posts as p ON
				pm.meta_value=p.ID

			WHERE wp_posts.post_type="post" AND wp_posts.post_status = "publish" AND wp_posts.ID IN (
			    SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (
			        SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE taxonomy IN ("post_tag", "category") AND term_id IN (
			            SELECT t.term_id FROM wp_terms t 
			            WHERE t.slug IN ("${param.chaptername}", "chapter-posts", 'syllabus')
			        )
			    ) GROUP by(object_id) having COUNT(object_id)=3
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