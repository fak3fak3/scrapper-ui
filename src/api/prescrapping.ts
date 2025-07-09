import { API_URL } from ".";

export async function postStartPrescrapping(data: {
    from: string;
    to: string;
}) {
    const response = await fetch(API_URL + "/prescrapping/start", {
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

export async function getStopPrescrapping() {
    const response = await fetch(API_URL + "/prescrapping/stop");
    if (!response.ok) {
        throw new Error("Failed to fetch media");
    }
    return response.json();
}
