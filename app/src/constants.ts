import { Denomination } from "@prisma/client";
import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";


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

export const denominations = ["PAXROMANA",
  "CASA",
  "AGCM",
  "PENSA",
  "GESAM",
  "NUPSG",
  "NUAS",
    "NUBSCCF"] as const

export const memberSignupValidator = withZod(
  z.object({
    name: z.string().nonempty("* This field is required"),
    email: z.string().nonempty("* This field is required").email({ message: "Please enter a valid email address" }),
    password: z.string().nonempty(" * This field is required"),
    confirm: z.string().nonempty("Please confirm the password"),
    denomination: z.enum(denominations),
  }).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match", 
    path: ["confirm"]
  })
)

export const memberLoginValidator = withZod(
    z.object({
        name: z.string().nonempty("* This field is required"),
        email: z.string().nonempty("* This field is required").email({ message: "Please enter a valid email address" }),
        password: z.string().nonempty(" * This field is required"),
    }   
))






 