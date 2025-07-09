import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

// --- URL Gambar (Tidak diubah) ---
const mainImageUrls = [
  "https://images.unsplash.com/photo-1751227046868-2fff7ec5ebb7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  "https://images.unsplash.com/photo-1746311507414-bce6f67abb44?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1750778494630-52b400bf3beb?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// Menghitung ukuran sel grid berdasarkan lebar layar
const { width } = Dimensions.get('window');
const GRID_SIZE = 9;
const NUM_COLUMNS = 3;
const CELL_SIZE = Math.floor(width * 0.9 / NUM_COLUMNS); // 90% dari lebar layar dibagi 3

export default function Index() {
  // State untuk menyimpan data gambar.
  const [images, setImages] = useState(
    Array.from({ length: GRID_SIZE }, (_, i) => ({
      id: i,
      mainUrl: mainImageUrls[i],
      altUrl: altImageUrls[i],
      currentUrl: mainImageUrls[i],
      scale: 1,      // Skala awal adalah 1 (ukuran normal)
      clickCount: 0, // Penghitung klik untuk menentukan level zoom
      error: false,
    }))
  );

  /**
   * Fungsi untuk menangani klik pada gambar.
   * Logika diubah untuk memenuhi persyaratan zoom.
   */
  const handleImagePress = (id: number) => {
    setImages(prev => prev.map(img => {
      // Hanya modifikasi gambar yang sesuai dengan ID
      if (img.id === id) {
        const newClickCount = (img.clickCount + 1) % 3; // Siklus 0, 1, 2
        let newScale = 1;

        // FITUR BARU: Menentukan skala berdasarkan jumlah klik
        switch (newClickCount) {
          case 0:
            newScale = 1;    // Klik ke-3: Kembali ke ukuran normal
            break;
          case 1:
            newScale = 1.5;  // Klik ke-1: Membesar 1.5x
            break;
          case 2:
            newScale = 2;    // Klik ke-2: Membesar 2x (maksimal)
            break;
        }
        
        // Ganti ke gambar alternatif pada setiap klik
        const newCurrentUrl = img.currentUrl === img.mainUrl ? img.altUrl : img.mainUrl;

        return {
          ...img,
          currentUrl: newCurrentUrl,
          scale: newScale,
          clickCount: newClickCount,
        };
      }
      // Kembalikan gambar lain ke ukuran normal untuk fokus pada satu gambar
      return { ...img, scale: 1, clickCount: 0 };
    }));
  };

  // Fungsi untuk menangani error saat memuat gambar
  const handleImageError = (id: number) => {
    setImages(prev => prev.map(img =>
      img.id === id ? { ...img, error: true } : img
    ));
  };

  return (
    <View style={styles.container}>
      {/* FITUR BARU: Grid yang konsisten dan responsif */}
      <View style={[styles.gridContainer, { width: CELL_SIZE * NUM_COLUMNS }]}>
        {images.map((img) => (
          <TouchableOpacity
            key={img.id}
            style={[styles.cellContainer, { width: CELL_SIZE, height: CELL_SIZE }]}
            onPress={() => handleImagePress(img.id)}
            activeOpacity={0.8}
          >
            {img.error ? (
              <View style={styles.errorContainer}>
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
      
      {/* Komponen lain yang sudah ada (tidak diubah) */}
      <View style={styles.rectangle}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.triangle} />
      <View style={styles.pill}>
        <MaterialIcons name="person" size={24} color="white" />
        <Text style={styles.pillText}>105841111722</Text>
      </View>
    </View>
  );
}

// --- Stylesheet yang Disesuaikan ---
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    // Overflow hidden untuk memastikan gambar yang diperbesar
    // tidak keluar dari batas container grid secara visual.
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  // FITUR BARU: Style untuk setiap sel di dalam grid
  // Ini memastikan semua area yang dapat diklik memiliki ukuran yang sama.
  cellContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // Z-index penting agar gambar yang diperbesar muncul di atas yang lain
    zIndex: 1,
  },
  // Style untuk gambar di dalam sel
  gridImage: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  rectangle: {
    width: 220,
    height: 110,
    backgroundColor: "#eee",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "80%",
    height: "80%",
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
  },
  pillText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  }
});
