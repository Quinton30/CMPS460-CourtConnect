import React from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// Each court uses the same data shape throughout the application.
type Court = {
  id: string;
  name: string;
  neighborhood: string;
  surface: string;
  courtType: string;
  lights: string;
  bestFor: string;
  description: string;
  amenities: string[];
};

// This type defines the screens and the data passed between them.
type RootStackParamList = {
  Home: undefined;
  Courts: undefined;
  Details: {court: Court};
  About: undefined;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type CourtsProps = NativeStackScreenProps<RootStackParamList, 'Courts'>;
type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
type AboutProps = NativeStackScreenProps<RootStackParamList, 'About'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

// Sample basketball court information displayed on the List screen.
const COURTS: Court[] = [
  {
    id: '1',
    name: 'Sunset Hoops Center',
    neighborhood: 'Sunset Park',
    surface: 'Outdoor asphalt',
    courtType: 'Two full courts',
    lights: 'Evening lights available',
    bestFor: 'Pickup games and team practice',
    description:
      'A busy neighborhood basketball location with space for full-court games and smaller shooting sessions.',
    amenities: ['Water fountain', 'Benches', 'Nearby restrooms'],
  },
  {
    id: '2',
    name: 'Harbor View Courts',
    neighborhood: 'Brooklyn Heights',
    surface: 'Outdoor sport tile',
    courtType: 'One full court',
    lights: 'Daytime use',
    bestFor: 'Casual games and individual workouts',
    description:
      'A waterfront-style court designed for players who want a relaxed place to practice or play a casual game.',
    amenities: ['Seating area', 'Bike racks', 'Scenic walking path'],
  },
  {
    id: '3',
    name: 'Prospect Heights Gym',
    neighborhood: 'Prospect Heights',
    surface: 'Indoor hardwood',
    courtType: 'One regulation court',
    lights: 'Indoor lighting',
    bestFor: 'Organized games and rainy days',
    description:
      'An indoor basketball facility that gives players a reliable option when weather conditions are not ideal.',
    amenities: ['Locker rooms', 'Scoreboard', 'Bleacher seating'],
  },
  {
    id: '4',
    name: 'Brooklyn Tech Court',
    neighborhood: 'Downtown Brooklyn',
    surface: 'Outdoor acrylic',
    courtType: 'Two half courts',
    lights: 'Evening lights available',
    bestFor: 'Shooting drills and three-on-three games',
    description:
      'A modern court layout that works well for smaller games, skill training, and quick basketball sessions.',
    amenities: ['Ball return rack', 'Benches', 'Transit nearby'],
  },
  {
    id: '5',
    name: 'East River Recreation Court',
    neighborhood: 'Williamsburg',
    surface: 'Outdoor concrete',
    courtType: 'One full court',
    lights: 'Daytime use',
    bestFor: 'Community games and weekend play',
    description:
      'A community-focused court with an open layout for players of different experience levels.',
    amenities: ['Playground nearby', 'Picnic tables', 'Water fountain'],
  },
];

function HomeScreen({navigation}: HomeProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.pageContent}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>CMPS 460 MOBILE PROJECT</Text>
          <Text style={styles.heroTitle}>CourtConnect</Text>
          <Text style={styles.heroText}>
            Find a basketball court that matches the way you want to play.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Find Your Next Court</Text>
          <Text style={styles.bodyText}>
            Browse sample basketball locations, compare court information, and
            open a details page to learn more about each location.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Courts')}>
            <Text style={styles.primaryButtonText}>Browse Courts</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('About')}>
            <Text style={styles.secondaryButtonText}>About CourtConnect</Text>
          </Pressable>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>What You Can Compare</Text>
          <Text style={styles.tipText}>
            Neighborhood, playing surface, court type, lighting, amenities, and
            the type of basketball activity that fits each location.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CourtsScreen({navigation}: CourtsProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <FlatList
        data={COURTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.screenTitle}>Basketball Courts</Text>
            <Text style={styles.bodyText}>
              Select any court to view its full details.
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <Pressable
            style={({pressed}) => [
              styles.courtCard,
              pressed && styles.cardPressed,
            ]}
            onPress={() => navigation.navigate('Details', {court: item})}>
            <View style={styles.cardTopRow}>
              <Text style={styles.courtName}>{item.name}</Text>
              <Text style={styles.viewLabel}>VIEW</Text>
            </View>
            <Text style={styles.neighborhood}>{item.neighborhood}</Text>
            <Text style={styles.courtMeta}>{item.surface}</Text>
            <Text style={styles.courtMeta}>{item.courtType}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

function DetailsScreen({route}: DetailsProps): React.JSX.Element {
  // The selected court is received through React Navigation parameters.
  const {court} = route.params;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.pageContent}>
        <View style={styles.detailHeader}>
          <Text style={styles.detailNeighborhood}>{court.neighborhood}</Text>
          <Text style={styles.detailTitle}>{court.name}</Text>
          <Text style={styles.detailBestFor}>{court.bestFor}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Court Information</Text>
          <DetailRow label="Surface" value={court.surface} />
          <DetailRow label="Court layout" value={court.courtType} />
          <DetailRow label="Lighting" value={court.lights} />
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>About This Court</Text>
          <Text style={styles.bodyText}>{court.description}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          {court.amenities.map(amenity => (
            <Text key={amenity} style={styles.amenityText}>
              • {amenity}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({label, value}: DetailRowProps): React.JSX.Element {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function AboutScreen({navigation}: AboutProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.pageContent}>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutAppName}>CourtConnect</Text>
          <Text style={styles.aboutName}>Created by Quinton Alexandre</Text>

          <Text style={styles.sectionTitle}>Application Description</Text>
          <Text style={styles.bodyText}>
            CourtConnect is a multi-screen basketball court guide. It presents
            a list of sample locations and allows users to open a separate
            details screen for the court they select.
          </Text>

          <Text style={styles.sectionTitle}>Purpose</Text>
          <Text style={styles.bodyText}>
            The purpose of the application is to help basketball players
            quickly compare courts and choose a location that fits their needs.
            It also demonstrates stack navigation and passing data between
            React Native screens.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Courts')}>
            <Text style={styles.primaryButtonText}>View Court List</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#123B56" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {backgroundColor: '#123B56'},
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {fontWeight: 'bold'},
            contentStyle: {backgroundColor: '#EDF4F7'},
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'CourtConnect'}}
          />
          <Stack.Screen
            name="Courts"
            component={CourtsScreen}
            options={{title: 'Court List'}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({route}) => ({title: route.params.court.name})}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{title: 'About'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDF4F7',
  },
  pageContent: {
    padding: 20,
    paddingBottom: 36,
  },
  heroCard: {
    backgroundColor: '#123B56',
    borderRadius: 22,
    padding: 24,
    marginBottom: 18,
  },
  eyebrow: {
    color: '#63D9C5',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1.1,
    marginBottom: 10,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heroText: {
    color: '#D9E8F0',
    fontSize: 18,
    lineHeight: 26,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#C6D8E2',
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#123B56',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 9,
    marginTop: 4,
  },
  bodyText: {
    color: '#3B5060',
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 14,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#EE7D2D',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#E3F2F3',
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 11,
    borderWidth: 1,
    borderColor: '#84C6CB',
  },
  secondaryButtonText: {
    color: '#126777',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipCard: {
    backgroundColor: '#DDF5EE',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#83C9B5',
  },
  tipTitle: {
    color: '#17634E',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tipText: {
    color: '#315C50',
    fontSize: 15,
    lineHeight: 22,
  },
  listContent: {
    padding: 18,
    paddingBottom: 34,
  },
  listHeader: {
    marginBottom: 6,
  },
  screenTitle: {
    color: '#123B56',
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courtCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#C4D6E0',
  },
  cardPressed: {
    opacity: 0.72,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  courtName: {
    color: '#123B56',
    fontSize: 19,
    fontWeight: 'bold',
    flex: 1,
  },
  viewLabel: {
    color: '#147D8C',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  neighborhood: {
    color: '#D66320',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courtMeta: {
    color: '#526775',
    fontSize: 15,
    marginBottom: 3,
  },
  detailHeader: {
    backgroundColor: '#123B56',
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
  },
  detailNeighborhood: {
    color: '#63D9C5',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 7,
  },
  detailTitle: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 9,
  },
  detailBestFor: {
    color: '#DCEAF1',
    fontSize: 16,
    lineHeight: 23,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#C4D6E0',
    marginBottom: 14,
  },
  detailRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E9EE',
    paddingVertical: 11,
  },
  detailLabel: {
    color: '#6A7B87',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  detailValue: {
    color: '#253E4E',
    fontSize: 16,
  },
  amenityText: {
    color: '#365362',
    fontSize: 16,
    marginBottom: 7,
  },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#C4D6E0',
  },
  aboutAppName: {
    color: '#123B56',
    fontSize: 31,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  aboutName: {
    color: '#D66320',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

export default App;
