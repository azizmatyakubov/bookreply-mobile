// import React from 'react';
// import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// const ChatScreen = () => {
//   const router = useRouter();

//   const features = [
//     {
//       title: "AI Quran Assistant",
//       icon: "robot",
//       description: "Ask questions about Quran and Islam",
//       route: "/chat/ai"  // Updated route
//     },
//     {
//       title: "Study Groups",
//       icon: "users",
//       description: "Join Quran study circles",
//       route: "/chat/groups"
//     },
//     {
//       title: "One-on-One Chat",
//       icon: "comment",
//       description: "Private discussions about Islamic topics",
//       route: "/chat/private"
//     },
//     {
//       title: "Community Forum",
//       icon: "comments",
//       description: "Public discussions and Q&A",
//       route: "/chat/forum"
//     }
//   ];

//   return (
//     <ScrollView className="flex-1 bg-gray-50">
//       {/* Daily Verse Card */}
//       <View className="bg-white m-4 rounded-xl p-6 shadow-sm">
//         <Text className="text-lg font-bold text-gray-900 mb-2">Today's Verse</Text>
//         <Text className="text-2xl text-right mb-4 font-arabic">
//           بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
//         </Text>
//         <Text className="text-gray-600 mb-2">
//           In the name of Allah, the Most Gracious, the Most Merciful
//         </Text>
//         <TouchableOpacity className="flex-row items-center">
//           <Text className="text-blue-500">Learn More</Text>
//           <FontAwesome5 name="chevron-right" size={12} color="#007AFF" className="ml-1" />
//         </TouchableOpacity>
//       </View>

//       {/* Feature Grid */}
//       <View className="flex-row flex-wrap px-2">
//         {features.map((feature, index) => (
//           <TouchableOpacity
//             key={index}
//             className="w-1/2 p-2"
//             onPress={() => router.push(feature.route)}
//           >
//             <View className="bg-white p-4 rounded-xl">
//               <View className="bg-blue-50 w-10 h-10 rounded-full items-center justify-center mb-3">
//                 <FontAwesome5 name={feature.icon} size={20} color="#007AFF" />
//               </View>
//               <Text className="font-semibold text-gray-900 mb-1">{feature.title}</Text>
//               <Text className="text-gray-500 text-sm">{feature.description}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Recent Chats */}
//       <View className="mt-4 bg-white p-4">
//         <Text className="text-lg font-bold text-gray-900 mb-4">Recent Chats</Text>
//         {/* Add recent chats list */}
//       </View>
//     </ScrollView>
//   );
// };

// export default ChatScreen;