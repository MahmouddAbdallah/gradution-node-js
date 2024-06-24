import express from 'express';
import { protectionAuth } from '../middlewares/verifyAuth';
import { upload } from '../middlewares/upload';
import { createStoreCategory, deleteStoreCategory, fetchStoreCategory, fetchStoreCategorys, updateStoreCategory } from '../controllers/Store/StoreCategoryController';
import { createStoreProduct, deleteStoreProduct, fetchStoreProduct, fetchStoreProducts, updateStoreProduct } from '../controllers/Store/StoreProduct';

const router = express.Router();

router.route('/store/category')
    .post(upload.array('img', 1), createStoreCategory)
    .get(fetchStoreCategorys)

router.route('/store/category/:id')
    .get(fetchStoreCategory)
    .put(updateStoreCategory)
    .delete(deleteStoreCategory)

router.route('/store/product')
    .post(protectionAuth, upload.array('img', 10), createStoreProduct)
    .get(fetchStoreProducts)

router.route('/store/product/:id')
    .get(fetchStoreProduct)
    .put(updateStoreProduct)
    .delete(deleteStoreProduct)

export default router