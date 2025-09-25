// components/HomeScreenComponents.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LucideProps } from 'lucide-react-native';

// --- Stat Card Component ---
interface StatCardProps {
    label: string;
    value: number | string;
    style?: object;
    valueStyle?: object;
}
export const StatCard = ({ label, value, style, valueStyle }: StatCardProps) => (
    <View style={[styles.statCard, style]}>
        <Text style={[styles.statNumber, valueStyle]}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

// --- Quick Action Button Component ---
interface QuickActionProps {
    title: string;
    icon: React.FC<LucideProps>;
    route: string;
    color: string;
    bgColor: string;
}
export const QuickActionButton = ({ title, icon: Icon, route, color, bgColor }: QuickActionProps) => (
    <TouchableOpacity
        style={[styles.actionCard, { backgroundColor: bgColor }]}
        onPress={() => router.push(route as `http${string}` | `/${string}`)}
    >
        <View style={[styles.actionIcon, { backgroundColor: color }]}>
            <Icon size={24} color="white" />
        </View>
        <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
);

// --- Activity Item Component ---
interface ActivityItemProps {
    title: string;
    time: string;
    color: string;
}
export const ActivityItem = ({ title, time, color }: ActivityItemProps) => (
    <View style={styles.activityItem}>
        <View style={[styles.activityDot, { backgroundColor: color }]} />
        <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{title}</Text>
            <Text style={styles.activityTime}>{time}</Text>
        </View>
    </View>
);

// --- All the styles for these components ---
const styles = StyleSheet.create({
    // Stat Card Styles - REMOVED marginBottom from here
    statCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        // Removed marginBottom: 12 - spacing should be controlled by parent
    },
    statNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    statLabel: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
        textAlign: 'center',
    },
    // Action Button Styles
    actionCard: {
        flex: 1,
        minWidth: '47%',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        minHeight: 120,
        justifyContent: 'center',
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        textAlign: 'center',
    },
    // Activity Item Styles
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    activityDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 16,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 16,
        color: '#1f2937',
        fontWeight: '500',
    },
    activityTime: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 2,
    },
});