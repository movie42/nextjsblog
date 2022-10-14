import React from "react";
import styled from "styled-components";

const PostsContainer = styled.ul``;

interface PostsContainerProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

const PostsListItemContainer = ({
  children,
  ...props
}: PostsContainerProps) => {
  return <PostsContainer {...props}>{children}</PostsContainer>;
};

export default PostsListItemContainer;
