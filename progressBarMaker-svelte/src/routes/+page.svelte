<script lang="ts">
    import {
        Utterances,
        utterancesTheme,
    } from "@codewithshin/svelte-utterances";
    const theme = "github-light";
    let reponame = "seung6lee/progressBarMaker";

    let width = 500;
    let height = 25;
    let percentage = 62;
    let fontSize = 12;
    let BGC = "#E2E2B6";
    let FGC = "#03346E";
    let fontColor = "#FFFFFF";

    let resultShow = "none";
    let resultImg: string;

    const clicked = () => {
        resultImg = `${window.location.origin}/api?w=${width}&h=${height}&p=${percentage}&fs=${fontSize}&bgc=${BGC}&fgc=${FGC}&fc=${fontColor}`;
        resultShow = "flex";
    };

    const copy = () => {
        navigator.clipboard.writeText(resultImg);
    };
</script>

<body>
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
                    step="0.1"
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
                    step="0.1"
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
                    step="0.1"
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
                    step="0.1"
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
            <div id="btns" style="--bgc: {BGC}; --fgc: {FGC}">
                <a id="downloadBtn" href={resultImg} download="test">Download</a
                >
                <button id="copyBtn" on:click={copy}>Copy URL</button>
            </div>
        </figure>
    </main>

    <div style="height: 200px;">
        <Utterances {reponame} {theme} />
    </div>
</body>

<style>
    body {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
    }

    main {
        /* position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); */

        padding-top: 10vh;
        width: 100vw;
        height: 80vh;

        /* position: fixed; */

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

    #btns {
        display: flex;
        flex-direction: row;
    }

    #btns > * {
        margin: 0 5px;
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

    #downloadBtn,
    #copyBtn {
        box-sizing: border-box;
        margin-top: 10px;

        cursor: pointer;
        background-color: var(--bgc);
        border-radius: 10px;
        width: 80px;
        height: 36px;

        color: var(--fgc);

        display: flex;
        align-items: center;
        justify-content: center;

        text-decoration: none;

        border: none;

        font-size: 14px;
        font-weight: 500;
    }

    #downloadBtn:active,
    #copyBtn:active {
        border: 1px solid var(--fgc);
        filter: brightness(50%);
    }
</style>
