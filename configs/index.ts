import Constants from 'expo-constants';

const getEnvVars = () => {
  try {
    return {
      API_URL: Constants.expoConfig?.extra?.API_URL,
    };
  } catch (error) {
    console.log(error);
  }
};

export default getEnvVars();