const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '7d3f2f8fb9054e61b098513ecb98be94'
});



const handleApiCall = (req , res) => {

	 app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	 .then(data => {
	 	res.json(data);
	 })
	 .catch(err => res.status(400).json('unable to work with API'))

}


const imageHandler = (req , res ,db)=>{
	const { id } = req.body;
	db('users').where('id' , '=' , id)
	.increment('entries' , 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => {
		res.status(400).json('unable to find count');
	})
}

module.exports = {
	imageHandler,
	handleApiCall
};