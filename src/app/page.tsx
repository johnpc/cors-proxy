import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>CORS Proxy Server</h1>
        
        <p style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '600px' }}>
          A Next.js application that provides a CORS proxy endpoint to bypass CORS restrictions 
          when making requests to external APIs from the browser.
        </p>

        <div style={{ 
          background: '#f5f5f5', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          marginBottom: '2rem',
          maxWidth: '600px'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>API Endpoint</h2>
          <code style={{ 
            background: '#e0e0e0', 
            padding: '0.5rem', 
            borderRadius: '4px',
            display: 'block',
            marginBottom: '1rem'
          }}>
            /api/proxy?url=TARGET_URL
          </code>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
            Supports all HTTP methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
          </p>
        </div>

        <div className={styles.ctas}>
          <Link
            className={styles.primary}
            href="/example"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Example icon"
              width={20}
              height={20}
            />
            Try Example
          </Link>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read Next.js docs
          </a>
        </div>

        <div style={{ marginTop: '3rem', maxWidth: '600px' }}>
          <h3>Quick Usage Examples:</h3>
          <div style={{ textAlign: 'left', fontSize: '0.9rem' }}>
            <h4>JavaScript:</h4>
            <pre style={{ 
              background: '#f0f0f0', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.8rem'
            }}>
{`fetch('/api/proxy?url=https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));`}
            </pre>
            
            <h4>cURL:</h4>
            <pre style={{ 
              background: '#f0f0f0', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.8rem'
            }}>
{`curl "http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts/1"`}
            </pre>
          </div>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <Link href="/example">
          <Image
            aria-hidden
            src="/file.svg"
            alt="Example icon"
            width={16}
            height={16}
          />
          Interactive Example
        </Link>
        <a
          href="https://github.com/vercel/next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="GitHub icon"
            width={16}
            height={16}
          />
          Next.js on GitHub
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
