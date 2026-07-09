import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ExploreScreen from './src/screens/ExploreScreen';
import DetailScreen from './src/screens/DetailScreen';
import WatchlistScreen from './src/screens/WatchlistScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExploreStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="ExploreMain"
        component={ExploreScreen}
        options={{ title: 'CineList' }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detalhes' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Explorar') {
              iconName = focused ? 'film' : 'film-outline';
            } else if (route.name === 'Watchlist') {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e94560',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#1a1a2e',
            borderTopWidth: 0,
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#1a1a2e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="Explorar"
          component={ExploreStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchlistScreen}
          options={{ title: 'Minha Watchlist' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}