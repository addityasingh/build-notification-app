const GITHUB_API_TOKEN = '9b3c9827e1512e378b07d8dd9c537d0ce84e66b3'
const API_CONFIG = {
    URL: 'https://api.travis-ci.org',
    TOKEN: ''
}

const decorateRequestHeaders = (header) => ({
    'Accept': 'application/vnd.travis-ci.2+json',
    'Authorization': `token ${API_CONFIG.TOKEN}`,
    'Host': 'api.travis-ci.org',
    'Content-Type': 'application/json',
    ...header,
})

export const getTravisAuthToken = () => 
    API_CONFIG['token'] 
    ? Promise.resolve(API_CONFIG['token']) 
    : fetch(`${API_CONFIG.URL}/auth/github`, {
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.travis-ci.2+json',
            'Content-Type': 'application/json',
            'User-Agent': 'Travis/1.0'
        },
        body: JSON.stringify({
            github_token: GITHUB_API_TOKEN
        })
    })
    .then(({access_token}) => {
        console.log('github token', access_token)
        API_CONFIG['token'] = access_token
        return access_token
    })

export const getBuildForUserRepo = (userName, repoName) =>
    fetch(`${API_CONFIG.URL}/repos/${userName}/${repoName}/builds`,{
        method: 'GET',
        headers: decorateRequestHeaders({})
    })
    .then(({body}) => {
        console.log('res', body)
        return body
    })

export const getGithubRepos = userName =>
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(res => res.json())
        .then(res => { console.log(res); return res; })