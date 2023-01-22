export async function getApiUrl() {
    let config = "";
    await fetch("./settings.json", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((json) => {
            config = json.appSettings.API;
        })
    return config;
}