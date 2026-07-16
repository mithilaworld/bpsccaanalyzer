const analyzeBtn = document.getElementById("analyze");

analyzeBtn.addEventListener("click", async () => {

    const news = document.getElementById("news").value.trim();

    if (!news) {
        alert("Please paste Current Affairs News.");
        return;
    }

    document.getElementById("score").innerHTML = "Loading...";
    document.getElementById("decision").innerHTML = "Analyzing...";
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

        const text = await response.text();

console.log(text);

alert(text);

return;

        console.log(data);

        document.getElementById("score").innerHTML = data.score;
        document.getElementById("decision").innerHTML = data.decision;
        document.getElementById("confidence").innerHTML = data.confidence;

        document.getElementById("mcq").innerHTML = `
            <b>${data.mcq}</b><br><br>
            ${data.options.join("<br>")}
        `;

        document.getElementById("static").innerHTML =
            data.staticFacts.join("<br>");

    } catch (err) {

        document.getElementById("score").innerHTML = "Error";
        document.getElementById("decision").innerHTML = err.message;
        document.getElementById("confidence").innerHTML = "-";
        document.getElementById("mcq").innerHTML = "-";
        document.getElementById("static").innerHTML = "-";

    }

});
