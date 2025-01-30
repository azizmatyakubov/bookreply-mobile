import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../_layout';
import { useRouter } from 'expo-router';

const AccountScreen = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const menuItems = [
    {
      icon: 'user-circle',
      title: 'Profile Settings',
      subtitle: 'Update your personal information',
      action: () => console.log('Profile'),
    },
    {
      icon: 'moon',
      title: 'Dark Mode',
      subtitle: 'Toggle dark/light theme',
      action: () => console.log('Dark Mode'),
    },
    {
      icon: 'language',
      title: 'Language',
      subtitle: 'Change app language',
      action: () => console.log('Language'),
    },
    {
      icon: 'bell',
      title: 'Notifications',
      subtitle: 'Manage notification settings',
      action: () => console.log('Notifications'),
    },
    {
      icon: 'bookmark',
      title: 'Saved Conversations',
      subtitle: 'View your saved Quran chats',
      action: () => console.log('Saved'),
    },
    {
      icon: 'pray',
      title: 'Prayer Times',
      subtitle: 'Set your prayer notifications',
      action: () => console.log('Prayer'),
    },
    {
      icon: 'question-circle',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      action: () => console.log('Help'),
    },
    {
      icon: 'info-circle',
      title: 'About',
      subtitle: 'App information and credits',
      action: () => console.log('About'),
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Header */}
      <View className="items-center px-4 py-8 bg-white border-b border-gray-200">
        <View className="relative mb-4">
          <Image
            source={{ uri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' }}
            className="w-24 h-24 rounded-full"
          />
          <TouchableOpacity 
            className="absolute right-0 bottom-0 p-2 bg-white rounded-full shadow-md"
          >
            <FontAwesome5 name="edit" size={16} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <Text className="text-2xl font-bold text-gray-900">
          {user?.username || 'User'}
        </Text>
        <Text className="mt-1 text-base text-gray-600">
          user@example.com
        </Text>
      </View>

      {/* Settings Menu */}
      <View className="px-4 py-2">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between p-4 mb-2 bg-white rounded-xl"
            onPress={item.action}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 items-center justify-center bg-blue-50 rounded-full">
                <FontAwesome5 name={item.icon} size={20} color="#007AFF" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-base font-semibold text-gray-900">
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-500">
                  {item.subtitle}
                </Text>
              </View>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        className="flex-row items-center justify-center mx-4 my-4 p-4 bg-white rounded-xl"
        onPress={handleLogout}
      >
        <FontAwesome5 name="sign-out-alt" size={20} color="#EF4444" />
        <Text className="ml-2 text-red-500 font-semibold text-base">
          Logout
        </Text>
      </TouchableOpacity>

      {/* Version */}
      <Text className="text-center text-gray-500 text-sm mb-8">
        Version 1.0.0
      </Text>
    </ScrollView>
  );
};

export default AccountScreen;