export const getGithubRepos = userName =>
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(res => res.json())