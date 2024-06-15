import express from 'express';
import { upload } from '../middlewares/upload';
import { createBlogCategory, fetchBlogCategory } from '../controllers/Blog/categoryController';
import { createBlogArticle, fetchBlogArticle, fetchBlogArticles } from '../controllers/Blog/articleController';
import { protectionAuth } from '../middlewares/verifyAuth'
import { createBlogSection } from '../controllers/Blog/sectionController';
const router = express.Router();

router.route('/blog/category')
    .get(fetchBlogCategory)
    .post(protectionAuth, upload.array('img', 1), createBlogCategory)

router.route('/blog/article')
    .post(protectionAuth, upload.array('img', 1), createBlogArticle)
    .get(fetchBlogArticles)

router.get('/blog/article/:id', fetchBlogArticle)

router.post('/blog/article/section', upload.array('img', 1), createBlogSection)

export default router