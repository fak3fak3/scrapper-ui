import {
    Box,
    Button,
    Container,
    Divider,
    Group,
    Progress,
    Space,
    Text,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useUnit } from "effector-react";

import React, { useEffect, useState } from "react";
import {
    $dates,
    setDates,
    startPrescrapping,
    stopPrescrapping,
} from "../store/prescrapping";
import {
    $process,
    connectPrescrappingSocket,
    getActualProcess,
} from "../store/info";
import { startScrapping, stopScrapping } from "../store/scrapping";

const MainPage = () => {
    const { startP, stopP, startS, stopS, dates, updateDates, init } = useUnit({
        startP: startPrescrapping,
        stopP: stopPrescrapping,
        startS: startScrapping,
        stopS: stopScrapping,
        dates: $dates,
        updateDates: setDates,
        init: getActualProcess,
    });
    const {
        days_parsed,
        days_total,
        ids_collect,
        ids_duples,
        docments_nodata,
        documents_parsed,
        documents_total,
    } = useUnit($process);

    function handleStartP() {
        if (dates[0] && dates[1]) {
            startP({
                from: dates[0],
                to: dates[1],
            });
        }
    }

    function handleStopP() {
        stopP();
    }

    function handleStartS() {
        startS({ src: "ruscourt" });
    }

    function handleStopS() {
        stopS();
    }

    useEffect(() => {
        init();

        const socket = connectPrescrappingSocket();
        return () => socket.close();
    }, []);

    return (
        <Container fluid pt="sm">
            <h1 className="text-[30px]">Data miner</h1>
            <Group justify="space-between">
                <Group className="mt-2">
                    <DatePicker
                        type="range"
                        value={dates}
                        onChange={updateDates}
                    />
                </Group>
                {dates[0] && dates[1] && (
                    <Box className="w-2/3">
                        <Progress
                            mt="15"
                            value={(100 * days_parsed) / days_total}
                            animated
                        />
                        <Box mt="15">
                            <Text>Документов: {ids_collect}</Text>
                            <Text>Дубликатов: {ids_duples}</Text>
                            <Text>
                                Дней: {days_parsed}/{days_total}
                            </Text>
                        </Box>
                        <Group className="mt-5">
                            <Button onClick={handleStartP}>Старт</Button>
                            <Button onClick={handleStopP} variant="outline">
                                Стоп
                            </Button>
                        </Group>
                        <Divider my="md" />
                        <Progress
                            mt="15"
                            value={
                                (100 * (docments_nodata + documents_parsed)) /
                                documents_total
                            }
                            animated
                        />
                        <Box mt="15">
                            <Text>Документов всего: {documents_total}</Text>
                            <Text>С данными: {documents_parsed}</Text>
                            <Text>Без: {docments_nodata}</Text>
                        </Box>
                        <Group className="mt-5">
                            <Button onClick={handleStartS}>Старт</Button>
                            <Button onClick={handleStopS} variant="outline">
                                Стоп
                            </Button>
                        </Group>
                    </Box>
                )}
            </Group>
        </Container>
    );
};

export default MainPage;
