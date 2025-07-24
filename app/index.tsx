import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { MaterialIcons, FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';


const daftarNama = Array.from({ length: 130 }, (_, i) => {
  const nomor = i + 1;
  switch (nomor) {
    case 113: return "113 M.RAY TOGUBU";
    case 114: return "114 JEY JEY ASBAR";
    case 115: return "115 REZKI ASRIANI";
    case 118: return "118 ARI AHMAD DAHRIL";
    case 121: return "121 ANNISA ALFRINI";
    case 122: return "122 DZULVIANA";
    default: return `${nomor} tidak diketahui`;
  }
});

// Fungsi untuk mendapatkan nama sebelum dan sesudah urutan tertentu
const getNamaSekitar = (urutan: number, total: number, sebelum: number, sesudah: number) => {
  const namaSebelum = [];
  const namaSesudah = [];
  const index = urutan - 1; // Ubah urutan 1-based menjadi index 0-based

  // Ambil 5 nama sebelumnya dengan logika circular
  for (let i = 1; i <= sebelum; i++) {
    const targetIndex = (index - i + total) % total;
    namaSebelum.push(daftarNama[targetIndex]);
  }

  // Ambil 5 nama setelahnya dengan logika circular
  for (let i = 1; i <= sesudah; i++) {
    const targetIndex = (index + i) % total;
    namaSesudah.push(daftarNama[targetIndex]);
  }

  return { namaSebelum, namaSesudah };
};


const NIM_URUTAN = 117; // Tiga digit terakhir NIM
const TOTAL_NAMA = 130;
const { namaSebelum, namaSesudah } = getNamaSekitar(NIM_URUTAN, TOTAL_NAMA, 5, 5);


// --- KOMPONEN GAMBAR (TIDAK DIUBAH) ---
const initialGridImages = [
  { id: 1, mainSrc: 'https://picsum.photos/id/10/200', altSrc: 'https://picsum.photos/id/11/200', isFlipped: false, scale: 1 },
  { id: 2, mainSrc: 'https://picsum.photos/id/12/200', altSrc: 'https://picsum.photos/id/13/200', isFlipped: false, scale: 1 },
  { id: 3, mainSrc: 'https://picsum.photos/id/14/200', altSrc: 'https://picsum.photos/id/15/200', isFlipped: false, scale: 1 },
  { id: 4, mainSrc: 'https://picsum.photos/id/16/200', altSrc: 'https://picsum.photos/id/17/200', isFlipped: false, scale: 1 },
  { id: 5, mainSrc: 'https://picsum.photos/id/18/200', altSrc: 'https://picsum.photos/id/19/200', isFlipped: false, scale: 1 },
  { id: 6, mainSrc: 'https://picsum.photos/id/20/200', altSrc: 'https://picsum.photos/id/21/200', isFlipped: false, scale: 1 },
  { id: 7, mainSrc: 'https://picsum.photos/id/22/200', altSrc: 'https://picsum.photos/id/23/200', isFlipped: false, scale: 1 },
  { id: 8, mainSrc: 'https://picsum.photos/id/24/200', altSrc: 'https://picsum.photos/id/25/200', isFlipped: false, scale: 1 },
  { id: 9, mainSrc: 'https://picsum.photos/id/26/200', altSrc: 'https://picsum.photos/id/27/200', isFlipped: false, scale: 1 },
];


// 1. Data untuk 10 ikon yang berbeda
const iconData = [
  { id: 1, family: 'MaterialIcons', name: 'home', text: 'Home', color: '#e74c3c' },
  { id: 2, family: 'FontAwesome', name: 'star', text: 'Star', color: '#f1c40f' },
  { id: 3, family: 'Ionicons', name: 'settings', text: 'Settings', color: '#3498db' },
  { id: 4, family: 'AntDesign', name: 'heart', text: 'Heart', color: '#e91e63' },
  { id: 5, family: 'MaterialIcons', name: 'camera-alt', text: 'Camera', color: '#9b59b6' },
  { id: 6, family: 'FontAwesome', name: 'send', text: 'Send', color: '#2ecc71' },
  { id: 7, family: 'Ionicons', name: 'notifications', text: 'Alerts', color: '#e67e22' },
  { id: 8, family: 'AntDesign', name: 'user', text: 'Profile', color: '#1abc9c' },
  { id: 9, family: 'FontAwesome', name: 'folder-open', text: 'Files', color: '#34495e' },
  { id: 10, family: 'Ionicons', name: 'cart', text: 'Cart', color: '#7f8c8d' },
];

// 2. Komponen helper untuk merender ikon berdasarkan nama keluarga
type IconDisplayProps = {
  family: 'MaterialIcons' | 'FontAwesome' | 'Ionicons' | 'AntDesign';
  name: string;
  size: number;
  color: string;
};

const IconDisplay = (props: IconDisplayProps) => {
  const { family, name, size, color } = props;
  switch (family) {
    case 'MaterialIcons':
      return <MaterialIcons name={name as any} size={size} color={color} />;
    case 'FontAwesome':
      return <FontAwesome name={name as any} size={size} color={color} />;
    case 'Ionicons':
      return <Ionicons name={name as any} size={size} color={color} />;
    case 'AntDesign':
      return <AntDesign name={name as any} size={size} color={color} />;
    default:
      return null;
  }
};



export default function Index() {
  const [gridImages, setGridImages] = useState(initialGridImages);

  // --- BAGIAN FONT ---
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Oswald-Regular': require('../assets/fonts/Oswald-Regular.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'RobotoFlex-Variable': require('../assets/fonts/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf'),
    'Inter-Variable': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'Montserrat-Variable': require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
    'SourceSans3-Variable': require('../assets/fonts/SourceSans3-VariableFont_wght.ttf'),
    'PlayfairDisplay-Variable': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
  });

  const namaFonts = [
    'Poppins-Regular', 'Poppins-Bold', 'Oswald-Regular', 'Lato-Regular', 'Lato-Bold',
    'RobotoFlex-Variable', 'Inter-Variable', 'Montserrat-Variable', 'SourceSans3-Variable', 'PlayfairDisplay-Variable',
  ];

  const handleImagePress = (imageId: number) => {
    setGridImages(currentImages =>
      currentImages.map(image => {
        if (image.id === imageId) {
          const newScale = Math.min(image.scale * 1.2, 2);
          return { ...image, isFlipped: !image.isFlipped, scale: newScale };
        }
        return image;
      })
    );
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
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
      <View style={styles.textContainer}>
        <Text style={styles.redText}>Hardita</Text>
        <Text style={styles.whiteText}>105841111722</Text>
      </View>
      <View style={styles.blueCircle}></View>

      
      <View style={styles.namaContainer}>
        <Text style={styles.namaHeader}>5 Nama Sebelum (Urutan 117)</Text>
        {namaSebelum.map((nama, index) => (
          <Text key={index} style={[styles.namaItem, { fontFamily: namaFonts[index] }]}>
            {116 - index}. {nama}
          </Text>
        ))}
        <Text style={styles.namaHeader}>5 Nama Setelah (Urutan 117)</Text>
        {namaSesudah.map((nama, index) => (
          <Text key={index} style={[styles.namaItem, { fontFamily: namaFonts[index + 5] }]}>
            {118 + index}. {nama}
          </Text>
        ))}
      </View>

      {/* --- MULAI BAGIAN BARU: TAMPILAN IKON --- */}
      <View style={styles.iconSectionContainer}>
        <Text style={styles.namaHeader}>10 Ikon Berbeda</Text>
        <View style={styles.iconGridContainer}>
          {iconData.map(icon => (
            <View key={icon.id} style={styles.iconCell}>
              <IconDisplay
                family={icon.family as 'MaterialIcons' | 'FontAwesome' | 'Ionicons' | 'AntDesign'}
                name={icon.name}
                size={40}
                color={icon.color}
              />
              <Text style={styles.iconLabelText}>{icon.text}</Text>
            </View>
          ))}
        </View>
      </View>
     

      <View style={styles.gridContainer}>
        {gridImages.map(image => (
          <TouchableOpacity
            key={image.id}
            onPress={() => handleImagePress(image.id)}
            style={styles.gridCell}
          >
            <Image
              source={{ uri: image.isFlipped ? image.altSrc : image.mainSrc }}
              style={[styles.gridImage, { transform: [{ scale: image.scale }], borderRadius: 8 }]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... (semua style lama tetap ada di sini)
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 60,
    paddingHorizontal: 20,
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
    marginBottom: 20,
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
  textContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  redText: {
    color: "red",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  whiteText: {
    color: "white",
    fontWeight: "bold",
  },
  blueCircle: {
    width: 50,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 100,
    marginTop: 10
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 330,
    marginTop: 20,
  },
  gridCell: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  namaContainer: {
    width: '100%',
    maxWidth: 330,
    marginTop: 25,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  namaHeader: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 5,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  namaItem: {
    fontSize: 16,
    paddingVertical: 4,
    color: '#555',
  },
  // --- STYLE BARU UNTUK TAMPILAN IKON ---
  iconSectionContainer: {
    width: '100%',
    maxWidth: 330,
    marginTop: 25,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  iconGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  iconCell: {
    width: '30%', // Membuat 3 kolom
    alignItems: 'center',
    marginVertical: 15,
  },
  iconLabelText: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular'
  },
});
