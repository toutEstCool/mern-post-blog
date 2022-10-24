import { postControllers, userControllers } from './controllers/index.js'
import checkAuth from './utils/checkAuth.js'
import { registerValidation } from './validations/authValidation.js'
import { loginValidation } from './validations/loginValidation.js'
import { postValidation } from './validations/postValidation.js'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

mongoose
	.connect(
		'mongodb+srv://admin:qwerty12345@cluster0.rzbq4j8.mongodb.net/blog?retryWrites=true&w=majority'
	)
	.then(() => console.log('Server BD Connected...'))
	.catch(() => console.log('Server BD Connected Error...'))

const app = express()
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

// Upload Images
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
})

// { User}
// Created User
app.post('/auth/register', registerValidation, userControllers.register)
// Login User
app.post('/auth/login', loginValidation, userControllers.login)
// Get Data Profile User
app.get('/auth/profile', checkAuth, userControllers.getMe)

// { Post }
// Created Post
app.post('/post', checkAuth, postValidation, postControllers.createdNewPost)
// Get All Posts
app.get('/post', postControllers.getAllPosts)
// Get Single Post
app.get('/post/:id', postControllers.getSinglePost)
// Remove Post
app.delete('/post/:id', checkAuth, postControllers.removePost)
// Update Post
app.patch('/post/:id', checkAuth, postValidation, postControllers.updatePost)

app.listen('4000', (err) => {
	if (err) return console.log(`Ошибка Сервера... ${err}`)
	console.log(`Сервер был успешно запущен...`)
})
