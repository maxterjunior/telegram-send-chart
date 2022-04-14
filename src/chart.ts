import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const width = 400; //px
const height = 400; //px
const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

(async () => {
    const configuration: any = {
        type: 'line',
        data: data,
        options: {}
        // See https://www.chartjs.org/docs/latest/configuration
    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    const stream = chartJSNodeCanvas.renderToStream(configuration);
    console.log({ dataUrl })

    const fs = require('fs');

    fs.writeFile("chart.txt", dataUrl,
        {
            encoding: "utf8",
            flag: "w",
            mode: 0o666
        },
        (err: Error) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(fs.readFileSync("chart.txt", "utf8"));
            }
        });
})();