import express from 'express';
import { searchData, searchKeywordController } from '../controllers/SearchController';

const router = express.Router();

router.get('/search-keyword', searchKeywordController)
router.get('/search', searchData)

export default router