
const analyzeBtn = document.getElementById("analyze");

analyzeBtn.addEventListener("click", function () {

    const news = document.getElementById("news").value;

    if(news.trim()==""){
        alert("Please paste a news first.");
        return;
    }

    document.getElementById("score").innerHTML="18 /20";

    document.getElementById("decision").innerHTML="🔥 Must Read";

    document.getElementById("confidence").innerHTML="🟢 High";

    document.getElementById("mcq").innerHTML=
    "Q. This news belongs to which category?<br><br>A. Economy<br>B. Environment<br>C. International<br>D. Science";

    document.getElementById("static").innerHTML=
    "Static Facts will be generated here using Gemini AI.";
});
