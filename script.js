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
    document.getElementById("mcq").innerHTML = "Generating...";
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

        document.getElementById("score").innerHTML =
            data.success ? "Connected ✅" : "Failed ❌";

        document.getElementById("decision").innerHTML =
            data.message || "";

        document.getElementById("confidence").innerHTML =
            data.apiKeyLoaded ? "API Key Loaded ✅" : "API Key Missing ❌";

        document.getElementById("mcq").innerHTML =
            data.receivedNews || "";

        document.getElementById("static").innerHTML =
            "Frontend → Worker Connected";

    } catch (err) {

        document.getElementById("score").innerHTML = "Error";
        document.getElementById("decision").innerHTML = err.message;

    }

});
