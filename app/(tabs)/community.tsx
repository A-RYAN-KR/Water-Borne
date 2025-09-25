import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput,
  Alert 
} from 'react-native';
import { 
  Users, 
  FileText, 
  Camera, 
  Mic, 
  Send, 
  MapPin, 
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Plus
} from 'lucide-react-native';

interface CommunityReport {
  id: string;
  type: 'illness' | 'water' | 'sanitation' | 'other';
  title: string;
  description: string;
  reporterName: string;
  reporterPhone: string;
  location: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved';
  hasAttachment: boolean;
}

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('report'); // 'report' or 'history'
  const [reportType, setReportType] = useState('illness');
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    reporterName: '',
    reporterPhone: '',
    location: '',
    issue: '',
    description: '',
    attachments: []
  });

  const [communityReports] = useState<CommunityReport[]>([
    {
      id: '1',
      type: 'illness',
      title: 'Multiple fever cases in my family',
      description: 'My 3 children and husband all have fever since yesterday. Other families in our street also reporting similar symptoms.',
      reporterName: 'Sita Devi',
      reporterPhone: '+91 9876543210',
      location: 'Lane 5, Ward 3',
      timestamp: '2 hours ago',
      status: 'pending',
      hasAttachment: false
    },
    {
      id: '2',
      type: 'water',
      title: 'Hand pump water tastes bad',
      description: 'The community hand pump water has a bad smell and taste since morning. Neighbors are also complaining.',
      reporterName: 'Ram Kumar',
      reporterPhone: '+91 9876543211',
      location: 'Community Well, Sector 2',
      timestamp: '4 hours ago',
      status: 'reviewed',
      hasAttachment: true
    },
    {
      id: '3',
      type: 'sanitation',
      title: 'Overflowing drainage',
      description: 'Main drain is blocked and overflowing near school. Bad smell and mosquito breeding.',
      reporterName: 'Pooja Sharma',
      reporterPhone: '+91 9876543212',
      location: 'Government School Road',
      timestamp: '1 day ago',
      status: 'resolved',
      hasAttachment: false
    }
  ]);

  const reportTypes = [
    { 
      key: 'illness', 
      label: 'Illness/Disease', 
      icon: AlertCircle, 
      color: '#dc2626',
      bgColor: '#fee2e2' 
    },
    { 
      key: 'water', 
      label: 'Water Quality', 
      icon: Users, 
      color: '#0891b2',
      bgColor: '#cffafe' 
    },
    { 
      key: 'sanitation', 
      label: 'Sanitation', 
      icon: FileText, 
      color: '#059669',
      bgColor: '#d1fae5' 
    },
    { 
      key: 'other', 
      label: 'Other Health Issue', 
      icon: Plus, 
      color: '#7c3aed',
      bgColor: '#e9d5ff' 
    }
  ];

  const handleVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      Alert.alert('Voice Recording', 'Voice message recorded successfully!');
    }, 2000);
  };

  const handlePhotoUpload = () => {
    Alert.alert(
      'Add Photo',
      'Choose photo source',
      [
        { text: 'Camera', onPress: () => Alert.alert('Camera', 'Taking photo...') },
        { text: 'Gallery', onPress: () => Alert.alert('Gallery', 'Selecting from gallery...') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSubmitReport = () => {
    if (!formData.reporterName || !formData.issue || !formData.description) {
      Alert.alert('Incomplete Form', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert(
      'Report Submitted',
      'Thank you! Your community report has been submitted. Our health team will review it soon.',
      [{ text: 'OK' }]
    );
    
    // Reset form
    setFormData({
      reporterName: '',
      reporterPhone: '',
      location: '',
      issue: '',
      description: '',
      attachments: []
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#d97706';
      case 'reviewed': return '#3b82f6';
      case 'resolved': return '#059669';
      default: return '#6b7280';
    }
  };

  const getTypeColor = (type: string) => {
    const typeObj = reportTypes.find(t => t.key === type);
    return typeObj ? typeObj.color : '#6b7280';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Community Reporting</Text>
          <Text style={styles.subtitle}>
            Report health and sanitation issues in your community
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'report' && styles.activeTab]}
            onPress={() => setActiveTab('report')}
          >
            <FileText size={18} color={activeTab === 'report' ? '#3b82f6' : '#6b7280'} />
            <Text style={[styles.tabText, activeTab === 'report' && styles.activeTabText]}>
              Submit Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <Clock size={18} color={activeTab === 'history' ? '#3b82f6' : '#6b7280'} />
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
              Recent Reports
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'report' ? (
          <View style={styles.reportForm}>
            {/* Report Type Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What would you like to report?</Text>
              <View style={styles.typeGrid}>
                {reportTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <TouchableOpacity
                      key={type.key}
                      style={[
                        styles.typeCard,
                        { backgroundColor: type.bgColor },
                        reportType === type.key && styles.selectedTypeCard
                      ]}
                      onPress={() => setReportType(type.key)}
                    >
                      <View style={[styles.typeIcon, { backgroundColor: type.color }]}>
                        <IconComponent size={20} color="white" />
                      </View>
                      <Text style={[styles.typeLabel, { color: type.color }]}>
                        {type.label}
                      </Text>
                      {reportType === type.key && (
                        <CheckCircle size={16} color={type.color} style={styles.typeCheck} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Reporter Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Information</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Your Name *</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.reporterName}
                  onChangeText={(text) => setFormData({...formData, reporterName: text})}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number (Optional)</Text>
                <View style={styles.inputWithIcon}>
                  <Phone size={18} color="#6b7280" />
                  <TextInput
                    style={[styles.textInput, { paddingLeft: 40 }]}
                    value={formData.reporterPhone}
                    onChangeText={(text) => setFormData({...formData, reporterPhone: text})}
                    placeholder="Your mobile number"
                    keyboardType="phone-pad"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Location *</Text>
                <View style={styles.inputWithIcon}>
                  <MapPin size={18} color="#6b7280" />
                  <TextInput
                    style={[styles.textInput, { paddingLeft: 40 }]}
                    value={formData.location}
                    onChangeText={(text) => setFormData({...formData, location: text})}
                    placeholder="Where is this issue occurring?"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            </View>

            {/* Issue Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Issue Details</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Brief Summary *</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.issue}
                  onChangeText={(text) => setFormData({...formData, issue: text})}
                  placeholder="Brief description of the issue"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Detailed Description *</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={formData.description}
                    onChangeText={(text) => setFormData({...formData, description: text})}
                    placeholder="Please provide as much detail as possible about the issue, when it started, how many people are affected, etc."
                    multiline
                    numberOfLines={5}
                    placeholderTextColor="#9ca3af"
                  />
                  <TouchableOpacity 
                    style={[styles.voiceButton, isRecording && styles.recordingButton]}
                    onPress={handleVoiceInput}
                  >
                    <Mic size={18} color={isRecording ? "#dc2626" : "#6b7280"} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Attachment Options */}
              <View style={styles.attachmentSection}>
                <Text style={styles.label}>Add Photos or Voice Message (Optional)</Text>
                <View style={styles.attachmentButtons}>
                  <TouchableOpacity style={styles.attachmentButton} onPress={handlePhotoUpload}>
                    <Camera size={20} color="#3b82f6" />
                    <Text style={styles.attachmentText}>Take Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.attachmentButton} onPress={handlePhotoUpload}>
                    <ImageIcon size={20} color="#3b82f6" />
                    <Text style={styles.attachmentText}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.attachmentButton, isRecording && styles.recordingAttachment]} 
                    onPress={handleVoiceInput}
                  >
                    <Mic size={20} color={isRecording ? "#dc2626" : "#3b82f6"} />
                    <Text style={[
                      styles.attachmentText,
                      { color: isRecording ? "#dc2626" : "#3b82f6" }
                    ]}>
                      {isRecording ? 'Recording...' : 'Voice Note'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
              <Send size={20} color="white" />
              <Text style={styles.submitButtonText}>Submit Community Report</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Recent Reports History */
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Recent Community Reports</Text>
            {communityReports.map((report) => (
              <View key={report.id} style={styles.reportCard}>
                <View style={styles.reportHeader}>
                  <View style={[
                    styles.reportTypeBadge,
                    { backgroundColor: getTypeColor(report.type) }
                  ]}>
                    <Text style={styles.reportTypeText}>{report.type.toUpperCase()}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(report.status) }
                  ]}>
                    <Text style={styles.statusText}>{report.status.toUpperCase()}</Text>
                  </View>
                </View>
                
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDescription}>{report.description}</Text>
                
                <View style={styles.reportMeta}>
                  <Text style={styles.reporterInfo}>
                    Reported by: {report.reporterName}
                  </Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <MapPin size={12} color="#6b7280" />
                      <Text style={styles.metaText}>{report.location}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={12} color="#6b7280" />
                      <Text style={styles.metaText}>{report.timestamp}</Text>
                    </View>
                  </View>
                  {report.hasAttachment && (
                    <View style={styles.attachmentIndicator}>
                      <Camera size={12} color="#6b7280" />
                      <Text style={styles.attachmentIndicatorText}>Has attachments</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Help Section */}
        <View style={styles.helpSection}>
          <View style={styles.helpCard}>
            <Users size={24} color="#3b82f6" />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Need Help?</Text>
              <Text style={styles.helpText}>
                For emergencies, call your local health center. For non-urgent issues, use this form.
              </Text>
              <Text style={styles.helpNumber}>Emergency: 108 | Health Center: 1075</Text>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#f0f9ff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#3b82f6',
  },
  reportForm: {
    marginBottom: 32,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    minWidth: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
  },
  selectedTypeCard: {
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  typeCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    color: '#1f2937',
  },
  inputWithIcon: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputContainer: {
    position: 'relative',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  voiceButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  recordingButton: {
    backgroundColor: '#fee2e2',
  },
  attachmentSection: {
    marginTop: 16,
  },
  attachmentButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  attachmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    gap: 6,
  },
  recordingAttachment: {
    backgroundColor: '#fee2e2',
  },
  attachmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3b82f6',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  historySection: {
    marginBottom: 32,
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reportTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reportTypeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  reportDescription: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 12,
  },
  reportMeta: {
    gap: 6,
  },
  reporterInfo: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  attachmentIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  attachmentIndicatorText: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  helpSection: {
    marginBottom: 32,
  },
  helpCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  helpText: {
    fontSize: 14,
    color: '#3730a3',
    lineHeight: 20,
    marginBottom: 8,
  },
  helpNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
});