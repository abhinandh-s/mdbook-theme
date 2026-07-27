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
      iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M201.6 217.4L182.9 198.7C170.4 186.2 170.4 165.9 182.9 153.4L297.6 38.6C310.1 26.1 330.4 26.1 342.9 38.6L361.6 57.4C374.1 69.9 374.1 90.2 361.6 102.7L246.9 217.4C234.4 229.9 214.1 229.9 201.6 217.4zM308 275.7L276.6 244.3L388.6 132.3L508 251.7L396 363.7L364.6 332.3L132.6 564.3C117 579.9 91.7 579.9 76 564.3C60.3 548.7 60.4 523.4 76 507.7L308 275.7zM422.9 438.6C410.4 426.1 410.4 405.8 422.9 393.3L537.6 278.6C550.1 266.1 570.4 266.1 582.9 278.6L601.6 297.3C614.1 309.8 614.1 330.1 601.6 342.6L486.9 457.4C474.4 469.9 454.1 469.9 441.6 457.4L422.9 438.7z"/></svg>`;
    } else {
      iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M96 280C96 213.7 149.7 160 216 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L216 224C185.1 224 160 249.1 160 280L160 288L224 288C259.3 288 288 316.7 288 352L288 416C288 451.3 259.3 480 224 480L160 480C124.7 480 96 451.3 96 416L96 280zM352 280C352 213.7 405.7 160 472 160L480 160C497.7 160 512 174.3 512 192C512 209.7 497.7 224 480 224L472 224C441.1 224 416 249.1 416 280L416 288L480 288C515.3 288 544 316.7 544 352L544 416C544 451.3 515.3 480 480 480L416 480C380.7 480 352 451.3 352 416L352 280z"/></svg>`;
    }

    titleDiv.innerHTML = `${iconHtml}<span>${rawTag.toUpperCase()}</span>`;

    // Remove the raw [!CASE LAW] string from the body text
    firstParagraph.innerHTML = firstParagraph.innerHTML.replace(/^\s*\[![^\]]+\]\s*/, "");

    // Prepend title div inside the blockquote
    bq.insertBefore(titleDiv, bq.firstChild);
  });
});
