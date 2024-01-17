import express from 'express';

const router = express.Router();

router.post('/login', () => {
	console.log('login');
});
router.post('/signup', () => {
	console.log('login');
});

export default router;
