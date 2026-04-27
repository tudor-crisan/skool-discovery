document.getElementById('syncBtn').addEventListener('click', async () => {
  const statusEl = document.getElementById('status');
  const syncBtn = document.getElementById('syncBtn');
  const pageCount = parseInt(document.getElementById('pageCount').value) || 1;
  
  statusEl.textContent = 'Initializing Intelligence Crawler...';
  statusEl.className = '';
  syncBtn.disabled = true;

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.url.includes('skool.com')) {
      throw new Error('Please open a Skool group first');
    }

    // Listen for progress messages from the content script
    const messageListener = (message) => {
      if (message.type === 'CRAWL_PROGRESS') {
        statusEl.textContent = `Capturing Intelligence: Page ${message.page} of ${message.total}...`;
      }
      if (message.type === 'CRAWL_COMPLETE') {
        statusEl.textContent = 'Intelligence Updated! Check Dashboard.';
        statusEl.style.background = '#dcfce7';
        statusEl.style.color = '#166534';
        syncBtn.disabled = false;
        chrome.runtime.onMessage.removeListener(messageListener);
      }
      if (message.type === 'CRAWL_ERROR') {
        statusEl.textContent = 'Error: ' + message.error;
        statusEl.className = 'error';
        syncBtn.disabled = false;
        chrome.runtime.onMessage.removeListener(messageListener);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    // Send crawl command
    chrome.tabs.sendMessage(tab.id, { 
      action: 'crawl', 
      pages: pageCount 
    }, (response) => {
       if (chrome.runtime.lastError) {
         statusEl.textContent = 'Error: Refresh the Skool page first';
         statusEl.className = 'error';
         syncBtn.disabled = false;
         chrome.runtime.onMessage.removeListener(messageListener);
         return;
       }
    });

  } catch (error) {
    statusEl.textContent = error.message;
    statusEl.className = 'error';
    syncBtn.disabled = false;
  }
});
