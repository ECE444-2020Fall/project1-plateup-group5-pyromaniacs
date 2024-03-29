import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// screens
import BrowseRecipes from '../screens/BrowseRecipes';
import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import Register from '../screens/Register';
import Filters from '../screens/Filters';
import RecipeDetails from '../screens/RecipeDetails';
import RecipeStepByStep from '../screens/RecipeStepByStep';
import GroceryInventory from '../screens/GroceryInventory';
import ShoppingList from '../screens/ShoppingList';

// drawer
import CustomDrawerContent from './Menu';

// header for screens
import { Header } from '../components';
import { argonTheme } from '../constants';
import { width } from '../constants/utils';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={BrowseRecipes}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: argonTheme.COLORS.GREY },
        }}
      />
      <Stack.Screen
        name="Filters"
        component={Filters}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Browse"
              back
              search={false}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: argonTheme.COLORS.GREY },
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeDetails}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Browse"
              back
              search={false}
              noShadow
              titleColor={argonTheme.COLORS.WHITE}
              iconColor={argonTheme.COLORS.WHITE}
              bgColor={argonTheme.COLORS.PRIMARY}
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
      <Stack.Screen
        name="RecipeStepByStep"
        component={RecipeStepByStep}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Recipe Details"
              back
              search={false}
              noShadow
              titleColor={argonTheme.COLORS.SECONDARY}
              iconColor={argonTheme.COLORS.SECONDARY}
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function GroceryInventoryStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="GroceryInventory"
        component={GroceryInventory}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Grocery Inventory"
              search={false}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: argonTheme.COLORS.GREY },
        }}
      />
    </Stack.Navigator>
  );
}

function ShoppingListStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="ShoppingList"
        component={ShoppingList}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Shopping List"
              search={false}
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: argonTheme.COLORS.GREY },
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack() {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Register} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={({ focused, navigation, state }) => (
        <CustomDrawerContent
          focused={focused}
          navigation={navigation}
          state={state}
        />
      )}
      drawerStyle={{
        backgroundColor: 'white',
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: 'white',
        inactiveTintColor: '#000',
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="GroceryInventory" component={GroceryInventoryStack} />
      <Drawer.Screen name="ShoppingList" component={ShoppingListStack} />
    </Drawer.Navigator>
  );
}
