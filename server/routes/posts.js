import express from 'express';
import { getFeedPosts, getUserPosts, likePost, commentPost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// CREATE
router.post('/:id/comment', commentPost);

// READ
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);

// UPDATE
router.patch('/:id/like', likePost);


export default router;