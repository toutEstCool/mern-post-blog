import { createdNewPost } from './controllers/postController.js'
import { getMe, login, register } from './controllers/userControllers.js'
import checkAuth from './utils/checkAuth.js'
import { registerValidation } from './validations/auth.js'
import { loginValidation } from './validations/loginValidation.js'
import express from 'express'
import mongoose from 'mongoose'

mongoose
	.connect(
		'mongodb+srv://admin:qwerty12345@cluster0.srt50om.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => console.log('Server BD Connected...'))
	.catch(() => console.log('Server BD Connected Error...'))

const app = express()
app.use(express.json())

// { User}
app.post('/auth/register', registerValidation, register)
app.post('/auth/login', loginValidation, login)
app.get('/auth/profile', checkAuth, getMe)

// { Post }
app.post('/post', checkAuth, createdNewPost)

app.listen('4000', (err) => {
	if (err) return console.log(`Ошибка Сервера... ${err}`)
	console.log(`Сервер был успешно запущен...`)
})
