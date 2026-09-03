import { Box } from '@mui/material'

// Helper function, wrap prop into html element by type string or array
function renderProp(label, prop) {

  // if undefined, null or empty array, don't render
  if (prop == null || (Array.isArray(prop) && prop.length == 0)) return null;

  // render simple string prop
  if (typeof prop === 'string') return <div>{label}: {prop}</div>

  // render Date object
  if (prop instanceof Date) {
    return <div>{label}: {prop.toLocaleDateString()}</div>
  }

  // render list object
  if (Array.isArray(prop)){
    return (
      <div>
        {label}:{prop.map((tag, index) => <span key={index}> #{tag}</span>)
      }</div>
    );
  }

  // default
  return <div>{label}: {String(prop)}</div>
}


export default function InfoBar({ tags, difficulty, created, modified }) {
  return (
    <Box>
      {renderProp("Created on", created)}
      {renderProp("Updated on", modified)}
      {renderProp("LVL", difficulty)}
      {renderProp("Topics", tags)}
    </Box>
  );
}
