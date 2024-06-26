import React from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Button, useTheme } from 'react-native-paper';

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 1,
};

const ShowImagePicker = (setURI: (uri: string) => void, maxWidth?: number) => {
  launchImageLibrary({ ...options }, response => {
    console.log('Image Picker Response: ', response);
    if (response.errorCode) {
      if (response.errorCode == 'permission') {
        Alert.alert('App has no storage permission');
      }
      if (response.errorCode == 'others') {
        Alert.alert("Unknown error. Can't access gallery");
        console.log('Unknown image picker response', response.errorMessage);
      }
    } else if (response.assets) {
      console.log('Image Picker assets', response.assets);
      const asset = response.assets[0];
      setURI(asset.uri!);
    }
  });
};

const URImage = (uri: string, width?: number, height?: number, style?: any) => {
  return (
    <View>
      <Image
        source={{ uri: uri, width: width, height: height }}
        style={{
          ...style,
          ...styles.urimage,
        }}
      />
    </View>
  );
};

const ImageSelector = (
  imageUri: string | null,
  setImageUri: (uri: string) => void,
) => {
  const theme = useTheme();
  return (
    <>
      <Button
        icon="image"
        mode="outlined"
        textColor={theme.colors.onSurface}
        onPress={() => ShowImagePicker(setImageUri)}>
        Choose image
      </Button>
      {imageUri && URImage(imageUri)}
    </>
  );
};

const styles = StyleSheet.create({
  urimage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    overflow: 'hidden',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export { ShowImagePicker, URImage, ImageSelector };
