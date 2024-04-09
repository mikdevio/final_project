
const pdf = require("html-pdf");

exports.generateAllReport = (data, model) => {

    const reportStyle = 
    `
        <style>
        :root{
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
        }
        .container-fluid{
            width: 100%;
            height: 100%;
            padding-right: 0px;
            padding-left: 0px;
            margin-right: auto;
            margin-left: auto;
            /*background-color: rgba(136, 235, 253, 0.23);*/
        }
        .row{
            display:flex;
            /*background-color: rgba(245, 40, 145, 0.18);*/
        }
        .col {
            flex: 1;
            margin: 0 1rem;
        }

        table {
            text-align: center;
            font-size: 10px;
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid rgba(40, 39, 40, 0.9);
            text-align: left;
            padding: 8px;
        }
        th {
            color: #fff;
            background-color: rgba(40, 39, 40, 0.75);
        }
        h2{
            color: black;
            text-align: center;
        }
    </style>
    `;

    const reportBody = 
    `
    ${reportStyle}

    
    <div class="container-fluid">
        <div class="row">
            <h5>FinalProject v1.0.0</h5><span>${new Date(Date.now()).toISOString()}</span>
        </div>
        <div class="row">
            <h2>List of all ${model}s</h2>
        </div>
        <div class="row">   
            <table class="table table-hover table-sm mb-0">
                <thead>
                    <tr>
                        <th scope="column">#</th>
                        ${Object.keys(data[0]._doc).map(col_name => {
                            if(!["_id", "password" , "__v" ].includes(col_name)){
                                return `<th scope="column">${col_name}</th>`
                            }
                        }).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${data.map((element, i) => {
                        return `
                        <tr> 
                            <td scope="row">${i+1}</td>
                            ${Object.keys(data[0]._doc).map(col_name => {
                                if(!["_id", "password" , "__v" ].includes(col_name)){
                                    if(["createdAt", "updatedAt"].includes(col_name)){
                                        return `<td>${element[col_name].toISOString().replace(/T/, ' ').replace(/\..+/, '') }</td>`;
                                    } else {
                                        return `<td>${element[col_name]}</td>`;
                                    }
                                }
                            }).join("")}
                        </tr>`
                    }).join("")}
                </tbody>
            </table>
        </div>  
    </div>
    `;

    const reportOptions = {
        orientation: "landscape",
        format: 'A4',
        border: {
          top: '1cm',
          right: '1cm',
          bottom: '1cm',
          left: '1cm'
        },
      };

    // Generate Report
    pdf.create(reportBody, reportOptions).toFile(`all-${model}.pdf`, (err, res) => {
        if(err){
            console.log("Error in report generation process", err);
        } else {
            console.log("Report generated successfully");
        }
    });
    // console.log(reportBody);
}