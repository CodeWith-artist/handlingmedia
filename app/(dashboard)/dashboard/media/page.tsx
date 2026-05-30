'use client';
import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const sanitizeName = (name: string) =>
    name
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.\-_]/g, '')
      .toLowerCase();

  const handleUpload = async () => {
    if (!file) return;

    // Reconstruct File with sanitized name before sending
    const sanitizedFile = new File([file], sanitizeName(file.name), {
      type: file.type,
    });

    const formData = new FormData();
    formData.append('file', sanitizedFile);

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 w-full rounded"
      />
      {file && (
        <p className="text-xs text-muted-foreground mt-1">
          Saved as: <span className="font-mono">{sanitizeName(file.name)}</span>
        </p>
      )}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
      >
        Upload
      </button>
      {url && <img src={url} alt="Uploaded" className="mt-4 max-w-full h-auto" />}
      <p className="text-sm text-muted-foreground mt-2">{url}</p>
    </div>
  );
}