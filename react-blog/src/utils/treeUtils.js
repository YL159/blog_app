import fileMap from '../data/fileMap.js';

// Recursively build url path mapping to file metadata object from folder tree
function buildPathMap(root = fileMap, path_map = {}) {
  if (!root.folderName) {
    path_map[root.path] = root;
    return path_map;
  };

  if (root.children.length > 0) {
    for (const child of root.children) buildPathMap(child, path_map);
  };
  return path_map;
}


// Get the displayable name of folder or file
function getTitle(item) {
  if (item.folderName) {
    return item.folderName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
  }
  // console.log("getTitle: item = ", item)
  if (item.id) return `${item.id}. ${item.title}`;
  
  return item.title;
}

export { buildPathMap, getTitle }