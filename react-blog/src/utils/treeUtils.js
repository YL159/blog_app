import fileMap from '../data/fileMap.js';

// Build url path mapping to file metadata object from folder tree
export function buildPathMap(root = fileMap, path_map = {}) {
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
export function getTitle(item) {
  if (item.folderName) {
    return `${item.folderName[0].toUpperCase()}${item.folderName.slice(1)}`;
  }
  console.log("getTitle: item = ", item)
  return item.title;
}