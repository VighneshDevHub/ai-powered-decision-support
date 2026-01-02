"use client";

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function ClerkUserSync() {
    const { isLoaded, isSignedIn, user } = useUser();

    useEffect(() => {
        const syncUser = async () => {
            if (isLoaded && isSignedIn && user) {
                // Check if already synced via unsafeMetadata
                const isSynced = user.unsafeMetadata?.synced;

                if (!isSynced) {
                    try {
                        const response = await fetch('/api/py/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ clerkUserId: user.id }),
                        });

                        if (response.ok) {
                            // Mark as synced in Clerk metadata so it doesn't run again across devices
                            await user.update({
                                unsafeMetadata: {
                                    ...user.unsafeMetadata,
                                    synced: true,
                                },
                            });
                        } else {
                            const errData = await response.json().catch(() => ({}));
                            console.warn('Backend rejected synchronization:', errData.message || 'Unknown error');
                        }
                    } catch (err) {
                        console.error('Failed to establish neural link with backend:', err);
                    }
                }
            }
        };

        syncUser();
    }, [isLoaded, isSignedIn, user]);

    return null;
}
