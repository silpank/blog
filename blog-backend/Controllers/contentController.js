const contents = require('../Models/contentSchema')

// Function to add a new post
exports.newPost = async (req, res) => {
  console.log('inside New Post');
  try {
    const {
      author,
      date,
      blogType,
      heading,
      image,
      content,
      likes,
      comments
    } = req.body
    console.log(`${author} ${date} ${blogType} ${heading} ${image} ${content} ${likes} ${comments} `)
    // // Create a new instance of the Content model
    const postData = {
      author,
      date,
      blogType,
      heading,
      image,
      content,
      likes,
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