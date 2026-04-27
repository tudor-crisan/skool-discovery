document.getElementById('syncBtn').addEventListener('click', async () => {
  const statusEl = document.getElementById('status');
  const syncBtn = document.getElementById('syncBtn');
  const pageCount = parseInt(document.getElementById('pageCount').value) || 1;
  
  statusEl.textContent = 'Initializing Crawler...';
  syncBtn.disabled = true;

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.url.includes('skool.com')) {
      throw new Error('Not on a Skool page');
    }

    // Send crawl command
    chrome.tabs.sendMessage(tab.id, { 
      action: 'crawl', 
      pages: pageCount 
    }, (response) => {
       if (chrome.runtime.lastError) {
         statusEl.textContent = 'Error: Refresh the page first';
         syncBtn.disabled = false;
         return;
       }
       statusEl.textContent = 'Crawl started! Check dashboard soon.';
    });

  } catch (error) {
    statusEl.textContent = 'Error: ' + error.message;
    statusEl.className = 'error';
    syncBtn.disabled = false;
  }
});
