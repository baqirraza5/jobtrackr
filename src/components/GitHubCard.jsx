import { useEffect, useState } from "react";

const GitHubCard = () => {
  const [user, setUser] = useState();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchGitHubData = async () => {
      const response = await fetch(
        "https://api.github.com/users/baqirraza5",
      );

      const data = await response.json();

      if (response.ok) {
        setUser({
          name: data.name,
          public_repos: data.public_repos,
          followers: data.followers,
        });
      } else {
        setUser(null);
        setErrMsg(data.message);
      }
    };

    fetchGitHubData();
  }, []);

  if (!user) {
    return <p>{errMsg ? errMsg : "Loading....."}</p>;
  }

  return (
    <div className="card">
      <div className="info">
        <h3>{user.name}</h3>
        <p>Public Repos: {user.public_repos}</p>
        <p>Followers: {user.followers}</p>
      </div>
    </div>
  );
};

export default GitHubCard;
