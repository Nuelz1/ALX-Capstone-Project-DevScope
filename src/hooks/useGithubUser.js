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

        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
          }
         });

         if (!response.ok) {
          if (response.status === 404){
            throw new Error("No user found with that username. Please check the spelling and try again.");
         }

          throw new Error("Something went wrong. Please try again later")

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