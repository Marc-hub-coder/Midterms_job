import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

const ApplicationFormScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
  });

  const handleApply = () => {
    Alert.alert('Application Submitted', 'We will contact you soon.');
    navigation.navigate('JobFinder');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Contact" style={styles.input} />
      <TextInput placeholder="Why should we hire you?" style={styles.input} multiline />
      <Button title="Submit Application" onPress={handleApply} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 16 },
});

export default ApplicationFormScreen;
