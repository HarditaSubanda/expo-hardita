import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

// --- URL Gambar Statis ---
// Mendefinisikan 9 URL gambar utama yang akan digunakan dalam grid.
const mainImageUrls = [
  "https://images.unsplash.com/photo-1549492423-400259a5e5a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
];

// Mendefinisikan 9 URL gambar alternatif yang akan digunakan saat gambar utama diklik.
const altImageUrls = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1488161628813-04466f872d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
];


export default function Index() {
  // State untuk menyimpan data gambar, diinisialisasi dengan URL statis.
  const [images, setImages] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      mainUrl: mainImageUrls[i],
      altUrl: altImageUrls[i],
      currentUrl: mainImageUrls[i],
      scale: 1,
      error: false, // State baru untuk melacak error pemuatan gambar.
    }))
  );

  // Fungsi untuk menangani klik pada gambar.
  const handleImagePress = (id: number) => {
    setImages(prev => prev.map(img => {
      if (img.id === id) {
        // Memperbesar skala gambar, maksimal 2x.
        const newScale = Math.min(img.scale * 1.2, 2); 
        // Mengganti URL gambar antara mainUrl dan altUrl.
        return {
          ...img,
          currentUrl: img.currentUrl === img.mainUrl ? img.altUrl : img.mainUrl,
          scale: newScale
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
            {/* Tampilkan ikon error jika gambar gagal dimuat, jika tidak, tampilkan gambar. */}
            {img.error ? (
              <View style={[styles.gridImage, styles.errorContainer]}>
                <MaterialIcons name="broken-image" size={40} color="#ccc" />
              </View>
            ) : (
              <Image
                source={{ uri: img.currentUrl }}
                style={[
                  styles.gridImage,
                  { transform: [{ scale: img.scale }] }
                ]}
                resizeMode="cover"
                onError={() => handleImageError(img.id)} // Panggil fungsi penanganan error jika pemuatan gagal.
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Komponen yang sudah ada sebelumnya */}
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
  // Style untuk grid container.
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    marginBottom: 20,
    justifyContent: 'center',
  },
  // Style untuk gambar dalam grid, memastikan ukuran yang sama persis.
  gridImage: {
    width: 100,  // Lebar gambar tetap
    height: 100, // Tinggi gambar tetap
    margin: 0,
    backgroundColor: '#f0f0f0', // Warna latar belakang untuk placeholder
  },
  // Style untuk container error.
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