import express from 'express';
import { upload } from '../middlewares/upload';
import { createBlogCategory, fetchBlogCategory } from '../controllers/Blog/categoryController';
import { createBlogArticle, fetchBlogArticle, fetchBlogArticleByUserId, fetchBlogArticles, updateBlogArticle } from '../controllers/Blog/articleController';
import { protectionAuth } from '../middlewares/verifyAuth'
import { createBlogSection, fetchBlogSections } from '../controllers/Blog/sectionController';
import { createBlogComment, fetchBlogComment } from '../controllers/Blog/commentController';
const router = express.Router();

router.route('/blog/category')
    .get(fetchBlogCategory)
    .post(protectionAuth, upload.array('img', 1), createBlogCategory)

router.route('/blog/article')
    .post(protectionAuth, upload.array('img', 1), createBlogArticle)
    .get(fetchBlogArticles)

router.route('/blog/article/:id')
    .get(fetchBlogArticle)
    .put(protectionAuth, upload.array('img', 1), updateBlogArticle)
router.route('/blog/article/sections/:articleId')
    .get(fetchBlogSections)

router.post('/blog/article/section', protectionAuth, upload.array('img', 1), createBlogSection)
router.post('/blog/comment/:articleId', protectionAuth, createBlogComment)
router.get('/blog/comment/:articleId', fetchBlogComment)
router.get('/blog/article/user/:userId', fetchBlogArticleByUserId)

export default router