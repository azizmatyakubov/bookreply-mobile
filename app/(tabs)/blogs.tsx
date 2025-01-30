import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const BlogsScreen = () => {
  const popularQuestions = [
    {
      id: 1,
      title: "What is the meaning of 'Bismillah'?",
      preview: "Bismillah means 'In the name of Allah'. It is a phrase that Muslims recite before starting any action, as it brings blessings and reminds us to act with pure intentions...",
      fullAnswer: "Full detailed answer here...",
      likes: 1240,
      category: "Basic Concepts",
      timeToRead: "3 min",
      image: "https://example.com/bismillah.jpg"
    },
    {
      id: 2,
      title: "Why do we pray five times a day?",
      preview: "The five daily prayers were prescribed during the Prophet's night journey (Isra and Mi'raj). These prayers serve as regular reminders of our connection with Allah...",
      fullAnswer: "Full detailed answer here...",
      likes: 956,
      category: "Prayer",
      timeToRead: "5 min",
      image: "https://example.com/prayer.jpg"
    },
    {
      id: 3,
      title: "What is the significance of Surah Al-Fatiha?",
      preview: "Surah Al-Fatiha is known as 'The Opening' of the Quran. It is recited in every prayer and contains the essence of the entire Quran...",
      fullAnswer: "Full detailed answer here...",
      likes: 834,
      category: "Quran",
      timeToRead: "4 min",
      image: "https://example.com/fatiha.jpg"
    }
  ];

  const categories = [
    { name: "All", icon: "th-large" },
    { name: "Basic Concepts", icon: "star" },
    { name: "Prayer", icon: "pray" },
    { name: "Quran", icon: "book" },
    { name: "Hadith", icon: "scroll" }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900">
          Popular Questions
        </Text>
        <Text className="text-gray-600 mt-1">
          Explore frequently asked questions about Islam
        </Text>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-4 py-4 bg-white"
      >
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index}
            className={`mr-3 px-4 py-2 rounded-full flex-row items-center
              ${index === 0 ? 'bg-blue-500' : 'bg-gray-100'}`}
          >
            <FontAwesome5 
              name={category.icon} 
              size={14} 
              color={index === 0 ? '#fff' : '#4B5563'}
            />
            <Text 
              className={`ml-2 font-medium
                ${index === 0 ? 'text-white' : 'text-gray-600'}`}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Questions List */}
      <View className="p-4">
        {popularQuestions.map((question) => (
          <TouchableOpacity 
            key={question.id}
            className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm"
          >
            {/* Question Header */}
            <View className="p-4">
              <View className="flex-row items-center mb-2">
                <View className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-600 text-xs font-medium">
                    {question.category}
                  </Text>
                </View>
                <View className="flex-row items-center ml-3">
                  <FontAwesome5 name="clock" size={12} color="#6B7280" />
                  <Text className="text-gray-500 text-xs ml-1">
                    {question.timeToRead}
                  </Text>
                </View>
              </View>

              <Text className="text-lg font-bold text-gray-900 mb-2">
                {question.title}
              </Text>
              
              <Text className="text-gray-600 text-base leading-6 mb-3">
                {question.preview}
              </Text>

              {/* Action Buttons */}
              <View className="flex-row items-center justify-between mt-2">
                <View className="flex-row items-center">
                  <TouchableOpacity 
                    className="flex-row items-center mr-4"
                  >
                    <FontAwesome5 name="heart" size={16} color="#EF4444" />
                    <Text className="ml-1 text-gray-600">
                      {question.likes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="flex-row items-center"
                  >
                    <FontAwesome5 name="bookmark" size={16} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  className="flex-row items-center bg-blue-500 px-4 py-2 rounded-full"
                >
                  <Text className="text-white font-medium mr-1">
                    Read More
                  </Text>
                  <FontAwesome5 name="arrow-right" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Load More Button */}
      <TouchableOpacity 
        className="mx-4 mb-8 p-3 border border-blue-500 rounded-xl"
      >
        <Text className="text-blue-500 font-semibold text-center">
          Load More Questions
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BlogsScreen;