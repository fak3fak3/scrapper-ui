import { createEffect, createEvent, createStore, sample } from "effector";

import { getStopScrapping, postStartScrapping } from "../api/scrapping";

const startScrapping = createEvent<{ src: string }>();
const startScrappingFx = createEffect(postStartScrapping);

const stopScrapping = createEvent();
const stopScrappingFx = createEffect(getStopScrapping);

sample({
    clock: startScrapping,
    target: startScrappingFx,
});

sample({
    clock: stopScrapping,
    target: stopScrappingFx,
});

export { startScrapping, stopScrapping };
