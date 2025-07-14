'use client';

import { useState } from 'react';

export default function ExamplePage() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('{}');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
      
      let requestHeaders: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Parse additional headers if provided
      try {
        const additionalHeaders = JSON.parse(headers);
        requestHeaders = { ...requestHeaders, ...additionalHeaders };
      } catch {
        // Invalid JSON in headers, use default
      }

      const fetchOptions: RequestInit = {
        method,
        headers: requestHeaders,
      };

      // Add body for non-GET requests
      if (method !== 'GET' && body.trim()) {
        fetchOptions.body = body;
      }

      const res = await fetch(proxyUrl, fetchOptions);
      const data = await res.text();
      
      setResponse(`Status: ${res.status}\n\n${data}`);
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">CORS Proxy Example</h1>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h2 className="text-lg font-semibold mb-2">How to use the CORS Proxy:</h2>
        <p className="mb-2">Make requests to: <code className="bg-gray-100 px-2 py-1 rounded">/api/proxy?url=TARGET_URL</code></p>
        <p className="text-sm text-gray-600">
          The proxy will forward your request to the target URL and return the response with CORS headers enabled.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Target URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://api.example.com/data"
            required
          />
        </div>

        <div>
          <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-2">
            HTTP Method
          </label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>

        <div>
          <label htmlFor="headers" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Headers (JSON)
          </label>
          <textarea
            id="headers"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder='{"Authorization": "Bearer token", "Custom-Header": "value"}'
          />
        </div>

        {method !== 'GET' && (
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
              Request Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder='{"key": "value"}'
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Sending Request...' : 'Send Request'}
        </button>
      </form>

      {response && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Response:</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
            {response}
          </pre>
        </div>
      )}

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">JavaScript/Fetch:</h3>
            <pre className="bg-white p-3 rounded border text-sm overflow-auto">
{`fetch('/api/proxy?url=https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
            </pre>
          </div>

          <div>
            <h3 className="font-medium">cURL:</h3>
            <pre className="bg-white p-3 rounded border text-sm overflow-auto">
{`curl -X GET "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts/1" \\
  -H "Content-Type: application/json"`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
