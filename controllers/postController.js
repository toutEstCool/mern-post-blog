import PostModel from '../models/PostModel.js'

// Created Post
export const createdNewPost = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imgUrl: req.body.imgUrl,
			tags: req.body.tags,
			user: req.userId,
		})
		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'К сожалению не удалось...',
		})
	}
}
