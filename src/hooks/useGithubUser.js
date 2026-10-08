import {useEffect, useState} from 'react';  
import { fetchGithubUser } from '../services/githubService';

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
        const data = await fetchGithubUser(username);
        setUser(data);
      }
        catch (err) {
          if (!err.status) {
            setError('Network error. Please check your internet connection.');
          }
          else if (err.status === 404) {
          setError('User not found');
        } else if (err.status === 403) {
          setError('GitHub API rate limit exceeded. Please try again later.');
        } else if (err.status >= 500) {
          setError('GitHub is currently unavailable. Please try again later.');
        } else {
          setError('An error occurred while fetching user data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { user, loading, error };
};

export default useGithubUser;