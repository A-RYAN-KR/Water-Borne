import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 👇 Define props type
type LanguageSelectorProps = {
  onLanguageChange?: (langCode: string) => void;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const languages: { code: string; name: string; flag: string }[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "as", name: "অসমীয়া", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
    { code: "mni", name: "মণিপুরী", flag: "🇮🇳" },
    { code: "ne", name: "नेपाली", flag: "🇳🇵" },
    { code: "kok", name: "कोंकणी", flag: "🇮🇳" },
  ];

  useEffect(() => {
    const loadLang = async () => {
      try {
        const saved = await AsyncStorage.getItem("selectedLanguage");
        if (saved) {
          setSelectedLanguage(saved);
        }
      } catch (error) {
        console.log("Error loading language:", error);
      }
    };
    loadLang();
  }, []);

  const changeLanguage = async (langCode: string) => {
    try {
      await AsyncStorage.setItem("selectedLanguage", langCode);
      setSelectedLanguage(langCode);
      onLanguageChange?.(langCode);
    } catch (error) {
      console.log("Error saving language preference:", error);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => changeLanguage(lang.code)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 6,
            padding: 8,
            borderRadius: 8,
            backgroundColor:
              lang.code === selectedLanguage ? "#d1fae5" : "#f9fafb",
          }}
        >
          <Text style={{ fontSize: 18, marginRight: 10 }}>{lang.flag}</Text>
          <Text
            style={{
              fontWeight: lang.code === selectedLanguage ? "700" : "400",
              fontSize: 16,
            }}
          >
            {lang.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
