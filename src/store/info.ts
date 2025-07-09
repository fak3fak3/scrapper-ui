import { createStore, createEvent, createEffect, sample } from "effector";
import { getActualProcesses } from "../api/process";

export type PrescrappingProcessData = {
    days_total: number;
    days_parsed: number;
    ids_collect: number;
    ids_duples: number;
};

export type ScrappingProcessData = {
    documents_total: number;
    documents_parsed: number;
    docments_nodata: number;
    src: string;
};

export function connectPrescrappingSocket() {
    const socket = new WebSocket("ws://localhost:8080/api/ws/progress");

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            updateProcess(data);
        } catch (e) {
            console.error("invalid socket message", e);
        }
    };

    socket.onopen = () => {
        console.log("socket connected");
    };

    socket.onerror = (e) => {
        console.error("socket error", e);
    };

    socket.onclose = () => {
        console.log("socket closed");
    };

    return socket;
}

export const updateProcess = createEvent<Partial<PrescrappingProcessData>>();

export const getActualProcess = createEvent();
export const getActualProcessFx = createEffect(getActualProcesses);

export const $process = createStore<
    PrescrappingProcessData & ScrappingProcessData
>({
    days_total: 0,
    days_parsed: 0,
    ids_collect: 0,
    ids_duples: 0,
    documents_total: 0,
    documents_parsed: 0,
    docments_nodata: 0,
    src: "",
});

sample({
    clock: getActualProcess,
    target: getActualProcessFx,
});

sample({
    clock: getActualProcessFx.doneData,
    target: $process,
});

$process.on(updateProcess, (state, patch) => ({
    ...state,
    ...patch,
}));
