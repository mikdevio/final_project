import path from "path";
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const __layouts = path.join(__dirname, "views/layouts");

export const __layout_main = path.join(__layouts, "main");

export const __layout_dashboard = path.join(__layouts, "dashboard");