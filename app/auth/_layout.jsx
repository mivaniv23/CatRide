import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { session } = useAuth(); // or user, or whatever your context uses
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace('/(tabs)');
    }
  }, [session]);

  return <Stack screenOptions={{headerShown: false}} />;
}