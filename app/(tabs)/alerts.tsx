import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Bell,
  MessageSquare,
  Share,
  Filter,
  Calendar 
} from 'lucide-react-native';

interface AlertItem {
  id: string;
  type: 'outbreak' | 'water' | 'health' | 'weather';
  severity: 'critical' | 'moderate' | 'low';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
}

export default function AlertsScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: '1',
      type: 'outbreak',
      severity: 'critical',
      title: 'Dengue Outbreak Alert',
      description: 'Cluster of 15 dengue cases reported in the past 48 hours. Immediate vector control measures required.',
      location: 'Village Srirangam, Ward 4',
      timestamp: '2 hours ago',
      isRead: false,
      actionRequired: true
    },
    {
      id: '2',
      type: 'water',
      severity: 'moderate',
      title: 'Water Quality Contamination',
      description: 'Elevated bacterial levels detected in community well. Recommend boiling water before consumption.',
      location: 'Community Well, Sector 2',
      timestamp: '4 hours ago',
      isRead: false,
      actionRequired: true
    },
    {
      id: '3',
      type: 'health',
      severity: 'low',
      title: 'Vaccination Campaign Reminder',
      description: 'Measles vaccination drive scheduled for tomorrow. Ensure all children aged 9-15 months are registered.',
      location: 'Primary Health Center',
      timestamp: '1 day ago',
      isRead: true,
      actionRequired: false
    },
    {
      id: '4',
      type: 'weather',
      severity: 'moderate',
      title: 'Heavy Rainfall Warning',
      description: 'Heavy rainfall expected for next 3 days. Risk of waterlogging and vector breeding sites.',
      location: 'District-wide',
      timestamp: '6 hours ago',
      isRead: false,
      actionRequired: true
    },
    {
      id: '5',
      type: 'outbreak',
      severity: 'low',
      title: 'Seasonal Flu Monitoring',
      description: 'Mild increase in flu-like symptoms reported. Continue routine surveillance.',
      location: 'Multiple locations',
      timestamp: '2 days ago',
      isRead: true,
      actionRequired: false
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'moderate': return '#d97706';
      case 'low': return '#059669';
      default: return '#6b7280';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle;
      case 'moderate': return Info;
      case 'low': return CheckCircle2;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'outbreak': return '#dc2626';
      case 'water': return '#0891b2';
      case 'health': return '#059669';
      case 'weather': return '#7c3aed';
      default: return '#6b7280';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !alert.isRead;
    if (activeFilter === 'action') return alert.actionRequired;
    return alert.severity === activeFilter;
  });

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const handleShare = (alert: AlertItem) => {
    Alert.alert(
      'Share Alert',
      `Share "${alert.title}" via SMS or WhatsApp?`,
      [
        { text: 'SMS', onPress: () => Alert.alert('SMS', 'Sharing via SMS...') },
        { text: 'WhatsApp', onPress: () => Alert.alert('WhatsApp', 'Sharing via WhatsApp...') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const filters = [
    { key: 'all', label: 'All', count: alerts.length },
    { key: 'unread', label: 'Unread', count: alerts.filter(a => !a.isRead).length },
    { key: 'critical', label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length },
    { key: 'action', label: 'Action Required', count: alerts.filter(a => a.actionRequired).length }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Alerts & Notifications</Text>
          <TouchableOpacity style={styles.notificationSettings}>
            <Bell size={20} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                activeFilter === filter.key && styles.activeFilterTab
              ]}
              onPress={() => setActiveFilter(filter.key)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter.key && styles.activeFilterText
              ]}>
                {filter.label}
              </Text>
              <View style={[
                styles.filterBadge,
                { backgroundColor: activeFilter === filter.key ? '#3b82f6' : '#e5e7eb' }
              ]}>
                <Text style={[
                  styles.filterBadgeText,
                  { color: activeFilter === filter.key ? 'white' : '#6b7280' }
                ]}>
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Alert List */}
        <View style={styles.alertsList}>
          {filteredAlerts.map((alert) => {
            const SeverityIcon = getSeverityIcon(alert.severity);
            return (
              <TouchableOpacity
                key={alert.id}
                style={[
                  styles.alertCard,
                  !alert.isRead && styles.unreadAlert,
                  { borderLeftColor: getSeverityColor(alert.severity) }
                ]}
                onPress={() => markAsRead(alert.id)}
              >
                <View style={styles.alertHeader}>
                  <View style={styles.alertIconContainer}>
                    <SeverityIcon 
                      size={20} 
                      color={getSeverityColor(alert.severity)} 
                    />
                    <View style={[
                      styles.severityBadge,
                      { backgroundColor: getSeverityColor(alert.severity) }
                    ]}>
                      <Text style={styles.severityText}>
                        {alert.severity.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.alertActions}>
                    {alert.actionRequired && (
                      <View style={styles.actionBadge}>
                        <Text style={styles.actionBadgeText}>Action Required</Text>
                      </View>
                    )}
                    {!alert.isRead && <View style={styles.unreadDot} />}
                  </View>
                </View>

                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertDescription}>{alert.description}</Text>
                  
                  <View style={styles.alertMeta}>
                    <View style={styles.metaItem}>
                      <MapPin size={14} color="#6b7280" />
                      <Text style={styles.metaText}>{alert.location}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#6b7280" />
                      <Text style={styles.metaText}>{alert.timestamp}</Text>
                    </View>
                  </View>

                  <View style={styles.alertFooter}>
                    <View style={[
                      styles.typeBadge,
                      { backgroundColor: getTypeColor(alert.type) }
                    ]}>
                      <Text style={styles.typeText}>{alert.type.toUpperCase()}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.shareButton}
                      onPress={() => handleShare(alert)}
                    >
                      <Share size={16} color="#6b7280" />
                      <Text style={styles.shareText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredAlerts.length === 0 && (
          <View style={styles.emptyState}>
            <Bell size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No alerts found</Text>
            <Text style={styles.emptyDescription}>
              {activeFilter === 'all' 
                ? 'No alerts to display at this time.' 
                : `No ${activeFilter} alerts found.`}
            </Text>
          </View>
        )}

        {/* SMS Notification Notice */}
        <View style={styles.notificationNotice}>
          <MessageSquare size={20} color="#3b82f6" />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>SMS Notifications Enabled</Text>
            <Text style={styles.noticeText}>
              Critical alerts will also be sent via SMS to your registered number
            </Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  notificationSettings: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterContent: {
    paddingRight: 16,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 12,
    gap: 8,
  },
  activeFilterTab: {
    backgroundColor: '#dbeafe',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeFilterText: {
    color: '#3b82f6',
  },
  filterBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 20,
    alignItems: 'center',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  alertsList: {
    gap: 16,
    marginBottom: 24,
  },
  alertCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
  },
  unreadAlert: {
    backgroundColor: '#f8fafc',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  alertActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actionBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#92400e',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  alertContent: {
    gap: 8,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  alertDescription: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 22,
  },
  alertMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  shareText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7280',
    marginTop: 16,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 250,
  },
  notificationNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
  },
  noticeText: {
    fontSize: 14,
    color: '#3730a3',
    marginTop: 4,
  },
});