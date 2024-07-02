import express from 'express';
import { createFoodNote, fetchFoodNote } from '../controllers/foodNote';
import { protectionAuth } from '../middlewares/verifyAuth';
import { upload } from '../middlewares/upload';
import { createPost, fetchPosts } from '../controllers/community/PostController';
import { addFollow } from '../controllers/community/FollowerController';
import { addLike } from '../controllers/community/AddLikePost';

const router = express.Router();

router.post('/community/post', upload.array('imgs', 5), protectionAuth, createPost);
router.post('/follow', protectionAuth, addFollow);
router.get('/posts', protectionAuth, fetchPosts);
router.put('/post/like', protectionAuth, addLike);

export default router