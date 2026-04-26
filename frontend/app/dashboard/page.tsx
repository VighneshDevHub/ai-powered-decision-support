'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect /dashboard to /dashboard/welcome as per requirements
    router.replace('/dashboard/welcome');
  }, [router]);

  return null;
}
