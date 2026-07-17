import { useEffect, useState } from "react";

type GitHubUser = {
  name: string;
  public_repos: number;
  followers: number;
};

const GitHubCard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
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
      } catch (error) {
        setErrMsg(
          error instanceof Error
            ? error.message
            : "Something went wrong",
        );
      }

      setLoading(false);
    };

    fetchGitHubData();
  });

  if (loading) return <p className="gh-loading">Loading profile…</p>;
  if (!user) return <p className="gh-loading">{errMsg}</p>;

  return (
    <div className="gh-card">
      <div className="gh-id">
        <p className="gh-label">GitHub</p>
        <p className="gh-name">{user.name}</p>
      </div>
      <div className="gh-stats">
        <div className="gh-stat">
          <p className="gh-number">{user.public_repos}</p>
          <p className="gh-caption">repos</p>
        </div>
        <div className="gh-stat">
          <p className="gh-number">{user.followers}</p>
          <p className="gh-caption">followers</p>
        </div>
      </div>
    </div>
  );
};

export default GitHubCard;
