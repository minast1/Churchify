import { Denomination } from "@prisma/client";

type Categories = {
    id: number
    label: string
    value: Denomination
}
export const categories: Categories[] = [
    { id: 1, label: "PAX ROMANA", value: 'PAXROMANA' },
    { id: 2, label: "CASA", value: "CASA" },
    { id: 3, label: "AGCM", value: "AGCM" },
    { id: 4, label: "PENSA", value: "PENSA" },
    { id: 5, label: "GESAM", value: "GESAM" },
    { id: 6, label: "NUPSG", value: "NUPSG" },
    { id: 7, label: "NUAS", value: "NUAS" },
    { id: 8, label: "NUBSCCF", value: "NUBSCCF" },
    { id: 9, label: "GENERAL", value: "GENERAL" }
];





 