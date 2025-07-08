import { Text, View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Persegi panjang dengan gambar */}
      <View style={styles.rectangle}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Segitiga */}
      <View style={styles.triangle} />

      {/* Pil/tabung berdimensi */}
      <View style={styles.pill}>
        <MaterialIcons name="person" size={24} color="white" />
        <Text style={styles.pillText}>105841111722</Text>
      </View>

      {/* Komponen lama */}
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
    elevation: 4, // efek dimensi (shadow)
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