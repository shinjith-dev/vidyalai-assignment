import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
  scrollSnapType: 'x mandatory'
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: '50%',
  transform: 'translateY(50%)',
  zIndex: 999,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const PostHeader = styled.div(() => ({
  display: 'flex',
  width: '100%',
  padding: '10px',
  paddingBottom: 0,
  gap: '8px',
  alignItems: 'center'
}))


const RoundedDiv = styled.div(() => ({
  borderRadius: '50%',
  backgroundColor: 'gray',
  color: '#fff',
  height: '2.8rem',
  width: '2.8rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.3rem',
  fontWeight: 500
}))

const UserName = styled.p(() => ({
  fontSize: '1.1rem',
  fontWeight: 700,
  marginBottom: '2px'
}))

const UserEmail = styled.p(() => ({
  fontSize: '0.8rem',
}))

const Avatar = ({ name = "New User" }) => {
  var initials = name.split(' ').map(function(str) { return str ? str[0].toUpperCase() : ""; }).join('');
  return (
    <RoundedDiv>
      {initials}
    </RoundedDiv>
  )
}

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  console.log(post)

  return (
    <PostContainer>
      <PostHeader>
        <Avatar name={post?.user?.name} />
        <div>
          <UserName>{post.user.name}</UserName>
          <UserEmail>{post.user.email}</UserEmail>
        </div>
      </PostHeader>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
