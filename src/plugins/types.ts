import { EmitterSkeleton } from "./api/emitter";
import { StateUpdateState } from "./api/state";
import {
    AnimeStatusType as MyAnimeListAnimeStatusType,
    MangaStatusType as MyAnimeListMangaStatusType
} from "./integrations/myanimelist";
import { StatusType as AniListStatusType } from "./integrations/anilist";

export const EnabledDisabled = ["enabled", "disabled"] as const;
export type EnabledDisabledType = typeof EnabledDisabled[number];

export const UpdateChannels = ["latest", "beta", "alpha"] as const;
export type UpdateChannelsType = typeof UpdateChannels[number];

export const SideBarPosition = ["left", "right"] as const;
export type SideBarPositionType = typeof SideBarPosition[number];

export const TenToHundredPercent = [
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100
] as const;
export type TenToHundredPercentType = typeof TenToHundredPercent[number];

export interface Settings {
    updateChannel: UpdateChannelsType;
    incognito: EnabledDisabledType;
    sideBarPosition: SideBarPositionType;
    discordRpc: EnabledDisabledType;
    discordRpcPrivacy: EnabledDisabledType;
    autoDetectTheme: EnabledDisabledType;
    darkMode: EnabledDisabledType;
    autoPlay: EnabledDisabledType;
    autoNext: EnabledDisabledType;
    defaultPlayerWidth: TenToHundredPercentType;
    defaultPageWidth: TenToHundredPercentType;
}

export interface LastLeftEntity {
    title: string;
    episode?: {
        episode: string;
        watched: number;
        total: number;
    };
    reading?: {
        volume: string;
        chapter: string;
        read: string;
        total: string;
    };
    updatedAt: number;
    route: {
        route: string;
        queries: Record<string, string>;
    };
    showPopup: boolean;
}

export interface RecentlyBrowsedEntity {
    terms: string;
    searchedAt: number;
    resultsFound: number;
    route: {
        route: string;
        queries: Record<string, string | string[]>;
    };
}

export interface RecentlyViewedEntity {
    title: string;
    image: string;
    plugin: string;
    viewedAt: number;
    route: {
        route: string;
        queries: Record<string, string>;
    };
}

export interface BookmarkedEntity {
    title: string;
    image: string;
    plugin: string;
    bookmarkedAt: number;
    route: {
        route: string;
        queries: Record<string, string | string[]>;
    };
}

export interface AniListConnectionCachedTitles {
    id: number;
    altURLs: string[];
}

export interface MyAnimeListConnectionCachedTitles {
    id: string;
    altURLs: string[];
}

export interface GlobalStateProps {
    autoDetectTheme: boolean;
    isDarkTheme: boolean;
    incognito: boolean;
    sideBar: SideBarPositionType;
}

export interface MyAnimeListAnimeConnectionSubscriber {
    episode: number;
    status?: MyAnimeListAnimeStatusType;
    autoComplete?: boolean;
}

export interface MyAnimeListMangaConnectionSubscriber {
    chapter: number;
    volume?: number;
    status?: MyAnimeListMangaStatusType;
    autoComplete?: boolean;
}

export interface AniListAnimeConnectionSubscriber {
    episode: number;
    status?: AniListStatusType;
    autoComplete?: boolean;
}

export interface AniListMangaConnectionSubscriber {
    chapter: number;
    volume?: number;
    status?: AniListStatusType;
    autoComplete?: boolean;
}

export interface EventBus extends EmitterSkeleton {
    "update-MAL-anime-status": (
        status: MyAnimeListAnimeConnectionSubscriber
    ) => void;
    "set-MAL-anime-episode": (episode: number | null) => void;

    "update-MAL-manga-status": (
        status: MyAnimeListMangaConnectionSubscriber
    ) => void;
    "set-MAL-manga-volume": (volume: number | null) => void;
    "set-MAL-manga-chapter": (chapter: number | null) => void;

    "update-AniList-anime-status": (
        status: AniListAnimeConnectionSubscriber
    ) => void;
    "set-AniList-anime-episode": (episode: number | null) => void;

    "update-AniList-manga-status": (
        status: AniListMangaConnectionSubscriber
    ) => void;
    "set-AniList-manga-volume": (volume: number | null) => void;
    "set-AniList-manga-chapter": (chapter: number | null) => void;

    "state-update": (state: StateUpdateState<GlobalStateProps>) => void;
}
