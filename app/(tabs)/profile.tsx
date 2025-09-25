import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  Switch 
} from 'react-native';
import { User, Settings, Globe, Download, Upload, Bell, Shield, LogOut, CreditCard as Edit, MapPin, Phone, Mail, Calendar, Database, Wifi, WifiOff, CircleCheck as CheckCircle2, Clock } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const userProfile = {
    name: 'Rajesh Kumar',
    role: 'ASHA Worker',
    id: 'ASHA001234',
    phone: '+91 9876543210',
    email: 'rajesh.kumar@health.gov.in',
    location: 'Village Srirangam, Ward 4',
    joinDate: 'January 2023',
    casesReported: 127,
    lastSync: '2 minutes ago'
  };

  const offlineData = {
    pendingSync: 5,
    downloadedContent: 12,
    storageUsed: '45 MB',
    lastBackup: '1 day ago'
  };

  const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi'];

  const handleLanguageChange = () => {
    Alert.alert(
      'Change Language',
      'Select your preferred language',
      languages.map(lang => ({
        text: lang,
        onPress: () => setCurrentLanguage(lang)
      }))
    );
  };

  const handleSync = () => {
    Alert.alert('Syncing Data', 'Uploading offline data and downloading updates...');
  };

  const handleBackup = () => {
    Alert.alert('Backup Data', 'Creating local backup of your data...');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => router.replace('/login') }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing functionality coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile & Settings</Text>
          <View style={styles.connectionStatus}>
            {isOnline ? <Wifi size={20} color="#059669" /> : <WifiOff size={20} color="#dc2626" />}
            <Text style={[styles.statusText, { color: isOnline ? '#059669' : '#dc2626' }]}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>

        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <User size={40} color="#3b82f6" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userProfile.name}</Text>
              <Text style={styles.profileRole}>{userProfile.role}</Text>
              <Text style={styles.profileId}>ID: {userProfile.id}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.detailItem}>
              <Phone size={16} color="#6b7280" />
              <Text style={styles.detailText}>{userProfile.phone}</Text>
            </View>
            <View style={styles.detailItem}>
              <Mail size={16} color="#6b7280" />
              <Text style={styles.detailText}>{userProfile.email}</Text>
            </View>
            <View style={styles.detailItem}>
              <MapPin size={16} color="#6b7280" />
              <Text style={styles.detailText}>{userProfile.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Calendar size={16} color="#6b7280" />
              <Text style={styles.detailText}>Joined {userProfile.joinDate}</Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Your Impact</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.casesReported}</Text>
              <Text style={styles.statLabel}>Cases Reported</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{offlineData.pendingSync}</Text>
              <Text style={styles.statLabel}>Pending Sync</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{offlineData.downloadedContent}</Text>
              <Text style={styles.statLabel}>Downloaded</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{offlineData.storageUsed}</Text>
              <Text style={styles.statLabel}>Storage Used</Text>
            </View>
          </View>
        </View>

        {/* Language & Accessibility */}
        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Language & Accessibility</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleLanguageChange}>
            <View style={styles.settingLeft}>
              <Globe size={20} color="#3b82f6" />
              <View>
                <Text style={styles.settingTitle}>Language</Text>
                <Text style={styles.settingSubtitle}>{currentLanguage}</Text>
              </View>
            </View>
            <Text style={styles.settingAction}>Change</Text>
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color="#3b82f6" />
              <View>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingSubtitle}>Push + SMS alerts</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
              thumbColor={notificationsEnabled ? '#3b82f6' : '#9ca3af'}
            />
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Data Management</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Upload size={20} color="#059669" />
              <View>
                <Text style={styles.settingTitle}>Auto Sync</Text>
                <Text style={styles.settingSubtitle}>When connected to internet</Text>
              </View>
            </View>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: '#d1d5db', true: '#86efac' }}
              thumbColor={autoSync ? '#059669' : '#9ca3af'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={handleSync}>
            <View style={styles.settingLeft}>
              <Database size={20} color="#3b82f6" />
              <View>
                <Text style={styles.settingTitle}>Sync Now</Text>
                <Text style={styles.settingSubtitle}>Last sync: {userProfile.lastSync}</Text>
              </View>
            </View>
            {offlineData.pendingSync > 0 && (
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingText}>{offlineData.pendingSync}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleBackup}>
            <View style={styles.settingLeft}>
              <Download size={20} color="#7c3aed" />
              <View>
                <Text style={styles.settingTitle}>Backup Data</Text>
                <Text style={styles.settingSubtitle}>Last backup: {offlineData.lastBackup}</Text>
              </View>
            </View>
            <CheckCircle2 size={20} color="#059669" />
          </TouchableOpacity>
        </View>

        {/* Account Security */}
        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Account & Security</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Shield size={20} color="#dc2626" />
              <View>
                <Text style={styles.settingTitle}>Change Password</Text>
                <Text style={styles.settingSubtitle}>Update your login password</Text>
              </View>
            </View>
            <Text style={styles.settingAction}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Settings size={20} color="#6b7280" />
              <View>
                <Text style={styles.settingTitle}>Privacy Settings</Text>
                <Text style={styles.settingSubtitle}>Manage data sharing</Text>
              </View>
            </View>
            <Text style={styles.settingAction}>Manage</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Health Data Collection System</Text>
          <Text style={styles.versionNumber}>Version 1.2.5</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  profileRole: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
    marginTop: 2,
  },
  profileId: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
  },
  profileDetails: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#4b5563',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  settingsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  settingAction: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  pendingBadge: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  pendingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
  },
  versionInfo: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  versionNumber: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
});