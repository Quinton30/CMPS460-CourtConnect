import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// Data model used for the original court guide.
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

// Module 5 data model. Every saved court has a unique id and three details.
interface SavedCourt {
  id: string;
  name: string;
  neighborhood: string;
  surface: string;
}

type RootStackParamList = {
  Home: undefined;
  Courts: undefined;
  Details: {court: Court};
  SavedCourts: undefined;
  AddCourt: undefined;
  About: undefined;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type CourtsProps = NativeStackScreenProps<RootStackParamList, 'Courts'>;
type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
type SavedCourtsNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SavedCourts'
>;
type AddCourtNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'AddCourt'
>;
type AboutProps = NativeStackScreenProps<RootStackParamList, 'About'>;

type SavedCourtsScreenProps = SavedCourtsNavigationProps & {
  courts: SavedCourt[];
  onDelete: (id: string) => void;
};

type AddCourtScreenProps = AddCourtNavigationProps & {
  onAdd: (court: SavedCourt) => void;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const STORAGE_KEY = '@courtconnect_saved_courts';

// These three items appear the first time the application is opened.
const STARTER_SAVED_COURTS: SavedCourt[] = [
  {
    id: 'starter-1',
    name: 'Sunset Hoops Center',
    neighborhood: 'Sunset Park',
    surface: 'Outdoor asphalt',
  },
  {
    id: 'starter-2',
    name: 'Harbor View Courts',
    neighborhood: 'Brooklyn Heights',
    surface: 'Outdoor sport tile',
  },
  {
    id: 'starter-3',
    name: 'Prospect Heights Gym',
    neighborhood: 'Prospect Heights',
    surface: 'Indoor hardwood',
  },
];

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
          <Text style={styles.eyebrow}>CMPS 460 MODULE 5</Text>
          <Text style={styles.heroTitle}>CourtConnect</Text>
          <Text style={styles.heroText}>
            Browse basketball courts and keep your own saved court collection.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Find and Save Courts</Text>
          <Text style={styles.bodyText}>
            Explore the original court guide or manage a personal collection
            that stays saved after the application closes.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Courts')}>
            <Text style={styles.primaryButtonText}>Browse Court Guide</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('SavedCourts')}>
            <Text style={styles.secondaryButtonText}>View Saved Courts</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('AddCourt')}>
            <Text style={styles.secondaryButtonText}>Add a Court</Text>
          </Pressable>

          <Pressable
            style={styles.textButton}
            onPress={() => navigation.navigate('About')}>
            <Text style={styles.textButtonText}>About CourtConnect</Text>
          </Pressable>
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

function SavedCourtsScreen({
  navigation,
  courts,
  onDelete,
}: SavedCourtsScreenProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <FlatList
        data={courts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentGrow}
        ListHeaderComponent={
          <View style={styles.savedHeader}>
            <Text style={styles.screenTitle}>My Saved Courts</Text>
            <Text style={styles.bodyText}>
              These courts are stored on this device with AsyncStorage.
            </Text>
            <Pressable
              style={styles.primaryButton}
              onPress={() => navigation.navigate('AddCourt')}>
              <Text style={styles.primaryButtonText}>Add New Court</Text>
            </Pressable>
          </View>
        }
        // This message is displayed if every saved court has been deleted.
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No saved courts yet</Text>
            <Text style={styles.emptyText}>
              Press Add New Court to create your first saved location.
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <View style={styles.savedCourtCard}>
            <Text style={styles.courtName}>{item.name}</Text>
            <Text style={styles.neighborhood}>{item.neighborhood}</Text>
            <Text style={styles.courtMeta}>Surface: {item.surface}</Text>
            <Pressable
              style={styles.deleteButton}
              onPress={() => onDelete(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function AddCourtScreen({
  navigation,
  onAdd,
}: AddCourtScreenProps): React.JSX.Element {
  // Three state values store the user's form input.
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [surface, setSurface] = useState('');
  const [error, setError] = useState('');

  const submitCourt = () => {
    // All three fields are required before a court can be added.
    if (!name.trim() || !neighborhood.trim() || !surface.trim()) {
      setError('Please complete all three fields.');
      return;
    }

    const newCourt: SavedCourt = {
      id: `${Date.now()}`,
      name: name.trim(),
      neighborhood: neighborhood.trim(),
      surface: surface.trim(),
    };

    onAdd(newCourt);
    setError('');
    navigation.navigate('SavedCourts');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.pageContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formCard}>
          <Text style={styles.screenTitle}>Add a Court</Text>
          <Text style={styles.bodyText}>
            Enter the information below. Every field is required.
          </Text>

          <Text style={styles.inputLabel}>Court name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Example: Riverside Courts"
            placeholderTextColor="#7A8C97"
          />

          <Text style={styles.inputLabel}>Neighborhood</Text>
          <TextInput
            style={styles.input}
            value={neighborhood}
            onChangeText={setNeighborhood}
            placeholder="Example: Downtown"
            placeholderTextColor="#7A8C97"
          />

          <Text style={styles.inputLabel}>Playing surface</Text>
          <TextInput
            style={styles.input}
            value={surface}
            onChangeText={setSurface}
            placeholder="Example: Indoor hardwood"
            placeholderTextColor="#7A8C97"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable style={styles.primaryButton} onPress={submitCourt}>
            <Text style={styles.primaryButtonText}>Save Court</Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
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
            CourtConnect is a basketball court guide and personal saved-court
            collection. Users can browse sample locations, view details, add
            their own courts, and delete courts they no longer need.
          </Text>

          <Text style={styles.sectionTitle}>Purpose</Text>
          <Text style={styles.bodyText}>
            The purpose is to help basketball players compare locations and
            keep useful court information stored on their mobile device.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate('SavedCourts')}>
            <Text style={styles.primaryButtonText}>View Saved Courts</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  // The saved-court collection is maintained as an array in React state.
  const [savedCourts, setSavedCourts] = useState<SavedCourt[]>([]);
  const [storageLoaded, setStorageLoaded] = useState(false);

  // Load saved JSON data once when the application starts.
  useEffect(() => {
    const loadCourts = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedValue !== null) {
          setSavedCourts(JSON.parse(storedValue) as SavedCourt[]);
        } else {
          setSavedCourts(STARTER_SAVED_COURTS);
        }
      } catch (error) {
        console.warn('Unable to load saved courts:', error);
        setSavedCourts(STARTER_SAVED_COURTS);
      } finally {
        setStorageLoaded(true);
      }
    };

    loadCourts();
  }, []);

  // Convert the collection to JSON and save after every change.
  useEffect(() => {
    if (!storageLoaded) {
      return;
    }

    const saveCourts = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(savedCourts),
        );
      } catch (error) {
        console.warn('Unable to save courts:', error);
      }
    };

    saveCourts();
  }, [savedCourts, storageLoaded]);

  const addCourt = (court: SavedCourt) => {
    setSavedCourts(currentCourts => [...currentCourts, court]);
  };

  const deleteCourt = (id: string) => {
    setSavedCourts(currentCourts =>
      currentCourts.filter(court => court.id !== id),
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
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
            options={{title: 'Court Guide'}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({route}) => ({title: route.params.court.name})}
          />
          <Stack.Screen name="SavedCourts" options={{title: 'Saved Courts'}}>
            {props => (
              <SavedCourtsScreen
                {...props}
                courts={savedCourts}
                onDelete={deleteCourt}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AddCourt" options={{title: 'Add Court'}}>
            {props => <AddCourtScreen {...props} onAdd={addCourt} />}
          </Stack.Screen>
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
  safeArea: {flex: 1, backgroundColor: '#EDF4F7'},
  pageContent: {padding: 20, paddingBottom: 36},
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
  heroText: {color: '#D9E8F0', fontSize: 18, lineHeight: 26},
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#C6D8E2',
  },
  sectionTitle: {
    color: '#123B56',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 9,
    marginTop: 4,
  },
  bodyText: {color: '#3B5060', fontSize: 16, lineHeight: 23, marginBottom: 14},
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#EE7D2D',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
  },
  primaryButtonText: {color: '#FFFFFF', fontSize: 17, fontWeight: 'bold'},
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#E3F2F3',
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 11,
    borderWidth: 1,
    borderColor: '#84C6CB',
  },
  secondaryButtonText: {color: '#126777', fontSize: 16, fontWeight: 'bold'},
  textButton: {alignItems: 'center', paddingVertical: 14, marginTop: 5},
  textButtonText: {color: '#516A78', fontSize: 15, fontWeight: 'bold'},
  listContent: {padding: 18, paddingBottom: 34},
  listContentGrow: {padding: 18, paddingBottom: 34, flexGrow: 1},
  listHeader: {marginBottom: 6},
  savedHeader: {marginBottom: 18},
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
  savedCourtCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#C4D6E0',
  },
  cardPressed: {opacity: 0.72},
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  courtName: {color: '#123B56', fontSize: 19, fontWeight: 'bold', flex: 1},
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
  courtMeta: {color: '#526775', fontSize: 15, marginBottom: 3},
  deleteButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FCE8E6',
    borderColor: '#E6A7A0',
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 17,
    paddingVertical: 9,
    marginTop: 13,
  },
  deleteButtonText: {color: '#A32F25', fontSize: 14, fontWeight: 'bold'},
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C4D6E0',
    padding: 24,
    alignItems: 'center',
  },
  emptyTitle: {color: '#123B56', fontSize: 20, fontWeight: 'bold'},
  emptyText: {
    color: '#526775',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 8,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#C6D8E2',
  },
  inputLabel: {
    color: '#29495C',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F7FAFB',
    color: '#19384B',
    borderWidth: 1,
    borderColor: '#AFC6D2',
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#B3261E',
    backgroundColor: '#FDECEA',
    borderRadius: 8,
    padding: 11,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cancelButton: {alignItems: 'center', paddingVertical: 14, marginTop: 5},
  cancelButtonText: {color: '#516A78', fontSize: 16, fontWeight: 'bold'},
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
  detailTitle: {color: '#FFFFFF', fontSize: 29, fontWeight: 'bold', marginBottom: 9},
  detailBestFor: {color: '#DCEAF1', fontSize: 16, lineHeight: 23},
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#C4D6E0',
    marginBottom: 14,
  },
  detailRow: {borderTopWidth: 1, borderTopColor: '#E0E9EE', paddingVertical: 11},
  detailLabel: {
    color: '#6A7B87',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  detailValue: {color: '#253E4E', fontSize: 16},
  amenityText: {color: '#365362', fontSize: 16, marginBottom: 7},
  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#C4D6E0',
  },
  aboutAppName: {color: '#123B56', fontSize: 31, fontWeight: 'bold', marginBottom: 5},
  aboutName: {
    color: '#D66320',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

export default App;
