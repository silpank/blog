const contents = require('../Models/contentSchema')
// Function to add a new post
exports.newPost = async (req, res) => {
  console.log('inside New Post');
  try {
    const {
      date,
      blogType,
      heading,
      image,
      content,
      comments
    } = req.body
    // // Create a new instance of the Content model
    const postData = {
      author:req.payload,
      date,
      blogType,
      heading,
      image,
      content,
      likes: [],
      comments
    }
    const newPost = new contents(postData);

    // // Save the new post to the database
    const savedPost = await newPost.save();
    //response
    res.status(200).json("New post Saved")

    console.log('New post added:', savedPost);

  } catch (error) {

    console.error('Error adding new post:', error);
    //response
    res.status(500).json("Server Error")
  }
}

//Function to add New Comment
exports.newComment = async (req, res) => {
  console.log('inside New comment');
  try {
    const postId = req.params.postId;

    const {
      // likes,
      comment,
      date
      //65d4f7323f0e42f9122ca5e7

    } = req.body
console.log(req.payload);
    const updatedPost = await contents.findByIdAndUpdate(
      postId, {
        $push: {
          comments: {
            commenter:req.payload,
            // likes,
            comment,
            date

          }
        }

      },
    );
    res.status(200).json('comment Succesfully')

  } catch (err) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

//Function to add All Post
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await contents.find({})
      .populate({
        path: 'author',
        model: 'users',
        select: 'userName'
      })
      .populate({
        path:'likes',
        model:'users',
        select:'userName'
      })
      .populate({
        path: 'comments.commenter',
        model: 'users',
        select: 'userName'
      });

    res.status(200).json(posts);
  } catch (err) {   +
    console.error(err);
    res.status(500).json({
      message: 'Server Error'
    });
  }
}

//Function to add Like
exports.addLike = async (req, res) => {
  const postId = req.params.postId;
  try {
    const updatedPost = await contents.findByIdAndUpdate(
      postId, {
        $push: {
          likes: req.payload
        }
      }
    )
    res.status(200).json('like added')
  } catch (error) {
    res.status(500).json('Error in Like Function')
  }
}