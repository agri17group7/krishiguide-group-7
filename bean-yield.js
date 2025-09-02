let beanYieldChart;

document.getElementById("beanEstimateBtn").addEventListener("click", function() {
    const areaBigha = parseFloat(document.getElementById("beanAreaBigha").value) || 0;
    const rowSpacing = parseFloat(document.getElementById("beanRowSpacing").value) || 0.1;
    const plantSpacing = parseFloat(document.getElementById("beanPlantSpacing").value) || 0.1;
    const podsPerPlant = parseFloat(document.getElementById("beanPodsPerPlant").value) || 0;
    const podWeight = parseFloat(document.getElementById("beanPodWeight").value) || 0;
    const mgmtFactor = parseFloat(document.getElementById("beanMgmtFactor").value) || 1.0;

    // ১ বিঘা = 1337.803 sqm
    const areaSqm = areaBigha * 1337.803;

    // প্রতি গাছে জায়গা
    const areaPerPlant = rowSpacing * plantSpacing;

    // মোট গাছ সংখ্যা
    const totalPlants = areaSqm / areaPerPlant;

    // মোট ফল/ডাঁটা
    const totalPods = totalPlants * podsPerPlant;

    // মোট ওজন (গ্রামে)
    const totalWeightGrams = totalPods * podWeight * mgmtFactor;

    // টনে রূপান্তর
    const totalYieldTon = totalWeightGrams / 1000000;

    // ✅ ফলাফল দেখানো
    document.getElementById("beanYieldSummary").innerHTML =
      `👉 অনুমানিত মোট ফলন: <b>${totalYieldTon.toFixed(2)} টন</b>`;

    // ✅ চার্ট আপডেট
    const ctx = document.getElementById("beanYieldBreakdownChart").getContext("2d");
    if (beanYieldChart) beanYieldChart.destroy();

    beanYieldChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["মোট গাছ", "মোট ফল/ডাঁটা", "মোট ফলন (টন)"],
            datasets: [{
                data: [totalPlants.toFixed(0), totalPods.toFixed(0), totalYieldTon.toFixed(2)],
                backgroundColor: ["#4caf50", "#ff9800", "#2196f3"]
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "bottom" } }
        }
    });
});