const axios = require('axios').default;

/**
 * Fetches posts from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchPosts(params) {
  const { start = 0, limit = 10 } = params || {};
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts?limit',
    {
      params: {
        _start: start,
        _limit: limit,
      },
    },
  );

  return posts;
}

const getImages = async (postId) => {
  let images = [
    { url: 'https://picsum.photos/200/300' },
    { url: 'https://picsum.photos/200/300' },
    { url: 'https://picsum.photos/200/300' },
  ]

  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${postId}/photos`)
    images = res.data
  }
  catch (err) {
    console.log(err)
  }
  return images
}

module.exports = { fetchPosts, getImages };
