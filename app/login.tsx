import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView 
} from 'react-native';
import { User, Lock, Eye, EyeOff, Shield, Globe, Smartphone, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('asha');
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { 
      key: 'asha', 
      label: 'ASHA Worker', 
      description: 'Community Health Worker',
      color: '#059669',
      bgColor: '#d1fae5' 
    },
    { 
      key: 'clinic', 
      label: 'Clinic Staff', 
      description: 'Medical Professional',
      color: '#3b82f6',
      bgColor: '#dbeafe' 
    },
    { 
      key: 'official', 
      label: 'Health Official', 
      description: 'Government Health Officer',
      color: '#7c3aed',
      bgColor: '#e9d5ff' 
    }
  ];

  const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi'];

  const handleLogin = async () => {
    if (!userId.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both User ID and Password');
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, accept any credentials
      if (userId && password) {
        Alert.alert(
          'Login Successful', 
          `Welcome ${selectedRole === 'asha' ? 'ASHA Worker' : selectedRole === 'clinic' ? 'Clinic Staff' : 'Health Official'}!`,
          [
            { 
              text: 'Continue', 
              onPress: () => router.replace('/(tabs)') 
            }
          ]
        );
      } else {
        Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password recovery SMS will be sent to your registered mobile number.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send SMS', onPress: () => Alert.alert('SMS Sent', 'Recovery instructions sent to your mobile.') }
      ]
    );
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      languages.map(lang => ({
        text: lang,
        onPress: () => setCurrentLanguage(lang)
      }))
    );
  };

  const handleOfflineLogin = () => {
    Alert.alert(
      'Offline Mode',
      'Continue with previously synced data? Limited functionality will be available.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue Offline', onPress: () => router.replace('/(tabs)') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.languageSelector}>
              <TouchableOpacity 
                style={styles.languageButton} 
                onPress={handleLanguageChange}
              >
                <Globe size={16} color="#3b82f6" />
                <Text style={styles.languageText}>{currentLanguage}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.appIcon}>
              <Shield size={40} color="white" />
            </View>
            
            <Text style={styles.appTitle}>Health Data Collection</Text>
            <Text style={styles.appSubtitle}>Outbreak Management System</Text>
          </View>

          {/* Role Selection */}
          <View style={styles.roleSection}>
            <Text style={styles.sectionTitle}>Select Your Role</Text>
            <View style={styles.rolesGrid}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.key}
                  style={[
                    styles.roleCard,
                    { backgroundColor: role.bgColor },
                    selectedRole === role.key && styles.selectedRole
                  ]}
                  onPress={() => setSelectedRole(role.key)}
                >
                  <View style={[styles.roleIcon, { backgroundColor: role.color }]}>
                    <User size={20} color="white" />
                  </View>
                  <Text style={[styles.roleLabel, { color: role.color }]}>
                    {role.label}
                  </Text>
                  <Text style={styles.roleDescription}>{role.description}</Text>
                  {selectedRole === role.key && (
                    <CheckCircle2 size={16} color={role.color} style={styles.roleCheck} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Login Form */}
          <View style={styles.loginForm}>
            <Text style={styles.sectionTitle}>Login Credentials</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>User ID / Employee ID</Text>
              <View style={styles.inputContainer}>
                <User size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={userId}
                  onChangeText={setUserId}
                  placeholder="Enter your ID (e.g., ASHA001234)"
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <Lock size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { paddingRight: 50 }]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <Eye size={20} color="#6b7280" /> : 
                    <EyeOff size={20} color="#6b7280" />
                  }
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Offline Login */}
            <TouchableOpacity style={styles.offlineButton} onPress={handleOfflineLogin}>
              <Smartphone size={16} color="#6b7280" />
              <Text style={styles.offlineButtonText}>Continue Offline</Text>
            </TouchableOpacity>
          </View>

          {/* Security Notice */}
          <View style={styles.securityNotice}>
            <AlertCircle size={16} color="#3b82f6" />
            <Text style={styles.securityText}>
              Your data is encrypted and secure. Login attempts are logged for security.
            </Text>
          </View>

          {/* Help Section */}
          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              Contact your supervisor or IT support for login assistance.
            </Text>
            <Text style={styles.helpContact}>
              Support: 1800-XXX-XXXX | help@health.gov.in
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  languageSelector: {
    alignSelf: 'flex-end',
    marginBottom: 20,
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
    color: '#3b82f6',
    fontWeight: '500',
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  roleSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  rolesGrid: {
    gap: 12,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    position: 'relative',
  },
  selectedRole: {
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  roleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  roleDescription: {
    fontSize: 12,
    color: '#6b7280',
    position: 'absolute',
    bottom: 8,
    left: 68,
  },
  roleCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  loginForm: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    color: '#1f2937',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  offlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  offlineButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  securityText: {
    fontSize: 14,
    color: '#1e40af',
    flex: 1,
  },
  helpSection: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  helpContact: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
    textAlign: 'center',
  },
});