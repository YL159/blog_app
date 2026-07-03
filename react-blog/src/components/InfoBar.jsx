
function InfoBar({ tags, difficulty }) {
  const hasTags = tags && tags.length > 0;

  return (
    <>
      {difficulty && <div>LVL: {difficulty}</div>}
      {hasTags &&
        <div>Tags: {tags.map((tag, index) => (
          <span key={index}>#{tag}</span>
        ))}</div>}
    </>
  );
}

export default InfoBar;