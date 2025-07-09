import { createEffect, createEvent, createStore, sample } from "effector";
import {
    getStopPrescrapping,
    postStartPrescrapping,
} from "../api/prescrapping";
import { getActualProcessFx } from "./info";

const $dates = createStore<[string | null, string | null]>([null, null]);
const setDates = createEvent<[string | null, string | null]>();

const startPrescrapping = createEvent<{ from: string; to: string }>();
const startPrescrappingFx = createEffect(postStartPrescrapping);

const stopPrescrapping = createEvent();
const stopPrescrappingFx = createEffect(getStopPrescrapping);

sample({
    clock: startPrescrapping,
    target: startPrescrappingFx,
});

sample({
    clock: stopPrescrapping,
    target: stopPrescrappingFx,
});

sample({
    clock: stopPrescrapping,
    fn: (): [null, null] => [null, null],
    target: $dates,
});

sample({
    clock: setDates,
    target: $dates,
});

sample({
    clock: getActualProcessFx.doneData,
    fn: (src): [string, string] => [src.from, src.to],
    target: setDates,
});

export { startPrescrapping, stopPrescrapping, $dates, setDates };
