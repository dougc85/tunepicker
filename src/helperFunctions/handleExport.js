import capitalize from './capitalize.js';

function safeFilename(name) {
    return (name ?? "setName")
      .toString()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[/\\?%*:|"<>]/g, "_")   // illegal on Windows + generally annoying
      .slice(0, 80);                      // avoid absurd lengths
  }

export async function handleExport(songNames, setName) {

    // One tune per line
    const contents = songNames.join("\n");

    const blob = new Blob([contents], { type: "text/plain;charset=utf-8" });
    const fileName = safeFilename(capitalize(setName)) + '_tunepicker.txt';

    try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
        return;
  } catch {
  }

  if (navigator.canShare && navigator.share) {
    const file = new File([blob], fileName, { type: blob.type });
    try {
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: `Tune list from set '${capitalize(setName)}'` });
        return;
      }
    } catch {
    }
  }

  // 3) Last resort: open the blob (lets user use Share/Save manually)
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);

}