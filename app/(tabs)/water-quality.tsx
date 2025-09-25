import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  TextInput 
} from 'react-native';
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  MapPin,
  WifiOff,
  Calendar,
  TestTube 
} from 'lucide-react-native';

export default function WaterQualityScreen() {
  const [activeTab, setActiveTab] = useState('sensor'); // 'sensor' or 'manual'
  const [isOffline, setIsOffline] = useState(false);
  const [sensorData, setSensorData] = useState({
    ph: 7.2,
    turbidity: 15,
    temperature: 25.4,
    bacterial: 'Safe',
    chlorine: 0.8,
    lastUpdated: '2 mins ago'
  });
  
  const [manualData, setManualData] = useState({
    location: '',
    ph: '',
    turbidity: '',
    chlorine: '',
    coliform: '',
    notes: ''
  });

  const getStatusColor = (parameter: string, value: any) => {
    switch (parameter) {
      case 'ph':
        return value >= 6.5 && value <= 8.5 ? '#059669' : '#dc2626';
      case 'turbidity':
        return value <= 1 ? '#059669' : value <= 4 ? '#d97706' : '#dc2626';
      case 'chlorine':
        return value >= 0.2 && value <= 2.0 ? '#059669' : '#dc2626';
      case 'bacterial':
        return value === 'Safe' ? '#059669' : '#dc2626';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (parameter: string, value: any) => {
    switch (parameter) {
      case 'ph':
        return value >= 6.5 && value <= 8.5 ? 'Normal' : 'Alert';
      case 'turbidity':
        return value <= 1 ? 'Excellent' : value <= 4 ? 'Good' : 'Poor';
      case 'chlorine':
        return value >= 0.2 && value <= 2.0 ? 'Adequate' : 'Low';
      case 'bacterial':
        return value;
      default:
        return 'Unknown';
    }
  };

  const handleRefresh = () => {
    Alert.alert('Refreshing', 'Fetching latest sensor data...');
    // Simulate data refresh
  };

  const handleManualSubmit = () => {
    if (!manualData.location || !manualData.ph) {
      Alert.alert('Incomplete Data', 'Please fill in required fields');
      return;
    }
    Alert.alert('Success', 'Manual test data submitted successfully!');
    setManualData({
      location: '',
      ph: '',
      turbidity: '',
      chlorine: '',
      coliform: '',
      notes: ''
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Water Quality Monitor</Text>
          <View style={styles.statusBar}>
            {isOffline && (
              <View style={styles.offlineIndicator}>
                <WifiOff size={16} color="#dc2626" />
                <Text style={styles.offlineText}>Offline Mode</Text>
              </View>
            )}
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
              <RefreshCw size={16} color="#3b82f6" />
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'sensor' && styles.activeTab]}
            onPress={() => setActiveTab('sensor')}
          >
            <Activity size={18} color={activeTab === 'sensor' ? '#3b82f6' : '#6b7280'} />
            <Text style={[styles.tabText, activeTab === 'sensor' && styles.activeTabText]}>
              IoT Sensor Data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'manual' && styles.activeTab]}
            onPress={() => setActiveTab('manual')}
          >
            <TestTube size={18} color={activeTab === 'manual' ? '#3b82f6' : '#6b7280'} />
            <Text style={[styles.tabText, activeTab === 'manual' && styles.activeTabText]}>
              Manual Testing
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'sensor' ? (
          <>
            {/* Overall Status Alert */}
            <View style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <AlertTriangle size={20} color="#d97706" />
                <Text style={styles.alertTitle}>Water Quality Alert</Text>
              </View>
              <Text style={styles.alertText}>
                Turbidity levels are elevated at Village Pond. Recommend boiling water before consumption.
              </Text>
              <View style={styles.alertMeta}>
                <MapPin size={14} color="#6b7280" />
                <Text style={styles.alertLocation}>Village Pond, Sector 4</Text>
              </View>
            </View>

            {/* Sensor Data Cards */}
            <View style={styles.parametersGrid}>
              {/* pH Level */}
              <View style={styles.parameterCard}>
                <View style={styles.parameterHeader}>
                  <Droplets size={20} color="#3b82f6" />
                  <Text style={styles.parameterTitle}>pH Level</Text>
                </View>
                <Text style={styles.parameterValue}>{sensorData.ph}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor('ph', sensorData.ph) }]}>
                  <Text style={styles.statusText}>{getStatusText('ph', sensorData.ph)}</Text>
                </View>
                <Text style={styles.parameterRange}>Normal: 6.5 - 8.5</Text>
              </View>

              {/* Turbidity */}
              <View style={styles.parameterCard}>
                <View style={styles.parameterHeader}>
                  <Activity size={20} color="#059669" />
                  <Text style={styles.parameterTitle}>Turbidity</Text>
                </View>
                <Text style={styles.parameterValue}>{sensorData.turbidity} NTU</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor('turbidity', sensorData.turbidity) }]}>
                  <Text style={styles.statusText}>{getStatusText('turbidity', sensorData.turbidity)}</Text>
                </View>
                <Text style={styles.parameterRange}>Excellent: ≤1 NTU</Text>
              </View>

              {/* Temperature */}
              <View style={styles.parameterCard}>
                <View style={styles.parameterHeader}>
                  <Thermometer size={20} color="#dc2626" />
                  <Text style={styles.parameterTitle}>Temperature</Text>
                </View>
                <Text style={styles.parameterValue}>{sensorData.temperature}°C</Text>
                <View style={[styles.statusBadge, { backgroundColor: '#059669' }]}>
                  <Text style={styles.statusText}>Normal</Text>
                </View>
                <Text style={styles.parameterRange}>Ambient temp</Text>
              </View>

              {/* Bacterial Content */}
              <View style={styles.parameterCard}>
                <View style={styles.parameterHeader}>
                  <CheckCircle size={20} color="#059669" />
                  <Text style={styles.parameterTitle}>Bacterial</Text>
                </View>
                <Text style={styles.parameterValue}>{sensorData.bacterial}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor('bacterial', sensorData.bacterial) }]}>
                  <Text style={styles.statusText}>{getStatusText('bacterial', sensorData.bacterial)}</Text>
                </View>
                <Text style={styles.parameterRange}>No harmful bacteria</Text>
              </View>

              {/* Chlorine */}
              <View style={styles.parameterCard}>
                <View style={styles.parameterHeader}>
                  <TestTube size={20} color="#7c3aed" />
                  <Text style={styles.parameterTitle}>Chlorine</Text>
                </View>
                <Text style={styles.parameterValue}>{sensorData.chlorine} mg/L</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor('chlorine', sensorData.chlorine) }]}>
                  <Text style={styles.statusText}>{getStatusText('chlorine', sensorData.chlorine)}</Text>
                </View>
                <Text style={styles.parameterRange}>Safe: 0.2-2.0 mg/L</Text>
              </View>
            </View>

            {/* Last Updated */}
            <View style={styles.updateInfo}>
              <Calendar size={16} color="#6b7280" />
              <Text style={styles.updateText}>Last updated: {sensorData.lastUpdated}</Text>
            </View>
          </>
        ) : (
          /* Manual Testing Form */
          <View style={styles.manualForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Testing Location *</Text>
              <TextInput
                style={styles.textInput}
                value={manualData.location}
                onChangeText={(text) => setManualData({...manualData, location: text})}
                placeholder="Enter water source location"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>pH Level *</Text>
                <TextInput
                  style={styles.textInput}
                  value={manualData.ph}
                  onChangeText={(text) => setManualData({...manualData, ph: text})}
                  placeholder="7.0"
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Turbidity (NTU)</Text>
                <TextInput
                  style={styles.textInput}
                  value={manualData.turbidity}
                  onChangeText={(text) => setManualData({...manualData, turbidity: text})}
                  placeholder="5.0"
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Chlorine (mg/L)</Text>
                <TextInput
                  style={styles.textInput}
                  value={manualData.chlorine}
                  onChangeText={(text) => setManualData({...manualData, chlorine: text})}
                  placeholder="0.5"
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Coliform</Text>
                <TextInput
                  style={styles.textInput}
                  value={manualData.coliform}
                  onChangeText={(text) => setManualData({...manualData, coliform: text})}
                  placeholder="Absent/Present"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Additional Notes</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={manualData.notes}
                onChangeText={(text) => setManualData({...manualData, notes: text})}
                placeholder="Any observations about water color, smell, or other factors"
                multiline
                numberOfLines={4}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleManualSubmit}>
              <TestTube size={20} color="white" />
              <Text style={styles.submitButtonText}>Submit Test Results</Text>
            </TouchableOpacity>
          </View>
        )}
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
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  refreshText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
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
  alertCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#d97706',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
  },
  alertText: {
    fontSize: 16,
    color: '#92400e',
    lineHeight: 22,
    marginBottom: 12,
  },
  alertMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  alertLocation: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  parametersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  parameterCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flex: 1,
    minWidth: '47%',
    maxWidth: '48%',
  },
  parameterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  parameterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  parameterValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  parameterRange: {
    fontSize: 12,
    color: '#6b7280',
  },
  updateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 12,
  },
  updateText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  manualForm: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  inputHalf: {
    flex: 1,
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
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0891b2',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});