import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../_layout';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call signIn with user data
      await signIn({
        username: username,
        password: password,
        // Add any other user data you want to store
        id: Date.now().toString(), // Temporary ID for demo
      });

      // Navigate to tabs after successful login
      router.replace('/(tabs)/chat');
    } catch (err) {
      setError("Login yoki parol noto'g'ri");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-100"
    >
      <Animatable.View 
        animation="fadeInDown" 
        duration={1000} 
        className="flex-1 justify-center items-center px-5"
      >
        <Text className="text-2xl font-bold text-gray-800 mb-1">Xush kelibsiz!</Text>
        <Text className="text-lg text-gray-600">Davom etish uchun tizimga kiring</Text>
      </Animatable.View>

      <Animatable.View 
        animation="fadeInUp" 
        duration={1000} 
        className="flex-1 bg-white rounded-t-[30px] px-5 pt-8 shadow-lg"
      >
        <View className="mb-5">
          <Text className="text-sm text-gray-600 mb-2">Login</Text>
          <TextInput
            className="bg-gray-100 rounded-lg p-4 text-base border border-gray-200"
            value={username}
            onChangeText={setUsername}
            placeholder="Loginingizni kiriting"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-5">
          <Text className="text-sm text-gray-600 mb-2">Parol</Text>
          <TextInput
            className="bg-gray-100 rounded-lg p-4 text-base border border-gray-200"
            value={password}
            onChangeText={setPassword}
            placeholder="Parolingizni kiriting"
            secureTextEntry
          />
        </View>

        {error ? (
          <Animatable.Text 
            animation="shake" 
            className="text-red-500 text-center mt-2.5"
          >
            {error}
          </Animatable.Text>
        ) : null}

        <TouchableOpacity
          className={`rounded-lg p-4 items-center mt-5 ${
            !username || !password ? 'bg-gray-400' : 'bg-blue-500'
          }`}
          onPress={handleLogin}
          disabled={isLoading || !username || !password}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-semibold">Kirish</Text>
          )}
        </TouchableOpacity>

        {/* Add Sign Up Link */}
        <TouchableOpacity 
          onPress={() => router.push('/(auth)/signup')}
          className="mt-4"
        >
          <Text className="text-center text-gray-600">
            Hisobingiz yo'qmi? <Text className="text-blue-500 font-semibold">Ro'yxatdan o'ting</Text>
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}