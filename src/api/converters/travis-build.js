export const getTravisBuildData = build => ({
    id: build.id,
    title: build.pull_request_title,
    state: build.state
})