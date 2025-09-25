// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      // Header
      greeting: 'Good Morning',
      role: 'ASHA Worker - Rajesh Kumar',
      // Stats
      casesReported: 'Cases Reported Today',
      outbreaks: 'Outbreaks',
      waterAlerts: 'Water Alerts',
      pendingSync: 'Pending Sync',
      // Sections
      quickActions: 'Quick Actions',
      recentActivity: 'Recent Activity',
      // Actions
      actions: {
        reportPatient: 'Report Patient',
        waterQuality: 'Water Quality',
        viewAlerts: 'View Alerts',
        education: 'Education',
        reports: 'Reports',
        community: 'Community',
      },
      // Activity
      activity: {
        synced: 'Patient data synced',
        waterAlertMsg: 'Water quality alert - Village Pond',
        newEduContent: 'New educational content available',
      },
    },
  },
  hi: {
    translation: {
      // Header
      greeting: 'सुप्रभात',
      role: 'आशा कार्यकर्ता - राजेश कुमार',
      // Stats
      casesReported: 'आज रिपोर्ट किए गए मामले',
      outbreaks: 'प्रकोप',
      waterAlerts: 'पानी की चेतावनी',
      pendingSync: 'सिंक के लिए लंबित',
      // Sections
      quickActions: 'त्वरित कार्य',
      recentActivity: 'हाल की गतिविधि',
      // Actions
      actions: {
        reportPatient: 'मरीज की रिपोर्ट करें',
        waterQuality: 'पानी की गुणवत्ता',
        viewAlerts: 'चेतावनी देखें',
        education: 'शिक्षा',
        reports: 'रिपोर्ट',
        community: 'समुदाय',
      },
      // Activity
      activity: {
        synced: 'मरीज का डेटा सिंक किया गया',
        waterAlertMsg: 'पानी की गुणवत्ता चेतावनी - गाँव का तालाब',
        newEduContent: 'नई शैक्षिक सामग्री उपलब्ध है',
      },
    },
  },
  // Add other languages like 'as' and 'lus' here as needed
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0].languageCode,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;