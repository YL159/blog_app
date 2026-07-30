

// Helper function, wrap prop into html element by type string or array
const renderProp = (label, prop) => {
  // if undefined, null or empty array, don't render
  if (prop == undefined || (Array.isArray(prop) && prop.length == 0)) return null;
  // render simple string prop
  else if (!Array.isArray(prop)) return <div>{label}: {prop}</div>;
  // render list prop
  else {
    return <div>{label}: {prop.map((tag, index) => <span key={index}>#{tag}</span>)
      }</div>;
  }
}


function InfoBar({ tags, difficulty, created, modified }) {
  return (
    <>
      {renderProp("Created on", created)}
      {renderProp("Updated on", modified)}
      {renderProp("LVL", difficulty)}
      {renderProp("Topics", tags)}
    </>
  );
}

export default InfoBar;