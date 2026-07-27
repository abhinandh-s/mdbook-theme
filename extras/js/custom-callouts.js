document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("blockquote").forEach((bq) => {
    const firstParagraph = bq.querySelector("p");
    if (!firstParagraph) return;

    // Check if the blockquote starts with [!CASE LAW] or any [!CUSTOM] tag
    const match = firstParagraph.innerHTML.match(/^\s*\[!([A-Z0-9_\s]+)\]/i);
    if (!match) return;

    const rawTag = match[1].trim();
    const slug = rawTag.toLowerCase().replace(/\s+/g, "-");

    // Add mdBook native callout class
    bq.classList.add("blockquote-tag", `blockquote-tag-${slug}`);

    // Create the header title container
    const titleDiv = document.createElement("div");
    titleDiv.className = "blockquote-tag-title";

    // Set the Font Awesome gavel icon ONLY for case-law, fallback otherwise
    let iconHtml = "";
    if (slug === "case-law") {
      iconHtml = `<i class="fa-solid fa-gavel" style="margin-right: 8px;"></i>`;
    } else {
      iconHtml = `<i class="fa-solid fa-scale-balanced" style="margin-right: 8px;"></i>`;
    }

    titleDiv.innerHTML = `${iconHtml}<span>${rawTag.toUpperCase()}</span>`;

    // Remove the raw [!CASE LAW] string from the body text
    firstParagraph.innerHTML = firstParagraph.innerHTML.replace(/^\s*\[![^\]]+\]\s*/, "");

    // Prepend title div inside the blockquote
    bq.insertBefore(titleDiv, bq.firstChild);
  });
});
