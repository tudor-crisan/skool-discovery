// Handle messages from content script to bypass CORS/Mixed Content
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sync_data') {
    fetch('http://localhost:3000/api/ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request.payload)
    })
    .then(response => response.json())
    .then(data => sendResponse({ success: true, data }))
    .catch(error => sendResponse({ success: false, error: error.message }));
    
    return true; // Keep channel open for async response
  }
});
