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

        console.log(data);

        // Gemini Raw Response
        const text =
            data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

        document.getElementById("score").innerHTML = "AI Connected ✅";
        document.getElementById("decision").innerHTML = "Gemini Working";
        document.getElementById("confidence").innerHTML = "100%";

        document.getElementById("mcq").innerHTML =
            `<pre>${text}</pre>`;

        document.getElementById("static").innerHTML =
            "Gemini Response Received";

    } catch (err) {

        document.getElementById("score").innerHTML = "Error";
        document.getElementById("decision").innerHTML = err.message;
        document.getElementById("confidence").innerHTML = "-";
        document.getElementById("mcq").innerHTML = "-";
        document.getElementById("static").innerHTML = "-";

    }

});
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
