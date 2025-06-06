import { AxiosResponse } from "axios";
import { ArtistaPopularDTO } from "../../types";
import api from "../axios";

const spotifyRequestMapping = "/spotify"

const SpotifyService = () => {
    return {
        getArtistas(): Promise<AxiosResponse<Array<ArtistaPopularDTO>>> {
            return api.get(`${spotifyRequestMapping}/artistas`)
        }
    }
}
export default SpotifyService;