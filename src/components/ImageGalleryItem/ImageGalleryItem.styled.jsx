import styled from "@emotion/styled";

export const GalleryItem = styled.li`
  display: inline-block;
  text-decoration: none;
  transition: transform 300ms linear;
  :hover {
    transform: scale(1.02);
    text-decoration: none;
    cursor: zoom-in;
  }
`;
export const GalleryImage = styled.img`
  border-radius: 4px;
  object-fit: cover;
  `;
