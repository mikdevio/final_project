
import fs from "fs";
import path from "path";
import pdf from "html-pdf";
import * as ejs from "ejs";

import { __dirname, __reports, __css } from "../settings.js";

export const generateAllReport = (data, model) => {

    try {
        let file_url =path.join(__dirname,`/temp/all_${model}_${Date.now()}.pdf`);

    const options = {
        orientation: "portrait",
        directory: "./temp",
        format: 'A4',
        border: {
          top: '1cm',
          right: '1cm',
          bottom: '1cm',
          left: '1cm'
        },
      };

    
    const styles = fs.readFileSync(path.join(__css, "reports.css"));
    const template = fs.readFileSync(path.join(__reports, "allreport.ejs"), 'utf8');
    const body = ejs.render(template, { data: data, model: model, styles: styles })
    // Generate Report
    pdf.create(body, options).toFile(file_url, (err, res) => {
        if(err){
            console.log("Error in report generation process", err);
        } else {
            console.log("Report generated successfully");
        }
    });
    return file_url;

    } catch (error) {
        console.log(error);
    };
};

export const billReport = (data) => {console.log("Empty")};