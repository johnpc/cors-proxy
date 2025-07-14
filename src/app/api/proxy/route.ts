import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return handleProxy(request);
}

export async function POST(request: NextRequest) {
  return handleProxy(request);
}

export async function PUT(request: NextRequest) {
  return handleProxy(request);
}

export async function DELETE(request: NextRequest) {
  return handleProxy(request);
}

export async function PATCH(request: NextRequest) {
  return handleProxy(request);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(),
  });
}

async function handleProxy(request: NextRequest) {
  try {
    // Get the target URL from query parameters
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
      return NextResponse.json(
        { error: 'Missing required parameter: url' },
        { 
          status: 400,
          headers: getCorsHeaders()
        }
      );
    }

    // Validate URL format
    try {
      new URL(targetUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { 
          status: 400,
          headers: getCorsHeaders()
        }
      );
    }

    // Prepare headers for the proxied request
    const proxyHeaders: HeadersInit = {};
    
    // Copy relevant headers from the original request
    const headersToProxy = [
      'authorization',
      'content-type',
      'user-agent',
      'accept',
      'accept-language',
      'cache-control'
    ];

    headersToProxy.forEach(headerName => {
      const headerValue = request.headers.get(headerName);
      if (headerValue) {
        proxyHeaders[headerName] = headerValue;
      }
    });

    // Get request body if present
    let body: string | undefined;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      try {
        body = await request.text();
      } catch {
        // If body parsing fails, continue without body
      }
    }

    // Make the proxied request
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: proxyHeaders,
      body: body || undefined,
    });

    // Get response data as ArrayBuffer to preserve binary data
    const responseData = await response.arrayBuffer();
    
    // Determine content type
    const contentType = response.headers.get('content-type') || 'text/plain';

    // Return the proxied response with CORS headers
    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...getCorsHeaders(),
        'content-type': contentType,
      },
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Proxy request failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: getCorsHeaders()
      }
    );
  }
}

function getCorsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
}
