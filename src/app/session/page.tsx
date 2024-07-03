'use client';

import { useEffect, useState } from 'react';

const SessionPage = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        if (response.ok) {
          setSession(data);
        } else {
          console.error('Failed to fetch session:', data.error);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <h1>Session Information</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default SessionPage;
