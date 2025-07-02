import { AxiosResponse } from "axios";
import { ArtistaPopularDTO, CardPlaylistDTO, FooterCardDTO, SpotifyLinkDTO, SugestaoPlaylistDTO } from "../../types";
import api from "../axios";

const spotifyRequestMapping = "/spotify"

const SpotifyService = () => {
    return {
        getArtistas(): Promise<AxiosResponse<Array<ArtistaPopularDTO>>> {
            return api.get(`${spotifyRequestMapping}/artistas`)
        },
        getSugestoesPlaylist(): Promise<AxiosResponse<Array<SugestaoPlaylistDTO>>> {
            return api.get(`${spotifyRequestMapping}/sugestoes`)
        },
        getSpotifyLinks(): Promise<AxiosResponse<Array<SpotifyLinkDTO>>> {
            return api.get(`${spotifyRequestMapping}/links`)
        },
        getPlayListCards(): Promise<AxiosResponse<Array<CardPlaylistDTO>>> {
            return api.get(`${spotifyRequestMapping}/playlist`)
        },
        getFooterCards(): Promise<AxiosResponse<Array<FooterCardDTO>>> {
            return api.get(`${spotifyRequestMapping}/footerCards`)
        }
    }
}
export default SpotifyService;