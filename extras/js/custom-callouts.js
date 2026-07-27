document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("blockquote").forEach((bq) => {
    const p = bq.querySelector("p");
    if (!p) return;

    // Match [!ANYTHING] at the start of blockquote
    const match = p.innerHTML.match(/^\s*\[!([A-Z0-9_\s]+)\]/i);
    if (match) {
      const type = match[1].toLowerCase().replace(/\s+/g, "-");
      
      // Add custom class to blockquote
      bq.classList.add("callout", `callout-${type}`);
      
      // Clean up the raw `[!CUSTOM CALLOUT]` text tag
      p.innerHTML = p.innerHTML.replace(/^\s*\[![^\]]+\]\s*/, "");
    }
  });
});
