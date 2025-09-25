import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Alert 
} from 'react-native';
import { 
  BookOpen, 
  Play, 
  Share, 
  Download, 
  Clock, 
  Users,
  Eye,
  Star,
  Search,
  Filter,
  Globe,
  Volume2
} from 'lucide-react-native';

interface EducationalContent {
  id: string;
  type: 'video' | 'article' | 'infographic' | 'audio';
  title: string;
  description: string;
  category: string;
  duration: string;
  language: string;
  views: number;
  rating: number;
  imageUrl: string;
  isDownloaded: boolean;
  isPopular: boolean;
}

export default function EducationScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const categories = [
    { key: 'all', label: 'All Topics', count: 24 },
    { key: 'hygiene', label: 'Hygiene', count: 8 },
    { key: 'disease', label: 'Disease Prevention', count: 6 },
    { key: 'nutrition', label: 'Nutrition', count: 5 },
    { key: 'water', label: 'Water Safety', count: 3 },
    { key: 'maternal', label: 'Maternal Health', count: 2 }
  ];

  const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu'];

  const [educationalContent] = useState<EducationalContent[]>([
    {
      id: '1',
      type: 'video',
      title: 'Hand Washing: The Right Way',
      description: 'Learn the proper technique for effective hand washing to prevent diseases and infections.',
      category: 'hygiene',
      duration: '3:45',
      language: 'English',
      views: 1250,
      rating: 4.8,
      imageUrl: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg',
      isDownloaded: true,
      isPopular: true
    },
    {
      id: '2',
      type: 'infographic',
      title: 'Signs of Dengue Fever',
      description: 'Visual guide to identify early symptoms of dengue fever and when to seek medical help.',
      category: 'disease',
      duration: '2 min read',
      language: 'Hindi',
      views: 890,
      rating: 4.6,
      imageUrl: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg',
      isDownloaded: false,
      isPopular: true
    },
    {
      id: '3',
      type: 'video',
      title: 'Safe Water Storage at Home',
      description: 'Best practices for storing and treating water to prevent waterborne diseases.',
      category: 'water',
      duration: '5:20',
      language: 'English',
      views: 675,
      rating: 4.7,
      imageUrl: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
      isDownloaded: false,
      isPopular: false
    },
    {
      id: '4',
      type: 'article',
      title: 'Nutrition During Pregnancy',
      description: 'Essential nutrients and dietary guidelines for expectant mothers in rural areas.',
      category: 'maternal',
      duration: '8 min read',
      language: 'Bengali',
      views: 520,
      rating: 4.9,
      imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      isDownloaded: true,
      isPopular: false
    },
    {
      id: '5',
      type: 'audio',
      title: 'Child Vaccination Schedule',
      description: 'Audio guide explaining the importance and timing of childhood vaccinations.',
      category: 'disease',
      duration: '12:30',
      language: 'Tamil',
      views: 445,
      rating: 4.5,
      imageUrl: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg',
      isDownloaded: false,
      isPopular: false
    },
    {
      id: '6',
      type: 'infographic',
      title: 'Kitchen Hygiene Checklist',
      description: 'Easy-to-follow checklist for maintaining cleanliness in food preparation areas.',
      category: 'hygiene',
      duration: '3 min read',
      language: 'Hindi',
      views: 780,
      rating: 4.4,
      imageUrl: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg',
      isDownloaded: true,
      isPopular: true
    }
  ]);

  const filteredContent = educationalContent.filter(content => {
    if (activeCategory === 'all') return true;
    return content.category === activeCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'audio': return Volume2;
      case 'article': return BookOpen;
      case 'infographic': return Eye;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return '#dc2626';
      case 'audio': return '#059669';
      case 'article': return '#3b82f6';
      case 'infographic': return '#7c3aed';
      default: return '#6b7280';
    }
  };

  const handleDownload = (content: EducationalContent) => {
    Alert.alert(
      'Download Content',
      `Download "${content.title}" for offline viewing?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => Alert.alert('Success', 'Content downloaded successfully!') }
      ]
    );
  };

  const handleShare = (content: EducationalContent) => {
    Alert.alert(
      'Share Content',
      `Share "${content.title}" with your community?`,
      [
        { text: 'SMS', onPress: () => Alert.alert('SMS', 'Sharing via SMS...') },
        { text: 'WhatsApp', onPress: () => Alert.alert('WhatsApp', 'Sharing via WhatsApp...') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handlePlay = (content: EducationalContent) => {
    Alert.alert(
      'Playing Content',
      `Opening "${content.title}" in ${content.language}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Health Education</Text>
          <TouchableOpacity style={styles.languageSelector}>
            <Globe size={16} color="#3b82f6" />
            <Text style={styles.languageText}>{selectedLanguage}</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Content */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Content</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContent}
          >
            {educationalContent.filter(c => c.isPopular).map((content) => {
              const TypeIcon = getTypeIcon(content.type);
              return (
                <TouchableOpacity
                  key={content.id}
                  style={styles.featuredCard}
                  onPress={() => handlePlay(content)}
                >
                  <Image source={{ uri: content.imageUrl }} style={styles.featuredImage} />
                  <View style={styles.featuredOverlay}>
                    <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(content.type) }]}>
                      <TypeIcon size={16} color="white" />
                    </View>
                  </View>
                  <View style={styles.featuredInfo}>
                    <Text style={styles.featuredTitle} numberOfLines={2}>
                      {content.title}
                    </Text>
                    <View style={styles.featuredMeta}>
                      <View style={styles.metaItem}>
                        <Clock size={12} color="#6b7280" />
                        <Text style={styles.metaText}>{content.duration}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Eye size={12} color="#6b7280" />
                        <Text style={styles.metaText}>{content.views}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Category Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryTab,
                activeCategory === category.key && styles.activeCategoryTab
              ]}
              onPress={() => setActiveCategory(category.key)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === category.key && styles.activeCategoryText
              ]}>
                {category.label}
              </Text>
              <View style={[
                styles.categoryBadge,
                { backgroundColor: activeCategory === category.key ? '#3b82f6' : '#e5e7eb' }
              ]}>
                <Text style={[
                  styles.categoryBadgeText,
                  { color: activeCategory === category.key ? 'white' : '#6b7280' }
                ]}>
                  {category.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content List */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>
            {activeCategory === 'all' ? 'All Educational Content' : `${categories.find(c => c.key === activeCategory)?.label} Resources`}
          </Text>
          
          {filteredContent.map((content) => {
            const TypeIcon = getTypeIcon(content.type);
            return (
              <TouchableOpacity
                key={content.id}
                style={styles.contentCard}
                onPress={() => handlePlay(content)}
              >
                <Image source={{ uri: content.imageUrl }} style={styles.contentImage} />
                <View style={styles.contentInfo}>
                  <View style={styles.contentHeader}>
                    <View style={[styles.typeTag, { backgroundColor: getTypeColor(content.type) }]}>
                      <TypeIcon size={12} color="white" />
                      <Text style={styles.typeText}>{content.type.toUpperCase()}</Text>
                    </View>
                    {content.isDownloaded && (
                      <View style={styles.downloadedIndicator}>
                        <Download size={12} color="#059669" />
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.contentTitle}>{content.title}</Text>
                  <Text style={styles.contentDescription} numberOfLines={2}>
                    {content.description}
                  </Text>
                  
                  <View style={styles.contentMeta}>
                    <View style={styles.metaRow}>
                      <View style={styles.metaItem}>
                        <Clock size={14} color="#6b7280" />
                        <Text style={styles.metaText}>{content.duration}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Globe size={14} color="#6b7280" />
                        <Text style={styles.metaText}>{content.language}</Text>
                      </View>
                    </View>
                    <View style={styles.metaRow}>
                      <View style={styles.metaItem}>
                        <Eye size={14} color="#6b7280" />
                        <Text style={styles.metaText}>{content.views} views</Text>
                      </View>
                      <View style={styles.ratingContainer}>
                        <Star size={14} color="#fbbf24" fill="#fbbf24" />
                        <Text style={styles.ratingText}>{content.rating}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.contentActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDownload(content)}
                    >
                      <Download size={16} color="#3b82f6" />
                      <Text style={styles.actionText}>
                        {content.isDownloaded ? 'Downloaded' : 'Download'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleShare(content)}
                    >
                      <Share size={16} color="#3b82f6" />
                      <Text style={styles.actionText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Download Notice */}
        <View style={styles.downloadNotice}>
          <Download size={20} color="#059669" />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Offline Access</Text>
            <Text style={styles.noticeText}>
              Download content for offline viewing. Perfect for areas with limited connectivity.
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
  languageSelector: {
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
  featuredSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  featuredContent: {
    paddingRight: 16,
  },
  featuredCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  featuredImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  typeIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredInfo: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: 16,
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
  categoryContainer: {
    marginBottom: 24,
  },
  categoryContent: {
    paddingRight: 16,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 12,
    gap: 8,
  },
  activeCategoryTab: {
    backgroundColor: '#dbeafe',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeCategoryText: {
    color: '#3b82f6',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 20,
    alignItems: 'center',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentSection: {
    marginBottom: 24,
  },
  contentCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  contentImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  contentInfo: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  downloadedIndicator: {
    padding: 4,
    backgroundColor: '#d1fae5',
    borderRadius: 8,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  contentMeta: {
    gap: 8,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  contentActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  downloadNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    gap: 12,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065f46',
  },
  noticeText: {
    fontSize: 14,
    color: '#047857',
    marginTop: 4,
  },
});