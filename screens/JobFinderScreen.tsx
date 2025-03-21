import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import uuid from 'react-native-uuid';
import { Job } from '../context/Job';

const JobFinderScreen = ({ navigation }: any) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://empllo.com/api/v1');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result);  // Log the full response

      // Access the nested "jobs" array
      if (result.jobs && Array.isArray(result.jobs)) {
        const jobsWithIds = result.jobs.map((job: any) => ({
          id: uuid.v4().toString(),
          title: job.title || 'No Title',
          company: job.company || 'Unknown Company',
          salary: job.salary || 'Not specified',
        }));

        setJobs(jobsWithIds);
      } else {
        console.error('Unexpected API structure:', result);
        setError('Unexpected API response format.');
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for jobs..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.jobCard}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.company}</Text>
              <Text>Salary: {item.salary}</Text>
              <Button
                title="Save Job"
                onPress={() => console.log('Saved:', item.title)}
              />
              <Button
                title="Apply"
                onPress={() => navigation.navigate('ApplicationForm', { job: item })}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
  },
  jobCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    borderRadius: 8,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 10 }
});

export default JobFinderScreen;
