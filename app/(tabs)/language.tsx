import { View, Text } from 'react-native';
import { LanguageSelector } from '../../components/LangaugeSelector';

export default function LanguageScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>
        Select Language
      </Text>
      <LanguageSelector
        onLanguageChange={(lang) => console.log('Language changed to:', lang)}
      />
    </View>
  );
}
