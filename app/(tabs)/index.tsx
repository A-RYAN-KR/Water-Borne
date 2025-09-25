import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import {
  FileText,
  Droplets,
  Bell,
  BookOpen,
  BarChart3,
  Wifi,
  WifiOff,
  Globe,
} from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker'; // ✅ new import

// i18n translations
const translations = {
  en: {
    greeting: 'Good Morning',
    role: 'ASHA Worker - Rajesh Kumar',
    casesReported: 'Cases Reported Today',
    outbreaks: 'Outbreaks',
    waterAlerts: 'Water Alerts',
    pendingSync: 'Pending Sync',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    actions: {
      reportPatient: 'Report Patient',
      waterQuality: 'Water Quality',
      viewAlerts: 'View Alerts',
      education: 'Education',
      reports: 'Reports',
      community: 'Community',
    },
  },
  hi: {
    greeting: 'सुप्रभात',
    role: 'आशा कार्यकर्ता - राजेश कुमार',
    casesReported: 'आज रिपोर्ट किए गए केस',
    outbreaks: 'प्रकोप',
    waterAlerts: 'जल अलर्ट',
    pendingSync: 'लंबित सिंक',
    quickActions: 'त्वरित क्रियाएँ',
    recentActivity: 'हाल की गतिविधियाँ',
    actions: {
      reportPatient: 'मरीज रिपोर्ट करें',
      waterQuality: 'पानी की गुणवत्ता',
      viewAlerts: 'अलर्ट देखें',
      education: 'शिक्षा',
      reports: 'रिपोर्ट',
      community: 'समुदाय',
    },
  },
  as: {
    greeting: 'শুভ প্ৰভাত',
    role: 'ASHA কৰ্মচাৰী - ৰাজেশ কুমাৰ',
    casesReported: 'আজিৰ ৰিপৰ্ট কৰা কেইছ',
    outbreaks: 'উৎপত্তি',
    waterAlerts: 'জল সতর্কতা',
    pendingSync: 'অপেক্ষমাণ ছিঙ্ক',
    quickActions: 'দ্রুত কাৰ্য',
    recentActivity: 'সাম্প্রতিক কাৰ্যকলাপ',
    actions: {
      reportPatient: 'ৰোগী ৰিপৰ্ট কৰক',
      waterQuality: 'পানীৰ গুণমান',
      viewAlerts: 'সতৰ্কতা চাওক',
      education: 'শিক্ষা',
      reports: 'ৰিপৰ্ট',
      community: 'সমাজ',
    },
  },
  mizo: {
    greeting: 'Good Morning',
    role: 'ASHA Worker - Rajesh Kumar',
    casesReported: 'Cases Reported Today',
    outbreaks: 'Outbreaks',
    waterAlerts: 'Water Alerts',
    pendingSync: 'Pending Sync',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    actions: {
      reportPatient: 'Report Patient',
      waterQuality: 'Water Quality',
      viewAlerts: 'View Alerts',
      education: 'Education',
      reports: 'Reports',
      community: 'Community',
    },
  },
};

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<
    'en' | 'hi' | 'as' | 'mizo'
  >('en');

  const t = translations[currentLanguage];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{t.greeting}</Text>
            <Text style={styles.role}>{t.role}</Text>
          </View>

          {/* Language Dropdown */}
          <View style={styles.pickerWrapper}>
            <Globe size={20} color="#6b7280" style={{ marginRight: 8 }} />
            <Picker
              selectedValue={currentLanguage}
              onValueChange={(value) => setCurrentLanguage(value)}
              style={styles.picker}
              dropdownIconColor="#6b7280"
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="हिंदी" value="hi" />
              <Picker.Item label="অসমীয়া" value="as" />
              <Picker.Item label="Mizo" value="mizo" />
            </Picker>
          </View>

          {/* Online Status */}
          <View style={[styles.statusIndicator, isOnline && styles.online]}>
            {isOnline ? (
              <Wifi size={20} color="#059669" />
            ) : (
              <WifiOff size={20} color="#dc2626" />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#1f2937' },
  role: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  statusIndicator: { padding: 8, borderRadius: 20, backgroundColor: 'white' },
  online: { backgroundColor: '#d1fae5' },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  picker: {
    width: 120,
    height: 40,
    color: '#6b7280',
  },
});
