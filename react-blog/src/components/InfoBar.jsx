import { Box } from '@mui/material'

// Helper function, wrap prop into html element by type string or array
function renderProp(label, prop) {

  // if undefined, null or empty array, don't render
  if (prop == null || (Array.isArray(prop) && prop.length == 0)) return null;

  // render simple string prop
  if (typeof prop === 'string') return <div>{label}: {prop}</div>

  // render Date object
  if (prop instanceof Date) {
    // gray-matter parse date as UTC date, find offset in milliseconds
    const offset = prop.getTimezoneOffset() * 60000;
    const localDate = new Date(prop.getTime() + offset);
    return <div>{label}: {localDate.toLocaleDateString()}</div>
  }

  // render list object
  if (Array.isArray(prop)){
    return (
      <Box sx={{flexWrap: 'wrap', wordBreak: 'break-all'}}>
        {label}:{prop.map((tag, index) => (
          <Box 
            component='span' 
            key={index} 
            sx={{marginLeft: '0.5em', whiteSpace: 'nowrap'}}>#{tag}
          </Box>))}
      </Box>
    );
  }

  // default
  return <div>{label}: {String(prop)}</div>
}


export default function InfoBar({ tags, difficulty, created, modified }) {
  return (
    <>
    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
      {renderProp("Created on", created)}
      {renderProp("Updated on", modified)}
      {renderProp("LVL", difficulty)}
    </Box>
    {renderProp("Topics", tags)}
    </>
  );
}
