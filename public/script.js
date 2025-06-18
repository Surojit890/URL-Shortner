async function shortenUrl() {
  const longUrlInput = document.getElementById('longUrl');
  const longUrl = longUrlInput.value.trim();
  const resultBox = document.getElementById('resultBox');
  const shortUrlAnchor = document.getElementById('shortUrl');

  if (!longUrl) {
    alert('Please enter a URL');
    return;
  }

  try {
    const res = await fetch('/url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: longUrl })
    });

    const data = await res.json();
    const shortID = data.id;
    const shortURL = `${window.location.origin}/${shortID}`;

    shortUrlAnchor.href = shortURL;
    shortUrlAnchor.textContent = shortURL;
    resultBox.classList.remove('hidden');
  } catch (err) {
    alert('Error shortening URL');
    console.error(err);
  }
}
