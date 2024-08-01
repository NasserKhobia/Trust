import express from 'express';
import { Add, Delete, Get, Update } from '../controller/room.js';

const router = express.Router();

router.post('/add',Add);
router.delete('/:id',Delete);
router.post('/:id',Update);
router.post('/',Get);

export default router;