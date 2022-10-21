import {
	createdNewPost,
	getAllPosts,
	getSinglePost,
	removePost,
	updatePost,
} from './controllers/postController.js'
import { getMe, login, register } from './controllers/userControllers.js'
import checkAuth from './utils/checkAuth.js'
import { registerValidation } from './validations/auth.js'
import { loginValidation } from './validations/loginValidation.js'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

mongoose
	.connect(
		'mongodb+srv://admin:qwerty12345@cluster0.srt50om.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => console.log('Server BD Connected...'))
	.catch(() => console.log('Server BD Connected Error...'))

const app = express()
app.use(express.json())

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

// Upload Images

app.post('/upload', checkAuth, upload.single('file'), (req, res) => {
	console.log(req)
	// res.json({
	// 	url: `/uploads/${req.file.originalname}`,
	// })
})

// { User}
// Created User
app.post('/auth/register', registerValidation, register)
// Login User
app.post('/auth/login', loginValidation, login)
// Get Data Profile User
app.get('/auth/profile', checkAuth, getMe)

// { Post }
// Created Post
app.post('/post', checkAuth, createdNewPost)
// Get All Posts
app.get('/post', getAllPosts)
// Get Single Post
app.get('/post/:id', getSinglePost)
// Remove Post
app.delete('/post/:id', checkAuth, removePost)
// Update Post
app.patch('/post/:id', checkAuth, updatePost)

app.listen('4000', (err) => {
	if (err) return console.log(`Ошибка Сервера... ${err}`)
	console.log(`Сервер был успешно запущен...`)
})
