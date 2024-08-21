const express = require('express');
const { fetchPosts, getImages } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const queries = req.query
  console.log("queries", queries)
  const posts = await fetchPosts(queries);

  const postsWithImages = await Promise.all(posts.map(async (post) => {
    // TODO use this route to fetch photos for each post
    // axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    const images = await getImages(post?.id ?? 1)

    return { ...post, images }
  }))

  res.json(postsWithImages);
});

module.exports = router;
