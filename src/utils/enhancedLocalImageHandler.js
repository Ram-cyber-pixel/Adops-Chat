/**
 * Enhanced Image Utilities
 * 
 * This utility provides improved handling of local images within the chat container.
 * Supports a large library of local images and multiple images per ticket.
 */

/**
 * Resolves a local image path to ensure proper rendering
 * @param {string} imagePath - The image path to resolve
 * @returns {string} - The resolved image path
 */
export const resolveLocalImagePath = (imagePath) => {
  if (!imagePath) return '';
  
  // Check if it's already a full URL
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Extract the filename from the path
  const filename = imagePath.split('/').pop();
  
  // Check if it's an absolute path
  if (imagePath.startsWith('/')) {
    // For absolute paths, ensure they're properly formatted for browser access
    return imagePath;
  }
  
  // Handle relative paths
  if (imagePath.startsWith('./')) {
    return process.env.PUBLIC_URL + imagePath.substring(1);
  }
  
  // Handle paths that might be relative to the assets directory
  if (imagePath.startsWith('assets/')) {
    return process.env.PUBLIC_URL + '/' + imagePath;
  }
  
  // Generate a comprehensive list of possible paths for any image
  const possiblePaths = [
    // Original path
    imagePath,
    
    // Public URL paths
    `${process.env.PUBLIC_URL}/${imagePath}`,
    `${process.env.PUBLIC_URL}/assets/${imagePath}`,
    `${process.env.PUBLIC_URL}/assets/images/${imagePath}`,
    `${process.env.PUBLIC_URL}/images/${imagePath}`,
    
    // Root-relative paths
    `/${imagePath}`,
    `/assets/${imagePath}`,
    `/assets/images/${imagePath}`,
    `/images/${imagePath}`,
    
    // Filename-only paths (for when only the filename is provided)
    `${process.env.PUBLIC_URL}/${filename}`,
    `${process.env.PUBLIC_URL}/assets/${filename}`,
    `${process.env.PUBLIC_URL}/assets/images/${filename}`,
    `${process.env.PUBLIC_URL}/images/${filename}`,
    `/assets/${filename}`,
    `/assets/images/${filename}`,
    `/images/${filename}`,
    
    // Relative paths
    `./assets/${imagePath}`,
    `./images/${imagePath}`,
    `./assets/images/${imagePath}`,
    `./assets/${filename}`,
    `./images/${filename}`,
    `./assets/images/${filename}`
  ];
  
  // Return the first path for now, but the component will try others if this fails
  return possiblePaths[0];
};

/**
 * Creates a fallback element when an image fails to load
 * @param {HTMLImageElement} imgElement - The image element that failed
 * @param {string} altText - Alternative text to display
 * @param {string} originalSrc - The original source that failed to load
 */
export const createImageFallback = (imgElement, altText = 'Image could not be loaded', originalSrc = '') => {
  if (!imgElement) return;
  
  // Create fallback container
  const fallbackContainer = document.createElement('div');
  fallbackContainer.className = 'image-fallback';
  fallbackContainer.style.backgroundColor = '#f3f4f6';
  fallbackContainer.style.border = '1px dashed #d1d5db';
  fallbackContainer.style.borderRadius = '0.5rem';
  fallbackContainer.style.padding = '1rem';
  fallbackContainer.style.display = 'flex';
  fallbackContainer.style.flexDirection = 'column';
  fallbackContainer.style.alignItems = 'center';
  fallbackContainer.style.justifyContent = 'center';
  fallbackContainer.style.width = '100%';
  fallbackContainer.style.minHeight = '100px';
  
  // Create fallback text
  const fallbackText = document.createElement('span');
  fallbackText.textContent = altText;
  fallbackText.style.color = '#6b7280';
  fallbackText.style.fontSize = '0.875rem';
  fallbackText.style.marginBottom = '0.5rem';
  
  // Add text to container
  fallbackContainer.appendChild(fallbackText);
  
  // Add retry button if we have the original source
  if (originalSrc) {
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry Loading';
    retryButton.style.backgroundColor = '#2d3748';
    retryButton.style.color = '#ffffff';
    retryButton.style.border = 'none';
    retryButton.style.borderRadius = '0.25rem';
    retryButton.style.padding = '0.5rem 1rem';
    retryButton.style.fontSize = '0.875rem';
    retryButton.style.cursor = 'pointer';
    retryButton.style.marginTop = '0.5rem';
    
    // Add retry functionality
    retryButton.addEventListener('click', () => {
      // Extract the filename from the path
      const filename = originalSrc.split('/').pop();
      
      // Generate a comprehensive list of possible paths
      const alternativePaths = [
        // Original path
        originalSrc,
        
        // Window location paths
        window.location.origin + originalSrc,
        
        // Public URL paths
        process.env.PUBLIC_URL + originalSrc,
        process.env.PUBLIC_URL + '/' + originalSrc,
        `${process.env.PUBLIC_URL}/${originalSrc}`,
        `${process.env.PUBLIC_URL}/assets/${originalSrc}`,
        `${process.env.PUBLIC_URL}/assets/images/${originalSrc}`,
        `${process.env.PUBLIC_URL}/images/${originalSrc}`,
        
        // Root-relative paths
        `/${originalSrc}`,
        `/assets/${originalSrc}`,
        `/assets/images/${originalSrc}`,
        `/images/${originalSrc}`,
        
        // Filename-only paths
        `${process.env.PUBLIC_URL}/${filename}`,
        `${process.env.PUBLIC_URL}/assets/${filename}`,
        `${process.env.PUBLIC_URL}/assets/images/${filename}`,
        `${process.env.PUBLIC_URL}/images/${filename}`,
        `/assets/${filename}`,
        `/assets/images/${filename}`,
        `/images/${filename}`,
        
        // Relative paths
        `./assets/${originalSrc}`,
        `./images/${originalSrc}`,
        `./assets/images/${originalSrc}`,
        `./assets/${filename}`,
        `./images/${filename}`,
        `./assets/images/${filename}`,
        
        // Fallback to placeholder
        `${process.env.PUBLIC_URL}/assets/images/placeholder.png`
      ];
      
      // Try each path
      tryLoadImage(alternativePaths, 0, fallbackContainer);
    });
    
    fallbackContainer.appendChild(retryButton);
  }
  
  // Replace image with fallback
  if (imgElement.parentNode) {
    imgElement.parentNode.replaceChild(fallbackContainer, imgElement);
  }
};

/**
 * Tries to load an image from a list of alternative paths
 * @param {Array<string>} paths - List of paths to try
 * @param {number} index - Current index in the paths array
 * @param {HTMLElement} container - Container to replace with image if successful
 */
const tryLoadImage = (paths, index, container) => {
  if (index >= paths.length) {
    // All paths failed, update the fallback message
    const fallbackText = container.querySelector('span');
    if (fallbackText) {
      fallbackText.textContent = 'Could not load image from any path';
    }
    return;
  }
  
  const img = new Image();
  img.onload = () => {
    // Success! Replace fallback with image
    if (container.parentNode) {
      const enhancedImg = document.createElement('img');
      enhancedImg.src = paths[index];
      enhancedImg.alt = 'Loaded image';
      enhancedImg.style.maxWidth = '100%';
      enhancedImg.style.borderRadius = '0.5rem';
      enhancedImg.style.marginTop = '0.5rem';
      enhancedImg.loading = 'lazy';
      enhancedImg.decoding = 'async';
      
      // Add click to expand functionality
      enhanceImageElement(enhancedImg);
      
      container.parentNode.replaceChild(enhancedImg, container);
    }
  };
  
  img.onerror = () => {
    // Try next path
    tryLoadImage(paths, index + 1, container);
  };
  
  img.src = paths[index];
};

/**
 * Preloads an image to ensure it's in the browser cache
 * @param {string} src - The image source URL
 * @returns {Promise} - Promise that resolves when the image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error('No image source provided'));
      return;
    }
    
    // Extract the filename from the path
    const filename = src.split('/').pop();
    
    // Generate a comprehensive list of possible paths
    const alternativePaths = [
      // Original path
      src,
      
      // Window location paths
      window.location.origin + src,
      
      // Public URL paths
      process.env.PUBLIC_URL + src,
      process.env.PUBLIC_URL + '/' + src,
      `${process.env.PUBLIC_URL}/${src}`,
      `${process.env.PUBLIC_URL}/assets/${src}`,
      `${process.env.PUBLIC_URL}/assets/images/${src}`,
      `${process.env.PUBLIC_URL}/images/${src}`,
      
      // Root-relative paths
      `/${src}`,
      `/assets/${src}`,
      `/assets/images/${src}`,
      `/images/${src}`,
      
      // Filename-only paths
      `${process.env.PUBLIC_URL}/${filename}`,
      `${process.env.PUBLIC_URL}/assets/${filename}`,
      `${process.env.PUBLIC_URL}/assets/images/${filename}`,
      `${process.env.PUBLIC_URL}/images/${filename}`,
      `/assets/${filename}`,
      `/assets/images/${filename}`,
      `/images/${filename}`,
      
      // Relative paths
      `./assets/${src}`,
      `./images/${src}`,
      `./assets/images/${src}`,
      `./assets/${filename}`,
      `./images/${filename}`,
      `./assets/images/${filename}`,
      
      // Fallback to placeholder
      `${process.env.PUBLIC_URL}/assets/images/placeholder.png`
    ];
    
    // Try each path
    tryAlternativePaths(alternativePaths, 0, resolve, reject);
  });
};

/**
 * Tries to load an image from a list of alternative paths
 * @param {Array<string>} paths - List of paths to try
 * @param {number} index - Current index in the paths array
 * @param {Function} resolve - Promise resolve function
 * @param {Function} reject - Promise reject function
 */
const tryAlternativePaths = (paths, index, resolve, reject) => {
  if (index >= paths.length) {
    // All paths failed
    reject(new Error('Failed to load image from any path'));
    return;
  }
  
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = () => tryAlternativePaths(paths, index + 1, resolve, reject);
  img.src = paths[index];
};

/**
 * Adds error handling to all images in a container
 * @param {HTMLElement} container - The container with images
 * @param {Function} onError - Optional callback when an image fails to load
 */
export const addImageErrorHandling = (container, onError) => {
  if (!container) return;
  
  // Find all images
  const images = container.querySelectorAll('img');
  
  // Add error handling to each image
  images.forEach(img => {
    const originalSrc = img.src;
    img.onerror = () => {
      // Extract the filename from the path
      const filename = originalSrc.split('/').pop();
      
      // Generate a comprehensive list of possible paths
      const alternativePaths = [
        // Original path
        originalSrc,
        
        // Window location paths
        window.location.origin + originalSrc,
        
        // Public URL paths
        process.env.PUBLIC_URL + originalSrc,
        process.env.PUBLIC_URL + '/' + originalSrc,
        `${process.env.PUBLIC_URL}/${originalSrc}`,
        `${process.env.PUBLIC_URL}/assets/${originalSrc}`,
        `${process.env.PUBLIC_URL}/assets/images/${originalSrc}`,
        `${process.env.PUBLIC_URL}/images/${originalSrc}`,
        
        // Root-relative paths
        `/${originalSrc}`,
        `/assets/${originalSrc}`,
        `/assets/images/${originalSrc}`,
        `/images/${originalSrc}`,
        
        // Filename-only paths
        `${process.env.PUBLIC_URL}/${filename}`,
        `${process.env.PUBLIC_URL}/assets/${filename}`,
        `${process.env.PUBLIC_URL}/assets/images/${filename}`,
        `${process.env.PUBLIC_URL}/images/${filename}`,
        `/assets/${filename}`,
        `/assets/images/${filename}`,
        `/images/${filename}`,
        
        // Relative paths
        `./assets/${originalSrc}`,
        `./images/${originalSrc}`,
        `./assets/images/${originalSrc}`,
        `./assets/${filename}`,
        `./images/${filename}`,
        `./assets/images/${filename}`,
        
        // Fallback to placeholder
        `${process.env.PUBLIC_URL}/assets/images/placeholder.png`
      ];
      
      // Try each path
      let success = false;
      for (let i = 0; i < alternativePaths.length; i++) {
        const testImg = new Image();
        testImg.onload = () => {
          success = true;
          img.src = alternativePaths[i];
        };
        testImg.src = alternativePaths[i];
        
        // If any path worked, break the loop
        if (success) break;
      }
      
      // If all paths failed, create fallback
      if (!success) {
        createImageFallback(img, img.alt || 'Image could not be loaded', originalSrc);
        
        // Call optional callback
        if (typeof onError === 'function') {
          onError(img);
        }
      }
    };
  });
};

/**
 * Checks if an image exists and is accessible
 * @param {string} src - The image source URL
 * @returns {Promise<boolean>} - Promise that resolves to true if image exists
 */
export const checkImageExists = async (src) => {
  return new Promise(resolve => {
    if (!src) {
      resolve(false);
      return;
    }
    
    // Extract the filename from the path
    const filename = src.split('/').pop();
    
    // Generate a comprehensive list of possible paths
    const alternativePaths = [
      // Original path
      src,
      
      // Window location paths
      window.location.origin + src,
      
      // Public URL paths
      process.env.PUBLIC_URL + src,
      process.env.PUBLIC_URL + '/' + src,
      `${process.env.PUBLIC_URL}/${src}`,
      `${process.env.PUBLIC_URL}/assets/${src}`,
      `${process.env.PUBLIC_URL}/assets/images/${src}`,
      `${process.env.PUBLIC_URL}/images/${src}`,
      
      // Root-relative paths
      `/${src}`,
      `/assets/${src}`,
      `/assets/images/${src}`,
      `/images/${src}`,
      
      // Filename-only paths
      `${process.env.PUBLIC_URL}/${filename}`,
      `${process.env.PUBLIC_URL}/assets/${filename}`,
      `${process.env.PUBLIC_URL}/assets/images/${filename}`,
      `${process.env.PUBLIC_URL}/images/${filename}`,
      `/assets/${filename}`,
      `/assets/images/${filename}`,
      `/images/${filename}`,
      
      // Relative paths
      `./assets/${src}`,
      `./images/${src}`,
      `./assets/images/${src}`,
      `./assets/${filename}`,
      `./images/${filename}`,
      `./assets/images/${filename}`,
      
      // Fallback to placeholder
      `${process.env.PUBLIC_URL}/assets/images/placeholder.png`
    ];
    
    // Try each path
    checkMultiplePaths(alternativePaths, 0, resolve);
  });
};

/**
 * Checks multiple paths for an image
 * @param {Array<string>} paths - List of paths to check
 * @param {number} index - Current index in the paths array
 * @param {Function} resolve - Promise resolve function
 */
const checkMultiplePaths = (paths, index, resolve) => {
  if (index >= paths.length) {
    // All paths failed
    resolve(false);
    return;
  }
  
  const img = new Image();
  img.onload = () => resolve(true);
  img.onerror = () => checkMultiplePaths(paths, index + 1, resolve);
  img.src = paths[index];
};

/**
 * Checks if an image exists at a specific path
 * @param {string} path - The image path to check
 * @returns {Promise<boolean>} - Promise that resolves to true if image exists
 */
const checkSinglePath = (path) => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = path;
  });
};

/**
 * Optimizes image display based on container size
 * @param {HTMLImageElement} img - The image element
 * @param {HTMLElement} container - The container element
 */
export const optimizeImageDisplay = (img, container) => {
  if (!img || !container) return;
  
  // Get container dimensions
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  
  // Set max dimensions
  img.style.maxWidth = '100%';
  img.style.maxHeight = containerHeight ? `${containerHeight}px` : '300px';
  
  // Add loading attribute for native lazy loading
  img.loading = 'lazy';
  
  // Add decoding attribute for performance
  img.decoding = 'async';
  
  // Add fade-in animation
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease-in-out';
  
  // Show image when loaded
  img.onload = () => {
    img.style.opacity = '1';
  };
};

/**
 * Enhances an image element with additional features
 * @param {HTMLImageElement} img - The image element to enhance
 */
export const enhanceImageElement = (img) => {
  if (!img) return;
  
  // Add loading and decoding attributes
  img.loading = 'lazy';
  img.decoding = 'async';
  
  // Store original source for error handling
  const originalSrc = img.src;
  
  // Add error handling
  img.onerror = () => {
    // Extract the filename from the path
    const filename = originalSrc.split('/').pop();
    
    // Generate a comprehensive list of possible paths
    const alternativePaths = [
      // Original path
      originalSrc,
      
      // Window location paths
      window.location.origin + originalSrc,
      
      // Public URL paths
      process.env.PUBLIC_URL + originalSrc,
      process.env.PUBLIC_URL + '/' + originalSrc,
      `${process.env.PUBLIC_URL}/${originalSrc}`,
      `${process.env.PUBLIC_URL}/assets/${originalSrc}`,
      `${process.env.PUBLIC_URL}/assets/images/${originalSrc}`,
      `${process.env.PUBLIC_URL}/images/${originalSrc}`,
      
      // Root-relative paths
      `/${originalSrc}`,
      `/assets/${originalSrc}`,
      `/assets/images/${originalSrc}`,
      `/images/${originalSrc}`,
      
      // Filename-only paths
      `${process.env.PUBLIC_URL}/${filename}`,
      `${process.env.PUBLIC_URL}/assets/${filename}`,
      `${process.env.PUBLIC_URL}/assets/images/${filename}`,
      `${process.env.PUBLIC_URL}/images/${filename}`,
      `/assets/${filename}`,
      `/assets/images/${filename}`,
      `/images/${filename}`,
      
      // Relative paths
      `./assets/${originalSrc}`,
      `./images/${originalSrc}`,
      `./assets/images/${originalSrc}`,
      `./assets/${filename}`,
      `./images/${filename}`,
      `./assets/images/${filename}`,
      
      // Fallback to placeholder
      `${process.env.PUBLIC_URL}/assets/images/placeholder.png`
    ];
    
    // Try each path
    let success = false;
    for (let i = 0; i < alternativePaths.length; i++) {
      const testImg = new Image();
      testImg.onload = () => {
        success = true;
        img.src = alternativePaths[i];
      };
      testImg.src = alternativePaths[i];
      
      // If any path worked, break the loop
      if (success) break;
    }
    
    // If all paths failed, create fallback
    if (!success) {
      createImageFallback(img, img.alt || 'Image could not be loaded', originalSrc);
    }
  };
  
  // Add click to expand functionality
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
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
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Expanded image. Click anywhere to close.');
    
    // Create expanded image
    const expandedImg = document.createElement('img');
    expandedImg.src = img.src;
    expandedImg.alt = img.alt || 'Expanded view';
    expandedImg.style.maxWidth = '90%';
    expandedImg.style.maxHeight = '90%';
    expandedImg.style.objectFit = 'contain';
    expandedImg.style.border = '2px solid white';
    expandedImg.style.borderRadius = '4px';
    
    // Add close functionality
    modal.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Add keyboard accessibility
    modal.tabIndex = 0;
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.body.removeChild(modal);
      }
    });
    
    // Add to modal and body
    modal.appendChild(expandedImg);
    document.body.appendChild(modal);
    
    // Focus the modal for keyboard accessibility
    modal.focus();
  });
  
  // Add fade-in animation
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease-in-out';
  
  // Show image when loaded
  img.onload = () => {
    img.style.opacity = '1';
  };
};

/**
 * Creates a component to display multiple images
 * @param {Array<string>} imagePaths - Array of image paths to display
 * @param {HTMLElement} container - Container to append the gallery to
 */
export const createImageGallery = (imagePaths, container) => {
  if (!imagePaths || !imagePaths.length || !container) return;
  
  // Create gallery container
  const galleryContainer = document.createElement('div');
  galleryContainer.className = 'image-gallery';
  galleryContainer.style.display = 'flex';
  galleryContainer.style.flexWrap = 'wrap';
  galleryContainer.style.gap = '0.5rem';
  galleryContainer.style.marginTop = '1rem';
  
  // Add images to gallery
  imagePaths.forEach(path => {
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.style.width = imagePaths.length > 1 ? 'calc(50% - 0.25rem)' : '100%';
    imageContainer.style.position = 'relative';
    
    // Create image element
    const img = document.createElement('img');
    img.src = resolveLocalImagePath(path);
    img.alt = 'Gallery image';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '0.25rem';
    img.style.objectFit = 'cover';
    img.loading = 'lazy';
    img.decoding = 'async';
    
    // Add error handling
    img.onerror = () => {
      // Extract the filename from the path
      const filename = path.split('/').pop();
      
      // Generate a comprehensive list of possible paths
      const alternativePaths = [
        // Original path
        path,
        
        // Window location paths
        window.location.origin + path,
        
        // Public URL paths
        process.env.PUBLIC_URL + path,
        process.env.PUBLIC_URL + '/' + path,
        `${process.env.PUBLIC_URL}/${path}`,
        `${process.env.PUBLIC_URL}/assets/${path}`,
        `${process.env.PUBLIC_URL}/assets/images/${path}`,
        `${process.env.PUBLIC_URL}/images/${path}`,
        
        // Root-relative paths
        `/${path}`,
        `/assets/${path}`,
        `/assets/images/${path}`,
        `/images/${path}`,
        
        // Filename-only paths
        `${process.env.PUBLIC_URL}/${filename}`,
        `${process.env.PUBLIC_URL}/assets/${filename}`,
        `${process.env.PUBLIC_URL}/assets/images/${filename}`,
        `${process.env.PUBLIC_URL}/images/${filename}`,
        `/assets/${filename}`,
        `/assets/images/${filename}`,
        `/images/${filename}`,
        
        // Relative paths
        `./assets/${path}`,
        `./images/${path}`,
        `./assets/images/${path}`,
        `./assets/${filename}`,
        `./images/${filename}`,
        `./assets/images/${filename}`,
        
        // Fallback to placeholder
        `${process.env.PUBLIC_URL}/assets/images/placeholder.png`
      ];
      
      // Try each path
      let success = false;
      for (let i = 0; i < alternativePaths.length; i++) {
        const testImg = new Image();
        testImg.onload = () => {
          success = true;
          img.src = alternativePaths[i];
        };
        testImg.src = alternativePaths[i];
        
        // If any path worked, break the loop
        if (success) break;
      }
      
      // If all paths failed, use placeholder
      if (!success) {
        img.src = `${process.env.PUBLIC_URL}/assets/images/placeholder.png`;
      }
    };
    
    // Add click to expand functionality
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
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
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-label', 'Expanded image. Click anywhere to close.');
      
      // Create expanded image
      const expandedImg = document.createElement('img');
      expandedImg.src = img.src;
      expandedImg.alt = img.alt || 'Expanded view';
      expandedImg.style.maxWidth = '90%';
      expandedImg.style.maxHeight = '90%';
      expandedImg.style.objectFit = 'contain';
      expandedImg.style.border = '2px solid white';
      expandedImg.style.borderRadius = '4px';
      
      // Add close functionality
      modal.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      
      // Add keyboard accessibility
      modal.tabIndex = 0;
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.body.removeChild(modal);
        }
      });
      
      // Add to modal and body
      modal.appendChild(expandedImg);
      document.body.appendChild(modal);
      
      // Focus the modal for keyboard accessibility
      modal.focus();
    });
    
    // Add image to container
    imageContainer.appendChild(img);
    
    // Add container to gallery
    galleryContainer.appendChild(imageContainer);
  });
  
  // Add gallery to container
  container.appendChild(galleryContainer);
};

/**
 * Utility function to handle multiple images in ticket data
 * @param {Object} ticketData - The ticket data object
 * @returns {Array<string>} - Array of image paths
 */
export const extractImagesFromTicket = (ticketData) => {
  if (!ticketData) return [];
  
  const images = [];
  
  // Check for image property
  if (ticketData.image) {
    if (Array.isArray(ticketData.image)) {
      // If it's an array, add all images
      images.push(...ticketData.image);
    } else {
      // If it's a single image, add it
      images.push(ticketData.image);
    }
  }
  
  // Check for images property
  if (ticketData.images) {
    if (Array.isArray(ticketData.images)) {
      // If it's an array, add all images
      images.push(...ticketData.images);
    } else {
      // If it's a single image, add it
      images.push(ticketData.images);
    }
  }
  
  // Check for attachments property
  if (ticketData.attachments) {
    if (Array.isArray(ticketData.attachments)) {
      // If it's an array, add all attachments that look like images
      ticketData.attachments.forEach(attachment => {
        if (typeof attachment === 'string' && isImagePath(attachment)) {
          images.push(attachment);
        } else if (attachment && attachment.url && isImagePath(attachment.url)) {
          images.push(attachment.url);
        }
      });
    } else if (typeof ticketData.attachments === 'string' && isImagePath(ticketData.attachments)) {
      // If it's a single attachment string that looks like an image, add it
      images.push(ticketData.attachments);
    } else if (ticketData.attachments && ticketData.attachments.url && isImagePath(ticketData.attachments.url)) {
      // If it's a single attachment object with a URL that looks like an image, add it
      images.push(ticketData.attachments.url);
    }
  }
  
  // Recursively check for nested objects that might contain images
  Object.keys(ticketData).forEach(key => {
    if (typeof ticketData[key] === 'object' && ticketData[key] !== null && !Array.isArray(ticketData[key])) {
      const nestedImages = extractImagesFromTicket(ticketData[key]);
      images.push(...nestedImages);
    }
  });
  
  // Remove duplicates and return
  return [...new Set(images)];
};

/**
 * Checks if a path is likely an image path
 * @param {string} path - The path to check
 * @returns {boolean} - True if the path is likely an image
 */
const isImagePath = (path) => {
  if (!path || typeof path !== 'string') return false;
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff', '.tif'];
  const lowerPath = path.toLowerCase();
  
  return imageExtensions.some(ext => lowerPath.endsWith(ext)) || 
         lowerPath.includes('image') || 
         lowerPath.includes('img') || 
         lowerPath.includes('photo');
};
