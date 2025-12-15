document.getElementById('unpack-btn').addEventListener('click', function() {
    const bookmarkletInput = document.getElementById('bookmarklet-input').value;
    const decodedOutput = decodeBookmarklet(bookmarkletInput);
    displayDecodedOutput(decodedOutput);
});

document.getElementById('download-btn').addEventListener('click', function() {
    const bookmarkletInput = document.getElementById('bookmarklet-input').value;
    const decodedOutput = decodeBookmarklet(bookmarkletInput);
    downloadDecodedScript(decodedOutput);
});

function decodeBookmarklet(bookmarklet) {
    // Remove the "javascript:" part
    if (bookmarklet.startsWith("javascript:")) {
        bookmarklet = bookmarklet.substring(11);
    }

    try {
        // Decode the base64-encoded bookmarklet (if any)
        const decoded = decodeURIComponent(bookmarklet);
        return decoded;
    } catch (e) {
        return "Error decoding bookmarklet: " + e.message;
    }
}

function displayDecodedOutput(decodedOutput) {
    const outputElement = document.getElementById('decoded-output');
    const downloadButton = document.getElementById('download-btn');
    
    outputElement.textContent = decodedOutput;
    
    // Show the download button only if we have a valid decoded script
    if (decodedOutput && decodedOutput !== "Error decoding bookmarklet") {
        downloadButton.style.display = 'block';
    }
}

function downloadDecodedScript(decodedScript) {
    const blob = new Blob([decodedScript], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bookmarklet.js';
    link.click();
}
