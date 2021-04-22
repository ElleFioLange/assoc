import { StyleSheet, Dimensions } from "react-native";

export const win = Dimensions.get("window");
export const width = win.width * 0.8;
export const barHeight = width * 0.15;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  padTop: {
    paddingTop: width * 0.05,
  },
  padTopDouble: {
    paddingTop: width * 0.1,
  },
  marginTop: {
    marginTop: width * 0.05,
  },
  marginTopDouble: {
    marginTop: width * 0.1,
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: width * 0.02 },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    borderColor: "#0000ff40",
    borderWidth: StyleSheet.hairlineWidth,
  },
  border: {
    borderColor: "#0000ff33",
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    backgroundColor: "white",
    width,
    height: barHeight,
    borderRadius: width * 0.015,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: width * 0.03,
    height: width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.02,
    marginBottom: width * 0.1,
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
    height: barHeight,
    borderRadius: width * 0.02,
  },
  pressableText: {
    fontSize: 20,
    fontWeight: "500",
  },
  whiteBg: {
    backgroundColor: "white",
  },
  answer: {
    fontSize: 20,
    textAlign: "center",
  },
  itemName: {
    fontSize: 25,
    paddingHorizontal: width * 0.1,
  },
  itemDescription: {
    fontSize: 15,
    paddingHorizontal: width * 0.1,
  },
  shelf: {
    width: width,
    height: width,
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
