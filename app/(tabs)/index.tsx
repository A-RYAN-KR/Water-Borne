import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { FileText, Droplets, Bell, BookOpen, BarChart3, Wifi, WifiOff, Globe } from 'lucide-react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const stats = {
    casesReported: 12,
    outbreaksDetected: 2,
    waterAlerts: 1,
    pendingSync: 5
  };

  const quickActions = [
    { 
      title: 'Report Patient', 
      icon: FileText, 
      route: '/patient-form',
      color: '#3b82f6',
      bgColor: '#dbeafe' 
    },
    { 
      title: 'Water Quality', 
      icon: Droplets, 
      route: '/water-quality',
      color: '#0891b2',
      bgColor: '#cffafe' 
    },
    { 
      title: 'View Alerts', 
      icon: Bell, 
      route: '/alerts',
      color: '#dc2626',
      bgColor: '#fee2e2' 
    },
    { 
      title: 'Education', 
      icon: BookOpen, 
      route: '/education',
      color: '#059669',
      bgColor: '#d1fae5' 
    },
    { 
      title: 'Reports', 
      icon: BarChart3, 
      route: '/reports',
      color: '#7c3aed',
      bgColor: '#e9d5ff' 
    },
    { 
      title: 'Community', 
      icon: FileText, 
      route: '/community',
      color: '#ea580c',
      bgColor: '#fed7aa' 
    },
  ];

  const handleLanguageSwitch = () => {
    const languages = ['English', 'Hindi', 'Bengali', 'Tamil'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLanguage(languages[nextIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.role}>ASHA Worker - Rajesh Kumar</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.languageButton}
              onPress={handleLanguageSwitch}
            >
              <Globe size={20} color="#6b7280" />
              <Text style={styles.languageText}>{currentLanguage}</Text>
            </TouchableOpacity>
            <View style={[styles.statusIndicator, isOnline && styles.online]}>
              {isOnline ? <Wifi size={20} color="#059669" /> : <WifiOff size={20} color="#dc2626" />}
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.primaryStat]}>
            <Text style={styles.statNumber}>{stats.casesReported}</Text>
            <Text style={styles.statLabel}>Cases Reported Today</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.secondaryStat]}>
              <Text style={[styles.statNumber, styles.warningText]}>{stats.outbreaksDetected}</Text>
              <Text style={styles.statLabel}>Outbreaks</Text>
            </View>
            <View style={[styles.statCard, styles.secondaryStat]}>
              <Text style={[styles.statNumber, styles.dangerText]}>{stats.waterAlerts}</Text>
              <Text style={styles.statLabel}>Water Alerts</Text>
            </View>
          </View>
          {!isOnline && (
            <View style={[styles.statCard, styles.offlineStat]}>
              <Text style={[styles.statNumber, styles.offlineText]}>{stats.pendingSync}</Text>
              <Text style={styles.statLabel}>Pending Sync</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.actionCard, { backgroundColor: action.bgColor }]}
                  onPress={() => router.push(action.route)}
                >
                  <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                    <IconComponent size={24} color="white" />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#059669' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Patient data synced</Text>
                <Text style={styles.activityTime}>2 minutes ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#dc2626' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Water quality alert - Village Pond</Text>
                <Text style={styles.activityTime}>1 hour ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#3b82f6' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New educational content available</Text>
                <Text style={styles.activityTime}>3 hours ago</Text>
              </View>
            </View>
          </View>
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
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  role: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  languageText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  statusIndicator: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  online: {
    backgroundColor: '#d1fae5',
  },
  statsContainer: {
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  primaryStat: {
    alignItems: 'center',
  },
  secondaryStat: {
    flex: 1,
    alignItems: 'center',
  },
  offlineStat: {
    backgroundColor: '#fef3c7',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  warningText: {
    color: '#d97706',
  },
  dangerText: {
    color: '#dc2626',
  },
  offlineText: {
    color: '#92400e',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
});