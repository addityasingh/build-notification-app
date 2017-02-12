export const getGithubRepos = userName =>
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(res => res.json())

export const getGithubUserByToken = (accessToken = '') =>
    fetch(`https://api.github.com/user?access_token=${accessToken}`)
        .then(res => res.json())