<script lang="ts">
    type color = string

    function progressBar(width: number, height: number, percentage: number, fontSize: number, BGC: color, FGC: color, fontColor: color) {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.id = "canvas";
        const ctx = canvas.getContext("2d");

        const x = 0;
        const y = 0;
        const radius = height / 2;

        function drawRoundedRech(x: number, y: number, width: number, height: number, radius: number, percentage: number) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width * percentage - radius, y);
            ctx.arc(
                x + width * percentage - radius,
                y + radius,
                radius,
                (Math.PI * 3) / 2,
                Math.PI / 2,
            );
            ctx.lineTo(x + radius, y + height);
            ctx.arc(
                x + radius,
                y + radius,
                radius,
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

        const textWidth = ctx.measureText(`${percentage}%`).width;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = fontColor;
        ctx.textBaseline = "top";
        ctx.fillText(
            `${percentage}%`,
            x + width / 2 - textWidth,
            y + radius - fontSize / 2,
        );

        resultImg = canvas.toDataURL('image/png')
        resultShow = "flex"
    }

    let width = 500
    let height = 25
    let percentage = 62
    let fontSize = 12
    let BGC = "#E2E2B6"
    let FGC = "#03346E"
    let fontColor = "#FFFFFF"

    let resultShow = "none"
    let resultImg: string

    const clicked = () => progressBar(width, height, percentage, fontSize, BGC, FGC, fontColor)
</script>

<main>
    <h1>Progress Bar Maker</h1>

    <form id="barSettings">
        <div>
            <label for="width">Bar Width (px)</label>
            <input
                type="number"
                min="0"
                max="2000"
                value="500"
                placeholder="500"
                id="width"
                on:input={(event) => (width = event.target.value)}
            />
        </div>

        <div>
            <label for="height">Bar Height (px)</label>
            <input
                type="number"
                min="0"
                max="100"
                value="25"
                placeholder="25"
                id="height"
                on:input={(event) => (height = event.target.value)}
            />
        </div>

        <div>
            <label for="percentage">Progress Percentage (%)</label>
            <input
                type="number"
                min="0"
                max="100"
                value="62"
                placeholder="62"
                id="percentage"
                on:input={(event) => (percentage = event.target.value)}
            />
        </div>

        <div>
            <label for="fontSize">Font Size (px)</label>
            <input
                type="number"
                min="0"
                max="100"
                value="12"
                placeholder="12"
                id="fontSize"
                on:input={(event) => (fontSize = event.target.value)}
            />
        </div>

        <div>
            <label for="BGC">Bar Background Color</label>
            <input
                type="color"
                value="#E2E2B6"
                id="BGC"
                on:input={(event) => (BGC = event.target.value)}
            />
        </div>

        <div>
            <label for="FGC">Bar Frontground Color</label>
            <input
                type="color"
                value="#03346E"
                id="FGC"
                on:input={(event) => (FGC = event.target.value)}
            />
        </div>

        <div>
            <label for="FC">Font Color</label>
            <input
                type="color"
                value="#FFFFFF"
                id="FC"
                on:input={(event) => (fontColor = event.target.value)}
            />
        </div>

        <button id="submit" on:click={clicked}>Go</button>
    </form>

    <figure style="display:{resultShow}">
        <img src={resultImg} alt="No Result" />
        <a id="downloadBtn" href={resultImg} download="test">Download</a>
    </figure>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;

        margin: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
    }

    figure {
        margin-top: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #barSettings {
        width: 280px;

        display: flex;
        flex-direction: column;
    }

    #barSettings > div {
        display: flex;
        flex-direction: row;
        /* justify-content: space-between; */

        margin-top: 5px;
        margin-bottom: 5px;
    }

    #barSettings > div > label {
        width: 200px;
    }

    #barSettings > div > input {
        width: 80px;
        border: 2px solid black;
        border-radius: 5px;
        background: none;
    }

    #submit {
        cursor: pointer;
        border: 2px solid black;
        border-radius: 5px;
        width: 40px;
        justify-content: center;

        align-self: center;
    }

    #downloadBtn {
        margin-top: 10px;

        cursor: pointer;
        background-color: #03346e;
        border-radius: 10px;
        width: 80px;
        height: 36px;

        color: #e2e2b6;

        display: flex;
        align-items: center;
        justify-content: center;

        text-decoration: none;
    }
</style>
