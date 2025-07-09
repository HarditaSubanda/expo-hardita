import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Persegi panjang dengan nama */}
      <View style={styles.rectangle}>
        <Text style={styles.rectangleText}>Hardita</Text>
      </View>

      {/* Segitiga */}
      <View style={styles.triangle} />

      {/* Pil/tabung berdimensi (bukan lingkaran) */}
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
  rectangleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222"
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
    borderRadius: 30, // lebih kecil dari tinggi agar tetap oval, bukan lingkaran
    paddingHorizontal: 32, // lebih panjang agar bentuknya jelas pil/tabung
    paddingVertical: 12,
    marginBottom: 30,
    minWidth: 140, // memastikan bentuk pil, bukan lingkaran
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