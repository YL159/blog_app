import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  // get each section of the path, filter out ""
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const target = `/${pathnames.slice(0, index + 1).join("/")}`;
        // the last item displays as only text
        const isLast = index === pathnames.length - 1;
        const displayName = value.replace(/-/g, " ");

        return (
          <span key={target}>
            <span> / </span>
            {isLast ? (<strong>{displayName}</strong>) : (<Link to={target}>{displayName}</Link>)}
          </span>
        );
      })}
    </nav>
  );

}

export default Breadcrumbs;