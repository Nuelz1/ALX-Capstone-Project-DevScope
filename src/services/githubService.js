const BASE_URL = `https://api.github.com`;

const headers = {
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
};

export const fetchUserRepos = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${username}/repos`, { headers });
        if (!response.ok) {
            const error = new Error('Request failed with status ' + response.status);
            error.status = response.status;
            throw error;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
};

export const fetchGithubUser = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${username}`, { headers });
        if (!response.ok) {
            const error = new Error('Request failed with status ' + response.status);
            error.status = response.status;
            throw error;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

