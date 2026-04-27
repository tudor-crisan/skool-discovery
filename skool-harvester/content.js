function extractSkoolData() {
  const nextDataEl = document.getElementById('__NEXT_DATA__');
  let data = {};
  
  if (nextDataEl) {
    try {
      data = JSON.parse(nextDataEl.textContent);
    } catch (e) {
      console.error('Failed to parse __NEXT_DATA__');
    }
  }

  // Check if we have posts in JSON
  const pageProps = data.props?.pageProps;
  const hasJsonPosts = !!(pageProps?.feed?.posts || pageProps?.initialState?.groupFeed?.posts);

  // Fallback: Scrape visible posts from DOM if JSON is empty
  const domPosts = [];
  if (!hasJsonPosts) {
    document.querySelectorAll('[data-testid="post-card"], .styled__PostCard-sc-').forEach(el => {
      domPosts.push({
        title: el.querySelector('h3, .post-title')?.textContent?.trim(),
        user_name: el.querySelector('.user-name, [class*="AuthorName"]')?.textContent?.trim(),
        content_plain: el.querySelector('.post-content, [class*="BodyText"]')?.textContent?.trim(),
        likes_count: el.querySelector('[aria-label*="like"]')?.textContent?.trim() || "0",
        comments_count: el.querySelector('[aria-label*="comment"]')?.textContent?.trim() || "0"
      });
    });
  }

  return {
    success: true,
    data: data,
    domPosts: domPosts, // Send scraped posts as fallback
    url: window.location.href,
    timestamp: new Date().toISOString(),
    isFeedPage: !!document.querySelector('.feed-container, [class*="Feed"]')
  };
}

async function syncToServer(payload) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ 
      action: 'sync_data', 
      payload: payload 
    }, (response) => {
      if (response && response.success) {
        console.log('Page synced successfully via background');
      } else {
        console.error('Failed to sync page via background', response?.error);
      }
      resolve();
    });
  });
}

async function crawlPages(count) {
  for (let i = 0; i < count; i++) {
    console.log(`Harvesting page ${i + 1} of ${count}...`);
    
    // 1. Scroll to bottom to trigger any lazy loads
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 1500));
    
    // 2. Extract and Sync
    const result = extractSkoolData();
    await syncToServer(result);

    // 3. Find and click Next button (unless it's the last requested page)
    if (i < count - 1) {
      const nextBtn = Array.from(document.querySelectorAll('button, a, span'))
        .find(el => el.textContent.includes('Next') || el.innerText === '>');
      
      if (nextBtn) {
        nextBtn.click();
        await new Promise(r => setTimeout(r, 3000)); // Wait for page transition
      } else {
        console.log('No Next button found. Stopping.');
        break;
      }
    }
  }
  console.log('Crawl completed!');
}

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extract") {
    const result = extractSkoolData();
    sendResponse(result);
  } else if (request.action === "crawl") {
    crawlPages(request.pages);
    sendResponse({ started: true });
  }
});
