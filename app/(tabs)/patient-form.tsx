import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  Platform 
} from 'react-native';
import { 
  Save, 
  Mic, 
  MapPin, 
  WifiOff, 
  CheckCircle2, 
  User,
  Calendar,
  Thermometer,
  Stethoscope 
} from 'lucide-react-native';

export default function PatientFormScreen() {
  const [isOffline, setIsOffline] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contactNumber: '',
    address: '',
    symptoms: '',
    diagnosis: '',
    temperature: '',
    bloodPressure: '',
    additionalNotes: ''
  });

  const handleSave = () => {
    if (!formData.name || !formData.age || !formData.symptoms) {
      Alert.alert('Incomplete Form', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Form Saved',
      isOffline ? 'Form saved locally. Will sync when online.' : 'Form submitted successfully!',
      [{ text: 'OK' }]
    );
  };

  const handleVoiceInput = (field: string) => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      Alert.alert('Voice Input', `Voice recorded for ${field}. Feature coming soon!`);
    }, 2000);
  };

  const symptoms = [
    'Fever', 'Cough', 'Diarrhea', 'Vomiting', 'Headache', 
    'Body Ache', 'Skin Rash', 'Difficulty Breathing', 'Other'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Patient Data Form</Text>
          <View style={styles.statusBar}>
            {isOffline && (
              <View style={styles.offlineIndicator}>
                <WifiOff size={16} color="#dc2626" />
                <Text style={styles.offlineText}>Offline Mode</Text>
              </View>
            )}
            <View style={styles.locationIndicator}>
              <MapPin size={16} color="#059669" />
              <Text style={styles.locationText}>Location: Auto-detected</Text>
            </View>
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Basic Information</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Patient Name *</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                placeholder="Enter patient's full name"
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity 
                style={styles.voiceButton}
                onPress={() => handleVoiceInput('name')}
              >
                <Mic size={18} color={isRecording ? "#dc2626" : "#6b7280"} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Age *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.age}
                onChangeText={(text) => setFormData({...formData, age: text})}
                placeholder="Age"
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Gender *</Text>
              <View style={styles.genderContainer}>
                {['Male', 'Female', 'Other'].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.genderButton,
                      formData.gender === gender && styles.genderButtonActive
                    ]}
                    onPress={() => setFormData({...formData, gender})}
                  >
                    <Text style={[
                      styles.genderButtonText,
                      formData.gender === gender && styles.genderButtonTextActive
                    ]}>
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.textInput}
              value={formData.contactNumber}
              onChangeText={(text) => setFormData({...formData, contactNumber: text})}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={formData.address}
                onChangeText={(text) => setFormData({...formData, address: text})}
                placeholder="Enter complete address"
                multiline
                numberOfLines={3}
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity 
                style={styles.voiceButton}
                onPress={() => handleVoiceInput('address')}
              >
                <Mic size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Medical Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Stethoscope size={20} color="#059669" />
            <Text style={styles.sectionTitle}>Medical Information</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Symptoms *</Text>
            <View style={styles.symptomsContainer}>
              {symptoms.map((symptom, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.symptomTag,
                    formData.symptoms.includes(symptom) && styles.symptomTagActive
                  ]}
                  onPress={() => {
                    const currentSymptoms = formData.symptoms.split(', ').filter(s => s);
                    if (currentSymptoms.includes(symptom)) {
                      const updated = currentSymptoms.filter(s => s !== symptom);
                      setFormData({...formData, symptoms: updated.join(', ')});
                    } else {
                      const updated = [...currentSymptoms, symptom];
                      setFormData({...formData, symptoms: updated.join(', ')});
                    }
                  }}
                >
                  <Text style={[
                    styles.symptomTagText,
                    formData.symptoms.includes(symptom) && styles.symptomTagTextActive
                  ]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Temperature (°F)</Text>
              <View style={styles.inputWithIcon}>
                <Thermometer size={18} color="#6b7280" />
                <TextInput
                  style={[styles.textInput, { paddingLeft: 40 }]}
                  value={formData.temperature}
                  onChangeText={(text) => setFormData({...formData, temperature: text})}
                  placeholder="98.6"
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Blood Pressure</Text>
              <TextInput
                style={styles.textInput}
                value={formData.bloodPressure}
                onChangeText={(text) => setFormData({...formData, bloodPressure: text})}
                placeholder="120/80"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Diagnosis</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={formData.diagnosis}
                onChangeText={(text) => setFormData({...formData, diagnosis: text})}
                placeholder="Enter diagnosis or suspected condition"
                multiline
                numberOfLines={3}
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity 
                style={styles.voiceButton}
                onPress={() => handleVoiceInput('diagnosis')}
              >
                <Mic size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Additional Notes</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.additionalNotes}
              onChangeText={(text) => setFormData({...formData, additionalNotes: text})}
              placeholder="Any additional observations or notes"
              multiline
              numberOfLines={4}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Save size={20} color="white" />
          <Text style={styles.submitButtonText}>
            {isOffline ? 'Save Locally' : 'Submit & Sync'}
          </Text>
        </TouchableOpacity>
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
    marginBottom: 12,
  },
  statusBar: {
    flexDirection: 'row',
    gap: 16,
  },
  offlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  offlineText: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: '500',
  },
  locationIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
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
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    position: 'relative',
    justifyContent: 'center',
  },
  voiceButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#3b82f6',
  },
  genderButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  genderButtonTextActive: {
    color: 'white',
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  symptomTagActive: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  symptomTagText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  symptomTagTextActive: {
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
    marginBottom: 32,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});