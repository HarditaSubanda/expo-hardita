import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

// --- DATA GAMBAR UNTUK GRID ---
// Kita definisikan data gambar di sini. Setiap objek merepresentasikan satu sel di grid.
// Saya menggunakan gambar placeholder dari picsum.photos untuk contoh.
// Anda bisa menggantinya dengan URL gambar Anda sendiri.
const initialGridImages = [
  // Baris 1
  { id: 1, mainSrc: 'https://picsum.photos/id/10/200', altSrc: 'https://picsum.photos/id/11/200', isFlipped: false, scale: 1 },
  { id: 2, mainSrc: 'https://picsum.photos/id/12/200', altSrc: 'https://picsum.photos/id/13/200', isFlipped: false, scale: 1 },
  { id: 3, mainSrc: 'https://picsum.photos/id/14/200', altSrc: 'https://picsum.photos/id/15/200', isFlipped: false, scale: 1 },
  // Baris 2
  { id: 4, mainSrc: 'https://picsum.photos/id/16/200', altSrc: 'https://picsum.photos/id/17/200', isFlipped: false, scale: 1 },
  { id: 5, mainSrc: 'https://picsum.photos/id/18/200', altSrc: 'https://picsum.photos/id/19/200', isFlipped: false, scale: 1 },
  { id: 6, mainSrc: 'https://picsum.photos/id/20/200', altSrc: 'https://picsum.photos/id/21/200', isFlipped: false, scale: 1 },
  // Baris 3
  { id: 7, mainSrc: 'https://picsum.photos/id/22/200', altSrc: 'https://picsum.photos/id/23/200', isFlipped: false, scale: 1 },
  { id: 8, mainSrc: 'https://picsum.photos/id/24/200', altSrc: 'https://picsum.photos/id/25/200', isFlipped: false, scale: 1 },
  { id: 9, mainSrc: 'https://picsum.photos/id/26/200', altSrc: 'https://picsum.photos/id/27/200', isFlipped: false, scale: 1 },
];


export default function Index() {
  // --- STATE UNTUK MENGELOLA GRID GAMBAR ---
  const [gridImages, setGridImages] = useState(initialGridImages);

  // --- FUNGSI UNTUK MENANGANI KLIK PADA GAMBAR ---
  const handleImagePress = (imageId) => {
    setGridImages(currentImages =>
      currentImages.map(image => {
        if (image.id === imageId) {
          // Hitung skala baru, pastikan tidak melebihi 2
          const newScale = Math.min(image.scale * 1.2, 2);
          
          return {
            ...image,
            // Balik status gambar (utama -> alternatif atau sebaliknya)
            isFlipped: !image.isFlipped,
            // Terapkan skala baru
            scale: newScale,
          };
        }
        // Kembalikan gambar lain tanpa perubahan
        return image;
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* =================================================== */}
      {/* ======= KOMPONEN LAMA (TIDAK DIUBAH) ======== */}
      {/* =================================================== */}
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
      {/* =================================================== */}
      {/* =========== AKHIR DARI KOMPONEN LAMA ============ */}
      {/* =================================================== */}


      {/* =================================================== */}
      {/* ======= GRID GAMBAR 3x3 (KOMPONEN BARU) ======= */}
      {/* =================================================== */}
      <View style={styles.gridContainer}>
        {gridImages.map(image => (
          <TouchableOpacity
            key={image.id}
            onPress={() => handleImagePress(image.id)}
            style={styles.gridCell}
          >
            <Image
              source={{ uri: image.isFlipped ? image.altSrc : image.mainSrc }}
              style={[
                styles.gridImage,
                { transform: [{ scale: image.scale }] } // Terapkan skala dinamis
              ]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // --- Style Lama (Tidak Diubah) ---
  container: {
    flex: 1,
    // justifyContent diubah ke flex-start agar konten tidak terpusat secara vertikal
    // dan bisa di-scroll jika melebihi layar
    justifyContent: "flex-start", 
    alignItems: "center",
    backgroundColor: "#fff",
    // Tambahkan padding atas agar tidak terlalu mepet
    paddingTop: 60, 
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
    marginBottom: 20, // Mengurangi margin bottom agar grid tidak terlalu jauh
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
  },

  // --- Style Baru untuk Grid ---
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '95%', // Lebar kontainer grid
    marginTop: 20, // Jarak dari komponen di atasnya
  },
  gridCell: {
    width: 100, // Lebar setiap sel
    height: 100, // Tinggi setiap sel
    margin: 5, // Jarak antar sel
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden', // Penting agar gambar tidak keluar dari border radius saat membesar
  },
  gridImage: {
    width: '100%',
    height: '100%',
  }
});