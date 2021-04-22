import { StyleSheet, Dimensions } from "react-native";

export const win = Dimensions.get("window");
export const width = win.width * 0.8;

// Accent blue = #1122f4

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
  avenir: {
    fontFamily: "Avenir Next",
  },
  whiteBg: {
    backgroundColor: "white",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: width * 0.02 },
    shadowRadius: 10,
    shadowOpacity: 0.25,
  },
  border: {
    borderColor: "#0000ff40",
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    backgroundColor: "white",
    width,
    height: width * 0.15,
    borderRadius: width * 0.015,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Avenir Next",
    fontWeight: "400",
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
  pressableContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-between",
    justifyContent: "space-between",
    height: width,
    width,
  },
  pressable: {
    width: width * 0.475,
    height: width * 0.475,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: width * 0.02,
  },
  answer: {
    fontSize: 20,
    textAlign: "center",
  },
  itemName: {
    width: width,
    textAlign: "left",
    fontSize: 25,
    fontWeight: "600",
    // paddingLeft: width * 0.05,
    // paddingHorizontal: width * 0.1,
  },
  itemDescription: {
    fontSize: 15,
    fontWeight: "300",
    width: width,
    textAlign: "left",
    // paddingHorizontal: width * 0.1,
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
