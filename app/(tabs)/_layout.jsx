import { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '@/contexts/AuthContext';

export default function TabLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [loading, user]);

  // While checking auth status, don’t show the tabs
  if (loading || !user) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: '#25292e',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 32,
          color: 'white',
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'CatRide',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'gift' : 'gift-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
