 import { jsPDF } from "https://cdn.jsdelivr.net/npm/jspdf@latest/+esm";

      
function drawTextBox(doc, text, x, y, w, h, padding = 8) {
    // Use explicit lines if you already have \n in the source
    const rawLines = String(text).split("\n");

    // Wrap each paragraph to the available width
    const lines = rawLines.flatMap(line =>
        doc.splitTextToSize(line, w - padding * 2)
    );

    // Box
    doc.rect(x, y, w, h);

    // Text inside
    doc.text(lines, x + padding, y + padding, {
        baseline: "top",
        lineHeightFactor: 1.2,
        maxWidth: w - padding * 2
    });
}

function createAndDownload() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    let entries = document.getElementById("entries").value.split(",");

    if(entries.length != 16 && entries.length!= 9 && entries.length!=25){
        //entries muss ein quadrat werden
        alert("9, 16, oder 25 Entries! Ansonsten wird da kein Quadrat draus du Affe. entryLength="+entries.length);
        return;
    }

     doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    //todo: shuffle entries

    let width=Math.round(entries.length**0.5);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            const entry = entries[x*3+y];

            drawTextBox(doc, entry, 20+60*x, 20+60*y, 60, 60);
        }
        
    }

    doc.save("boxes.pdf");
}


document.getElementById("downloadPdf").addEventListener("click", createAndDownload);
