import axios from "axios";
import { MapState } from "../map";

export const OPEN_AI_ENDPOINT =
  "https://api.openai.com/v1/engines/ada/completions";

export const ASSOC_API_ENDPOINT = "/api";

function readSerialized(serializedJavascript: string): MapState {
  return eval("(" + serializedJavascript + ")");
}

export function getMap(userId: string): Promise<MapState> {
  return axios.get(`${ASSOC_API_ENDPOINT}/${userId}/map`).then((response) => {
    const map = readMap(response.data);
    return map;
  });
}

export function getTokens(userId: string): Promise<number> {
  return axios
    .get(`${ASSOC_API_ENDPOINT}/${userId}/tokens`)
    .then((response) => {
      const tokens = JSON.parse(response.data);
      return tokens;
    });
}
