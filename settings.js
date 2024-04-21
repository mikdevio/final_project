import path from "path";
import { fileURLToPath } from 'url';

import * as dotenv from "dotenv";
dotenv.config();

export const { MONGODB_URL, PORT, SECRET_ACCESS_TOKEN } = process.env;

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const __layouts = path.join(__dirname, "views/layouts");

export const __reports = path.join(__dirname, "views/reports");

export const __layout_main = path.join(__layouts, "main");

export const __layout_dashboard = path.join(__layouts, "dashboard");

export const __public = path.join(__dirname, "public");

export const __css = path.join(__public, "css");