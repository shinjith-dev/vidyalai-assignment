import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { WindowWidthContext } from '../contexts/WindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const page = useRef(0)

  const isSmallerDevice = useContext(WindowWidthContext)
  console.log(isSmallerDevice)

  const fetchPosts = async () => {
    const limit = isSmallerDevice ? 5 : 10
    console.log("Pageee:", page)
    const { data: posts } = await axios.get('/api/v1/posts', {
      params: { start: page.current * limit, limit },
    });

    setIsLoading(false)
    setPosts(prev => [...prev, ...posts]);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      });

      setIsLoading(false)
      setPosts(posts);
    };

    fetchPost();
  }, [isSmallerDevice]);

  const handleClick = () => {
    setIsLoading(true);
    page.current += 1
    fetchPosts()
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} key={`post-${post.id}`} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {posts.length > 0 ?
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
          : <p>Loading posts...</p>}
      </div>
    </Container>
  );
}
