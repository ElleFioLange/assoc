import { StyleSheet, Dimensions } from "react-native";

export const win = Dimensions.get("window");
export const width = win.width * 0.8;
export const height = win.height - win.width + width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  padTop: {
    paddingTop: height * 0.02,
  },
  padTopDouble: {
    paddingTop: height * 0.04,
  },
  marginTop: {
    marginTop: height * 0.02,
  },
  marginTopDouble: {
    marginTop: height * 0.04,
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: height * 0.012 },
    shadowRadius: 10,
    shadowOpacity: 0.25,
  },
  input: {
    backgroundColor: "white",
    width,
    height: height * 0.06,
    borderRadius: width * 0.015,
    padding: width * 0.05,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: width * 0.03,
    height: width * 0.6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.02,
    marginBottom: height * 0.04,
  },
  carouselImage: {
    flex: 1,
    resizeMode: "contain",
  },
  pressable: {
    width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.06,
    borderRadius: width * 0.015,
  },
  answer: {
    fontSize: 20,
    textAlign: "center",
  },
  itemName: {
    fontSize: 15,
  },
  itemDescription: {
    fontSize: 8,
  },
  shelf: {
    width: width,
    height: height / 4,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  shelfItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
});
