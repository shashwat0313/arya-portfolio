export async function checkAndBustCacheIfNeeded() {
    try {
        console.log("[versionCheck] Fetching /version.json...");
        const res = await fetch('/version.json', { cache: 'no-store' });
        const text = await res.text();
        let version;
        try {
            const json = JSON.parse(text);
            version = json.version;
            console.log("[versionCheck] Fetched version:", version);
        } catch (jsonErr) {
            console.error("[versionCheck] Failed to parse JSON. Response text:", text);
            throw jsonErr;
        }
        const lastVersion = localStorage.getItem('app_version');
        console.log("[versionCheck] Last version in localStorage:", lastVersion);

        if (lastVersion && lastVersion !== version) {
            console.log("[versionCheck] Version mismatch detected. Busting caches...");
            localStorage.clear();
            if ('caches' in window) {
                // Clear all service worker caches
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
                console.log("[versionCheck] Service worker caches cleared.");
            }
            // Optionally, clear other custom caches here
        } else {
            console.log("[versionCheck] No cache bust needed.");
        }

        // Store the current version for next load
        localStorage.setItem('app_version', version);
        console.log("[versionCheck] Updated localStorage app_version to:", version);
    } catch (e) {
        // Handle error (optional)
        console.error('[versionCheck] Version check failed:', e);
    }
}