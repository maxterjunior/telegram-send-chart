"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chartjs_node_canvas_1 = require("chartjs-node-canvas");
const width = 400;
const height = 400;
const backgroundColour = 'white';
const chartJSNodeCanvas = new chartjs_node_canvas_1.ChartJSNodeCanvas({ width, height, backgroundColour });
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    const configuration = {
        type: 'line',
        data: data,
        options: {}
    };
    const image = yield chartJSNodeCanvas.renderToBuffer(configuration);
    const dataUrl = yield chartJSNodeCanvas.renderToDataURL(configuration);
    const stream = chartJSNodeCanvas.renderToStream(configuration);
    console.log({ dataUrl });
    const fs = require('fs');
    fs.writeFile("chart.txt", dataUrl, {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
    }, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("chart.txt", "utf8"));
        }
    });
}))();
