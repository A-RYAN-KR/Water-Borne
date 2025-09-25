import { Tabs } from 'expo-router';
import {
  Home,
  FileText,
  Droplets,
  Bell,
  Users,
  BookOpen,
  User,
  Globe, // 🌍 New icon
} from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="patient-form"
        options={{
          title: 'Patient',
          tabBarIcon: ({ size, color }) => (
            <FileText size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="water-quality"
        options={{
          title: 'Water',
          tabBarIcon: ({ size, color }) => (
            <Droplets size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ size, color }) => <Bell size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ size, color }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: 'Education',
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
      />
      {/* ✅ New Language Tab */}
      <Tabs.Screen
        name="language"
        options={{
          title: 'Language',
          tabBarIcon: ({ size, color }) => <Globe size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
