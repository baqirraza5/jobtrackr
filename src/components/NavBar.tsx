import { useEffect, useState } from "react";

const NavBar = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <div className="brand">
        <div className="brand-mark">J</div>
        <h1 className="brand-name">JobTrackr</h1>
      </div>
      <p className="header-date">
        {now.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
        {" · "}
        {now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </p>
    </header>
  );
};

export default NavBar;
