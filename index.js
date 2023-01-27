import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { createOrUpdate } from './db.js';

dotenv.config();

const url = "https://hapi.fhir.org/baseR4/Patient";

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const getData = async () => {
    const data = await fetchData(url);

    const patient_zero = await fetchData(data?.entry?.[0]?.fullUrl);
    console.log(patient_zero);

    const { id, name } = patient_zero;

    const preparedData = { id: id, familyName: name?.[0].family, givenName: name?.[0].given }
    console.log("Writing to DB: ", preparedData);

    const dbOp = await createOrUpdate(preparedData);
    console.log(dbOp);
}

getData();
