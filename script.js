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

        const response = await fetch(
            "https://bpscaibackend.maithiligeetstore.workers.dev",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    news: news
                })
            }
        );

        const data = await response.json();

        console.log(data);
        alert(JSON.stringify(data));
        
console.log(data.gsPaper);
alert(data.gsPaper);
        document.getElementById("score").innerHTML = data.score;
        document.getElementById("decision").innerHTML = data.decision;
        document.getElementById("confidence").innerHTML = data.confidence;

        document.getElementById("mcq").innerHTML = `
            <b>${data.mcq}</b><br><br>

            ${data.options.join("<br>")}

            <br><br>

            <b>Answer:</b> ${data.answer}

            <br><br>

            <b>Explanation:</b><br>
            ${data.explanation}
        `;

        document.getElementById("static").innerHTML = `
            <b>Static Facts</b><br><br>

            ${data.staticFacts.join("<br><br>")}

            <br><br>

            <b>Previous Year Question</b><br>
            ${data.pyq}

            <br><br>

            <b>Tags</b><br>
            ${data.tags.join(", ")}
        `;
        
// ===================
// BPSC MAINS ANALYSIS
// ===================

document.getElementById("gsPaper").innerHTML =
    data.gsPaper || "-";

document.getElementById("mainsRelevant").innerHTML =
    data.mainsRelevant || "-";

document.getElementById("mainsQuestion").innerHTML =
    data.mainsQuestion || "-";

document.getElementById("intro").innerHTML =
    data.answerFramework?.introduction || "-";

document.getElementById("bodyPoints").innerHTML =
    (data.answerFramework?.body || [])
        .map(item => `<li>${item}</li>`)
        .join("");

document.getElementById("biharPerspective").innerHTML =
    data.answerFramework?.biharPerspective || "-";

document.getElementById("wayForward").innerHTML =
    data.answerFramework?.wayForward || "-";

document.getElementById("conclusion").innerHTML =
    data.answerFramework?.conclusion || "-";

document.getElementById("keywords").innerHTML =
    (data.keywords || [])
        .map(item => `<li>${item}</li>`)
        .join("");

document.getElementById("articles").innerHTML =
    (data.valueAddition?.articles || [])
        .map(item => `<li>${item}</li>`)
        .join("");

document.getElementById("schemes").innerHTML =
    (data.valueAddition?.schemes || [])
        .map(item => `<li>${item}</li>`)
        .join("");

document.getElementById("reports").innerHTML =
    (data.valueAddition?.reports || [])
        .map(item => `<li>${item}</li>`)
        .join("");

document.getElementById("dataPoints").innerHTML =
    (data.valueAddition?.data || [])
        .map(item => `<li>${item}</li>`)
        .join("");
    } catch (err) {

        document.getElementById("score").innerHTML = "Error";
        document.getElementById("decision").innerHTML = err.message;
        document.getElementById("confidence").innerHTML = "-";
        document.getElementById("mcq").innerHTML = "-";
        document.getElementById("static").innerHTML = "-";
        
    }

});
