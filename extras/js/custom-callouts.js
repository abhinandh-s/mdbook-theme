document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("blockquote").forEach((bq) => {
    const firstParagraph = bq.querySelector("p");
    if (!firstParagraph) return;

    // Check if the blockquote starts with [!CASE LAW] or any [!CUSTOM] tag
    const match = firstParagraph.innerHTML.match(/^\s*\[!([A-Z0-9_\s]+)\]/i);
    if (!match) return;

    const rawTag = match[1].trim();
    const slug = rawTag.toLowerCase().replace(/\s+/g, "-");

    // Add native mdBook blockquote-tag class
    bq.classList.add("blockquote-tag", `blockquote-tag-${slug}`);

    // Create a native title element matching mdBook structure
    const titleDiv = document.createElement("div");
    titleDiv.className = "blockquote-tag-title";

    // Optional SVG icon (e.g. a legal scale icon)
    titleDiv.innerHTML = `
      <span class="fa-svg">
        <svg viewBox="0 0 512 512">
          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l128 216c8.8 14.8 3.9 33.8-10.9 42.6S373.8 314.5 365 299.7L256 116.1 147 299.7c-8.8 14.8-27.8 19.7-42.6 10.9s-19.7-27.8-10.9-42.6l128-216C228.7 39.5 241.8 32 256 32z"/>
        </svg>
      </span>
      <span>${rawTag.toUpperCase()}</span>
    `;

    // Remove the literal [!CASE LAW] tag from text content
    firstParagraph.innerHTML = firstParagraph.innerHTML.replace(/^\s*\[![^\]]+\]\s*/, "");

    // Prepend title inside blockquote
    bq.insertBefore(titleDiv, bq.firstChild);
  });
});
