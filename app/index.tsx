import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

// Mendefinisikan URL gambar utama dan alternatif secara statis
const mainImageUrls = [
  "https://images.unsplash.com/photo-1750688650545-d9e2a060dfe8?q=80&w=806&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
];

const altImageUrls = [
  "https://images.unsplash.com/photo-1750778494630-52b400bf3beb?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1750755072927-4221f5018635?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Index() {
  // State untuk menyimpan data gambar.
  // Setiap objek gambar memiliki properti 'scale' sendiri untuk penskalaan individual.
  const [images, setImages] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      mainUrl: mainImageUrls[i],
      altUrl: altImageUrls[i],
      currentUrl: mainImageUrls[i],
      scale: 1, // Skala awal untuk setiap gambar
      error: false,
    }))
  );

  // Fungsi untuk menangani klik pada gambar.
  const handleImagePress = (id: number) => {
    setImages(prev => prev.map(img => {
      // Hanya modifikasi gambar yang sesuai dengan ID yang diklik.
      if (img.id === id) {
        // FITUR: Penskalaan 1.2x dan pembatasan maksimum 2x.
        const newScale = Math.min(img.scale * 1.2, 2);
        return {
          ...img,
          currentUrl: img.currentUrl === img.mainUrl ? img.altUrl : img.mainUrl,
          scale: newScale // Terapkan skala baru
        };
      }
      return img;
    }));
  };

  // Fungsi untuk menangani error saat memuat gambar.
  const handleImageError = (id: number) => {
    setImages(prev => prev.map(img =>
      img.id === id ? { ...img, error: true } : img
    ));
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
            {img.error ? (
              <View style={[styles.gridImage, styles.errorContainer]}>
                <MaterialIcons name="broken-image" size={40} color="#ccc" />
              </View>
            ) : (
              <Image
                source={{ uri: img.currentUrl }}
                style={[
                  styles.gridImage,
                  // Terapkan transformasi skala individual
                  { transform: [{ scale: img.scale }] }
                ]}
                resizeMode="cover"
                onError={() => handleImageError(img.id)}
              />
            )}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    marginBottom: 20,
    justifyContent: 'center',
  },
  // FITUR: Memastikan semua sel gambar memiliki ukuran yang sama.
  gridImage: {
    width: 100,  // Lebar gambar tetap
    height: 100, // Tinggi gambar tetap
    margin: 0,
    backgroundColor: '#f0f0f0',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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