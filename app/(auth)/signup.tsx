import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../_layout';

export default function SignupScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { signIn } = useAuth();

    const handleSignup = async () => {
        if (!username || !password || !confirmPassword) {
          setError("Iltimos, barcha maydonlarni to'ldiring");
          return;
        }
      
        if (password !== confirmPassword) {
          setError("Parollar mos kelmadi");
          return;
        }
      
        setIsLoading(true);
        setError('');
      
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          await signIn({username: username });
        } catch (err) {
          setError("Ro'yxatdan o'tishda xatolik yuz berdi");
        } finally {
          setIsLoading(false);
        }
    };
    


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-gray-100"
        >
            <View>
                <Text>Signup</Text>
            </View>
        </KeyboardAvoidingView>
    )
}
