import {useEffect, useState} from 'react';  

const useGithubUser = (username) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!username) {
      setUser(null);
      setLoading(false);
      setError(null);
      return;
    }
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/users/${username}`
        );

        if (!response.ok) {
          throw new Error(`User not found ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { user, loading, error };
};

export default useGithubUser;