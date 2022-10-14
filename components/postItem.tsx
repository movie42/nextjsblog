import React from "react";
import styled from "styled-components";

const ItemContainer = styled.li``;

interface IpostItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const PostItem = ({ children, ...props }: IpostItemProps) => {
  return <ItemContainer {...props}>{children}</ItemContainer>;
};

export default PostItem;
