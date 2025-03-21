import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Job } from '../context/Job';

const SavedJobsScreen = ({ navigation }: any) => {
  const savedJobs: Job[] = [];

  return (
    <View style={styles.container}>
      <Text>Saved Jobs</Text>
      {savedJobs.length === 0 ? (
        <Text>No saved jobs yet.</Text>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.jobCard}>
              <Text>{item.title}</Text>
              <Button title="Remove Job" onPress={() => {}} />
              <Button title="Apply" onPress={() => navigation.navigate('ApplicationForm', { job: item })} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  jobCard: { padding: 16, borderWidth: 1, marginBottom: 8, borderRadius: 8 },
});

export default SavedJobsScreen;
