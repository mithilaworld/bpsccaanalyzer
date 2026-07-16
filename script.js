const analyzeBtn = document.getElementById("analyze");

analyzeBtn.addEventListener("click", async () => {

    const news = document.getElementById("news").value.trim();

    if (!news) {
        alert("Please paste a news first.");
        return;
    }

    document.getElementById("score").innerHTML = "Analyzing...";
    document.getElementById("decision").innerHTML = "Please wait...";
    document.getElementById("confidence").innerHTML = "...";
    document.getElementById("mcq").innerHTML = "Loading...";
    document.getElementById("static").innerHTML = "Loading...";

    try {

        const response = await fetch("https://bpscaibackend.maithiligeetstore.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                news: news
            })
        });

        const data = await response.json();

        document.getElementById("score").innerHTML = data.score;
        document.getElementById("decision").innerHTML = data.decision;
        document.getElementById("confidence").innerHTML = data.confidence;

        document.getElementById("mcq").innerHTML = `
            <b>${data.mcq}</b><br><br>
            ${data.options.join("<br><br>")}
            <br><br>
            <b>Answer:</b> ${data.answer}
            <br><br>
            <b>Explanation:</b><br>
            ${data.explanation}
        `;

        document.getElementById("static").innerHTML = `
            <b>Static Facts</b><br><br>
            ${data.staticFacts.join("<br>")}
        `;

    } catch (err) {

        document.getElementById("score").innerHTML = "Error";
        document.getElementById("decision").innerHTML = err.message;
        document.getElementById("confidence").innerHTML = "-";
        document.getElementById("mcq").innerHTML = "-";
        document.getElementById("static").innerHTML = "-";

    }

});
