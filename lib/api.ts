import { API_URL } from "@/components/const";
import axios from "axios";

export const ApiAuth = axios.create({
  baseURL: API_URL,
});

export const ApiPub = axios.create({
  baseURL: API_URL,
});
