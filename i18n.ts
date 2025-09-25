import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

const resources = {
  en: {
    translation: {
      greeting: 'Good Morning',
      role: 'ASHA Worker - Rajesh Kumar',
      casesReported: 'Cases Reported Today',
      outbreaks: 'Outbreaks',
      waterAlerts: 'Water Alerts',
      pendingSync: 'Pending Sync',
      quickActions: 'Quick Actions',
      recentActivity: 'Recent Activity',
      reportPatient: 'Report Patient',
      waterQuality: 'Water Quality',
      viewAlerts: 'View Alerts',
      education: 'Education',
      reports: 'Reports',
      community: 'Community',
      synced: 'Patient data synced',
      waterAlertMsg: 'Water quality alert - Village Pond',
      newEduContent: 'New educational content available',
    },
  },
  hi: {
    translation: {
      greeting: 'सुप्रभात',
      role: 'आशा कार्यकर्ता - राजेश कुमार',
      casesReported: 'आज रिपोर्ट किए गए मामले',
      outbreaks: 'प्रकोप',
      waterAlerts: 'पानी चेतावनी',
      pendingSync: 'लंबित सिंक',
      quickActions: 'त्वरित कार्य',
      recentActivity: 'हाल की गतिविधि',
      reportPatient: 'मरीज रिपोर्ट करें',
      waterQuality: 'पानी की गुणवत्ता',
      viewAlerts: 'चेतावनी देखें',
      education: 'शिक्षा',
      reports: 'रिपोर्ट',
      community: 'समुदाय',
      synced: 'मरीज डेटा सिंक किया गया',
      waterAlertMsg: 'जल गुणवत्ता चेतावनी - गाँव का तालाब',
      newEduContent: 'नया शैक्षिक सामग्री उपलब्ध',
    },
  },
  as: {
    translation: {
      greeting: 'সুপ্ৰভাত',
      role: 'আশা কৰ্মী - ৰাজেশ কুমাৰ',
      casesReported: 'আজি সংবাদ দিয়া ঘটনাসমূহ',
      outbreaks: 'বিস্ফোৰণ',
      waterAlerts: 'জল সতর্কবার্তা',
      pendingSync: 'অপেক্ষাৰত সংমিশ্ৰণ',
      quickActions: 'দ্ৰুত কাৰ্য্য',
      recentActivity: 'শেহতীয়া কাৰ্য্য',
      reportPatient: 'ৰোগীৰ সংবাদ দিয়ক',
      waterQuality: 'জলৰ গুণমান',
      viewAlerts: 'সতৰ্কবার্তা চাওক',
      education: 'শিক্ষা',
      reports: 'প্ৰতিবেদন',
      community: 'সমাজ',
      synced: 'ৰোগীৰ তথ্য সংমিশ্ৰণ কৰা হৈছে',
      waterAlertMsg: 'জল গুণমান সতর্কবার্তা - গাওঁৰ পুখুৰী',
      newEduContent: 'নতুন শিক্ষামূলক বিষয়বস্তু উপলব্ধ',
    },
  },
  lus: {
    // Mizo
    translation: {
      greeting: 'Chibai, Tukchhuah!',
      role: 'ASHA thawktu - Rajesh Kumar',
      casesReported: 'Nimin report an ni tawh',
      outbreaks: 'Thihna awm',
      waterAlerts: 'Tui Thilthleng',
      pendingSync: 'Sync tur a danglam',
      quickActions: 'Thilthleng tur thuhnin',
      recentActivity: 'Thilthleng danglam tak tak',
      reportPatient: 'Damlo thilthleng tur',
      waterQuality: 'Tui thilthleng',
      viewAlerts: 'Thilthleng hre rawh',
      education: 'Zirna',
      reports: 'Report',
      community: 'Khawtlang',
      synced: 'Damlo thu sync a nih tawh',
      waterAlertMsg: 'Tui thilthleng - khua tui in',
      newEduContent: 'Zirlai thar a awm',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0].languageCode, // device default
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
