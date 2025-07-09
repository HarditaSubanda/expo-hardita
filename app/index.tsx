import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function Index() {
  // State untuk menyimpan data gambar
  const [images, setImages] = useState(
  Array.from({ length: 9 }, (_, i) => ({
      id: i,
      mainUrl: `https://picsum.photos/200/200?random=${i}`, // Gambar utama
      altUrl: `https://picsum.photos/201/201?random=${i}`, // Gambar alternatif
      currentUrl: `https://picsum.photos/200/200?random=${i}`, // URL saat ini
      scale: 1, // Skala transformasi
    }))
  );

  // Fungsi untuk menangani klik gambar
  const handleImagePress = (id : number) => {
    setImages(prev => prev.map(img => {
      if (img.id === id) {
        const newScale = Math.min(img.scale * 1.2, 2); // Maksimal scale 2
        return {
          ...img,
          currentUrl: img.currentUrl === img.mainUrl ? img.altUrl : img.mainUrl,
          scale: newScale
        };
      }
      return img;
    }));
  };

  return (
    <View style={styles.container}>
      {/* Grid Gambar 3x3 */}
      <View style={styles.gridContainer}>
        {images.map((img) => (
          <TouchableOpacity 
            key={img.id} 
            onPress={() => handleImagePress(img.id)}
          >
            <Image
              source={{ uri: img.currentUrl }}
              style={[
                styles.gridImage,
                { transform: [{ scale: img.scale }] }
              ]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Komponen yang sudah ada */}
      <View style={styles.rectangle}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.triangle} />
      <View style={styles.pill}>
        <MaterialIcons name="person" size={24} color="white" />
        <Text style={styles.pillText}>105841111722</Text>
      </View>
      <View style={{
        backgroundColor: "black",
        borderRadius: 10,
        marginTop: 20
      }}>
        <Text style={{
          color: "red",
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
        }}>Hardita</Text>
        <Text style={{
          color: "white",
          fontWeight: "bold",
        }}>105841111722</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        backgroundColor: "blue",
        borderRadius: 100,
        marginTop: 10
      }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  // Style untuk grid container
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300, // 3x100 + 3x0 border
    marginBottom: 20,
    justifyContent: 'center',
  },
  // Style untuk gambar dalam grid
  gridImage: {
    width: 100,
    height: 100,
    margin: 0,
  },
  rectangle: {
    width: 220,
    height: 110,
    backgroundColor: "#eee",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%",
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 70,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "orange",
    marginBottom: 20,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4a90e2",
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pillText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  }
});