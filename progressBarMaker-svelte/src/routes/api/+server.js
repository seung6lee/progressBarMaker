import { promises as fs } from 'fs'
import { JSDOM } from 'jsdom';
import { createCanvas, loadImage } from 'canvas';

export async function GET({ url }) {
    const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>', { runScripts: "outside-only" });
    const { document } = window;

    const params = new URLSearchParams(url.search)
    let width = parseFloat(params.get('w')) || 500;
    let height = parseFloat(params.get('h')) || 25;
    let percentage = !isNaN(params.get('p')) ? parseFloat(params.get('p')) : 62;
    let fontSize = !isNaN(params.get('fs')) ? parseFloat(params.get('fs')) : 12;
    let BGC = params.get('bgc') || "#E2E2B6";
    let FGC = params.get('fgc') || "#03346E";
    let fontColor = params.get('fc') || "#FFFFFF";
    const x = 0;
    const y = 0;
    const radius = height / 2;

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext("2d");

    function drawRoundedRech(
        x,
        y,
        w,
        h,
        r,
        p,
    ) {
        w = w * p
        console.log((r + -1 * w / 2) / r)
        console.log(Math.acos((r + -1 * w / 2) / r))
        ctx.beginPath();

        if (w < h) {
            ctx.arc(w - r, r, r, -1 * Math.acos((r + -1 * w / 2) / r), Math.acos((r + -1 * w / 2) / r))
            ctx.arc(r, r, r, Math.PI - Math.acos((r + -1 * w / 2) / r), Math.PI + Math.acos((r + -1 * w / 2) / r))
            return
        }

        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arc(
            x + w - r,
            y + r,
            r,
            (Math.PI * 3) / 2,
            Math.PI / 2,
        );
        ctx.lineTo(x + r, y + h);
        ctx.arc(
            x + r,
            y + r,
            r,
            Math.PI / 2,
            (Math.PI * 3) / 2,
        );
    }

    // Background
    ctx.fillStyle = BGC;
    drawRoundedRech(x, y, width, height, radius, 1);
    ctx.fill();

    // Percentage
    ctx.fillStyle = FGC;
    drawRoundedRech(x, y, width, height, radius, percentage / 100);
    ctx.fill();

    if (fontSize != 0) {
        const textWidth = ctx.measureText(`${percentage}%`).width;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = fontColor;
        ctx.textBaseline = "top";
        ctx.fillText(
            `${percentage}%`,
            x + width / 2 - textWidth,
            y + radius - fontSize / 2,
        );
    }

    const resultImg = canvas.toBuffer("image/png");


    const filePath = 'static/favicon.png'
    const file = await fs.readFile(filePath)
    return new Response(resultImg)
}