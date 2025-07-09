import { API_URL } from ".";

export async function postStartScrapping(data: { src: string }) {
    const response = await fetch(API_URL + "/scrapping/start", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to start prescrapping");
    }

    return response.json();
}

export async function getStopScrapping() {
    const response = await fetch(API_URL + "/scrapping/stop");
    if (!response.ok) {
        throw new Error("Failed to fetch media");
    }
    return response.json();
}
