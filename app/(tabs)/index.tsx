import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect } from 'react';
import { axiosClient } from '@/utils/axios';
import { Asset } from '@/components/Asset';
import { AddBtn } from '@/components/AddBtn';

type AccessType = {
  accessToken?: string;
  refreshToken?: string;
}
export default function HomeScreen() {
  const data = {
    email: process.env.EXPO_PUBLIC_EMAIL,
    password: process.env.EXPO_PUBLIC_PASS,
  }

  let cred: AccessType = {};
  async function signup (){
    // register - create user
    const res = await axiosClient.post('/auth/signup', data);
    console.log(res.data);
    localStorage.setItem('user', JSON.stringify(res.data));

  };

  async function login (){
    const res = await axiosClient.post('/auth/login', data);
    cred = res.data;
    localStorage.setItem('tokens', JSON.stringify(cred));
  };
  useEffect(() =>{
    signup().then(() => login());
  },[]);

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Token: {cred.accessToken}</ThemedText>
          <ThemedText type="defaultSemiBold">incomes:</ThemedText>
          {/* <Asset title="Food"></Asset> */}
          <AddBtn type="in"></AddBtn>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="defaultSemiBold">assets:</ThemedText>
          {/* <Asset title="Food"></Asset> */}
          <AddBtn type="asset"></AddBtn>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="defaultSemiBold">expense:</ThemedText>
          {/* <Asset title="Food"></Asset> */}
          <AddBtn type="out"></AddBtn>
        </ThemedView>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingVertical: 4,
  },

});
