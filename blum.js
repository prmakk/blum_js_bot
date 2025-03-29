(() => {
    if (window.BlumAC) return;
    window.BlumAC = true;

    const autoPlay = true; // true =  bot will start a new game after the game is finished, false = you need to start it manually
    const greenColor = [208, 216, 0];
    const colorTolerance = 5;

    if (autoPlay) {
        setInterval(() => {
            const playButton = document.querySelector(
                ".kit-button.is-large.is-primary"
            );
            if (!playButton) return;
            if (!playButton.textContent.toLowerCase().includes("играть"))
                // replace to "Play" on your language
                return;
            playButton.click();
        }, 5000);
    }

    setInterval(() => {
        const canvas = document.querySelector("canvas");
        if (canvas) findAndClickBubble(canvas);
    }, 700);

    function findAndClickBubble(screenCanvas) {
        const context = screenCanvas.getContext("2d");
        const width = screenCanvas.width;
        const height = screenCanvas.height;
        const imageData = context.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        for (let x = 0; x < width; x += 1) {
            for (let y = 0; y < height; y += 1) {
                if (y < 70) continue;

                const index = (y * width + x) * 4;
                const r = pixels[index];
                const g = pixels[index + 1];
                const b = pixels[index + 2];

                const greenRange =
                    greenColor[0] - colorTolerance < r &&
                    r < greenColor[0] + colorTolerance &&
                    greenColor[1] - colorTolerance < g &&
                    g < greenColor[1] + colorTolerance &&
                    greenColor[2] - colorTolerance < b &&
                    b < greenColor[2] + colorTolerance;

                if (greenRange) {
                    simulateClick(screenCanvas, x, y);
                }
            }
        }
    }

    function simulateClick(canvas, x, y) {
        const prop = {
            clientX: x,
            clientY: y,
            bubbles: true,
        };
        canvas.dispatchEvent(new MouseEvent("click", prop));
        canvas.dispatchEvent(new MouseEvent("mousedown", prop));
        canvas.dispatchEvent(new MouseEvent("mouseup", prop));
    }
})();
