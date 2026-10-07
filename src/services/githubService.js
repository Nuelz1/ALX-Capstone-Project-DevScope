const BASE_URL = '/api/github';


export const fetchUserRepos = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/repos?username=${encodeURIComponent(username)}`);
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
        const response = await fetch(`${BASE_URL}/user?username=${encodeURIComponent(username)}`);
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

