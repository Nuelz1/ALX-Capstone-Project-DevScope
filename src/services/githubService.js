const BASE_URL = '/api/github';

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        const error = new Error(data.message || 'Request failed');
        error.status = response.status;
        throw error;
    };
    return data;
};

export const fetchUserRepos = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/repos?username=${encodeURIComponent(username)}`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
};

export const fetchGithubUser = async (username) => {
    try {
        const response = await fetch(`${BASE_URL}/user?username=${encodeURIComponent(username)}`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};



