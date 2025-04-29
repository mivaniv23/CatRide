import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext'; // Adjust the path if needed

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}