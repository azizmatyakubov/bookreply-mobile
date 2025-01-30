import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import * as Animatable from 'react-native-animatable';
import config from '../../configs/index';

interface ApiResponse {
  success: boolean;
  data: {
    question: string;
    answer: string;
  };
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const formatText = (text: string) => {
  return text
    .replace(/\*\*/g, '*')
    .replace(/\n\n/g, '\n')
    .trim();
};

const ChatScreen = () => {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      text: "Assalomu alaykum! Sizga qanday yordam bera olaman?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const flatListRef = React.useRef<FlatList>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };


  const sendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsLoading(true);

      try {
        const response = await fetch(`${config?.API_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ question: userMessage.text }),
        });

        const data: ApiResponse = await response.json();
        
        if (data.success) {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.data.answer,
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiMessage]);
        } else {
          throw new Error('API response was not successful');
        }
      } catch (error) {
        console.error('API Error:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Kechirasiz, so'rovingizni qayta ishlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Animatable.View 
      animation={item.isUser ? "slideInRight" : "slideInLeft"}
      duration={500}
      className={`mb-4 ${item.isUser ? 'items-end' : 'items-start'}`}
    >
      <View className="flex-row items-end">
        {!item.isUser && (
          <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center mr-2">
            <FontAwesome name="user" size={16} color="#fff" />
          </View>
        )}
        <View className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          item.isUser 
            ? 'bg-blue-500 rounded-br-sm' 
            : 'bg-white rounded-bl-sm shadow-sm'
        }`}>
          {isLoading && !item.isUser && item.id === messages[messages.length - 1].id ? (
            <View className="flex-row items-center p-2">
              <ActivityIndicator size="small" color="#007AFF" />
              <Text className="ml-2 text-gray-600">AI yozmoqda...</Text>
            </View>
          ) : (
            item.isUser ? (
              <Text className="text-white text-base leading-6">
                {item.text}
              </Text>
            ) : (
              <Markdown 
                style={{
                  body: { color: '#333', fontSize: 16, lineHeight: 24 },
                  paragraph: { marginVertical: 8 },
                  strong: { color: '#007AFF', fontWeight: 'bold' },
                  heading1: { fontSize: 20, fontWeight: 'bold', marginVertical: 8, color: '#333' },
                  heading2: { fontSize: 18, fontWeight: 'bold', marginVertical: 8, color: '#333' },
                }}
              >
                {formatText(item.text)}
              </Markdown>
            )
          )}
        </View>
      </View>
      <Text className={`text-xs text-gray-500 mt-1 ${
        item.isUser ? 'mr-2' : 'ml-10'
      }`}>
        {new Date(item.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </Text>
    </Animatable.View>
  );

  React.useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.select({
          ios: 100,
          android: 0,
        })}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          className="flex-1"
          contentContainerClassName="p-4"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
        <View className="flex-row items-center p-3 bg-white border-t border-gray-200">
        <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2 min-h-[40px] max-h-[100px]"
            value={message}
            onChangeText={setMessage}
            placeholder="Savolingizni yozing..."
            multiline
            placeholderTextColor="#666"
            editable={!isLoading}
            onFocus={() => {
              scrollToBottom();
              setTimeout(scrollToBottom, 50);
            }}
          />
          {isLoading ? (
            <View className="w-10 h-10 items-center justify-center">
              <ActivityIndicator color="#007AFF" />
            </View>
          ) : (
            <TouchableOpacity 
              className="w-10 h-10 items-center justify-center"
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <FontAwesome 
                name="send" 
                size={20} 
                color={message.trim() ? "#007AFF" : "#A0A0A0"} 
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;