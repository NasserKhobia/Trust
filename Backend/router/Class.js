import express from 'express';
import { Add, Delete, Get, Update } from '../controller/class.js';

const router = express.Router();

router.post('/add',Add);
router.delete('/:id',Delete);
router.put('/:id',Update);
router.get('/',Get);

export default router;