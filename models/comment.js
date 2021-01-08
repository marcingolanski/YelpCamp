var mongoose 	= require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/Yelp_Camp_v6", { useNewUrlParser: true } );

var commentSchema = mongoose.Schema({
	text: String,
	author: {
		id: { 
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"			
		},
		username: String
	}
});
module.exports = mongoose.model("Comment", commentSchema);