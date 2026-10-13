import { useEffect, useState } from "react";
import {fetchUserRepos} from '../services/githubService';

const useUserRepos = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setRepos([]);
      setLoading(false);
      setError(null);
      return;
    }
    
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUserRepos(username);
        setRepos(data);
      } catch (err) {
        if (!err.status) {
          setError('Network error. Please check your internet connection.');
        }
        else if (err.status === 404) {
          setError('User not found');
        } else if (err.status === 403) {
          setError('GitHub API rate limit exceeded. Please try again later.');
        }else if (err.status === 502) {
          setError('Unable to reach GitHub. Please try again later.');
        }
         else if (err.status >= 500) {
          setError('An unexpected error occurred. Please try again later.');
        } else {
          setError('An error occurred while fetching repositories');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading, error };
};

export default useUserRepos;