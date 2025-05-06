import React from 'react';
import styled from 'styled-components';
import { resolveLocalImagePath } from '../../utils/enhancedLocalImageHandler';

const TextContent = styled.div`
  white-space: pre-wrap;
  font-size: 1rem;
  line-height: 1.5;

  a {
    color: ${props => props.isUser ? '#90cdf4' : '#3182ce'};
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ImageContainer = styled.div`
  margin-top: 0.5rem;
  max-width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageFallback = styled.div`
  background-color: #f3f4f6;
  border: 1px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100px;
  color: #6b7280;
  font-size: 0.875rem;
`;

/**
 * ChatContent component for rendering different types of content in chat messages
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Content type ('text', 'image', etc.)
 * @param {string} props.content - The content to display
 * @param {boolean} props.isUser - Whether the content is from the user
 * @returns {JSX.Element} - Rendered component
 */
const ChatContent = ({ type, content, isUser }) => {
  const [imageError, setImageError] = React.useState(false);
  
  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Handle image click to expand
  const handleImageClick = (src) => {
    // Create modal for expanded view
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.style.cursor = 'pointer';
    
    // Create expanded image
    const expandedImg = document.createElement('img');
    expandedImg.src = src;
    expandedImg.style.maxWidth = '90%';
    expandedImg.style.maxHeight = '90%';
    expandedImg.style.objectFit = 'contain';
    expandedImg.style.border = '2px solid white';
    expandedImg.style.borderRadius = '4px';
    
    // Add close functionality
    modal.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Add to modal and body
    modal.appendChild(expandedImg);
    document.body.appendChild(modal);
  };
  
  // Render based on content type
  switch (type) {
    case 'image':
      // Resolve image path
      const imagePath = resolveLocalImagePath(content);
      
      return (
        <ImageContainer>
          {!imageError ? (
            <StyledImage 
              src={imagePath} 
              alt={`Image: ${content}`}
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              onClick={() => handleImageClick(imagePath)}
              aria-label={`Image: ${content}. Click to expand.`}
            />
          ) : (
            <ImageFallback>
              Image could not be loaded: {content}
            </ImageFallback>
          )}
        </ImageContainer>
      );
      
    case 'text':
    default:
      return (
        <TextContent isUser={isUser}>
          {content}
        </TextContent>
      );
  }
};

export default ChatContent;
