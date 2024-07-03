"use client"

import { useState, FormEvent } from 'react';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [session, setSession] = useState<any>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ USERID: userId }),
    });

    const data = await response.json();
    if (data.success) {
      setMessage('Login successful');
      fetchSession();
    } else {
      setMessage(`Login failed: ${data.error}`);
    }
  };

  const fetchSession = async () => {
    const response = await fetch('/api/auth/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.error) {
      setMessage(`Session fetch failed: ${data.error}`);
    } else {
      setSession(data);
      setMessage('Session fetched successfully');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='userId'>User ID:</label>
        <input
          type='text'
          id='userId'
          name='userId'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type='submit'>Login</button>
      </form>
      {message && <p>{message}</p>}
      {session && (
        <div>
          <h2>Session Information</h2>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
