import { API_URL } from ".";

export async function getActualProcesses() {
    const response = await fetch(API_URL + "/process");
    if (!response.ok) {
        throw new Error("Failed to fetch media");
    }
    return response.json();
}
