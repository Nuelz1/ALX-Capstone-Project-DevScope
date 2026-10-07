export default async function handler(request, response){
    const {username} = request.query;

    if (!username){
        return response.status(400).json({
            message: 'GitHub username is required'
        })

    }

    try {
        const githubResponse = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github+json',
                },

            }
        );


        const data = await githubResponse.json();

        return response.status(githubResponse.status).json(data);
    } catch (error) {
        console.error('GitHub API error:', error);

        return response.status(500).json({
            message: 'Failed to communicate with GitHub',
        });
    }
}    