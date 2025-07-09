import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

// Mendefinisikan URL gambar utama dan alternatif secara statis
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

export default function Index() {
  // State untuk menyimpan data gambar.
  const [images, setImages] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      mainUrl: mainImageUrls[i],
      altUrl: altImageUrls[i],
      currentUrl: mainImageUrls[i],
      scale: 1, // FITUR: Skala individual untuk setiap gambar
      clickCount: 0, // FITUR: Penghitung klik untuk membatasi pembesaran
      error: false,
    }))
  );

  // Fungsi untuk menangani klik pada gambar.
  const handleImagePress = (id: number) => {
    setImages(prev => prev.map(img => {
      // Hanya modifikasi gambar yang sesuai dengan ID
      if (img.id === id) {
        // FITUR: Ganti ke gambar alternatif pada setiap klik
        const newCurrentUrl = img.currentUrl === img.mainUrl ? img.altUrl : img.mainUrl;
        
        // FITUR: Batasi pembesaran hingga maksimum 2 kali klik
        if (img.clickCount < 2) {
          // FITUR: Skala naik sebesar 1.2x
          const newScale = img.scale * 1.2;
          return {
            ...img,
            currentUrl: newCurrentUrl,
            scale: newScale,
            clickCount: img.clickCount + 1, // Tambah hitungan klik
          };
        }
        
        // Jika sudah 2x klik, hanya ganti gambar tanpa mengubah skala
        return {
          ...img,
          currentUrl: newCurrentUrl,
        };
      }
      return img;
    }));
  };

  const handleImageError = (id: number) => {
    setImages(prev => prev.map(img =>
      img.id === id ? { ...img, error: true } : img
    ));
  };

  return (
    <View style={styles.container}>
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
      
      {/* Komponen lain yang sudah ada */}
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
    // Overflow hidden untuk mencegah gambar yang diperbesar keluar dari container grid
    overflow: 'hidden', 
  },
  // FITUR: Memastikan semua sel gambar memiliki ukuran yang sama.
  gridImage: {
    width: 100,
    height: 100,
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
  },
  pillText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  }
});