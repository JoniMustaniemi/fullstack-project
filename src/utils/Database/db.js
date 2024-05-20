/* eslint-disable no-undef */
import pkg from "pg";
import dbConfig from "./dbConfig.js";

const { Pool } = pkg;

export const pool = new Pool(dbConfig);
