import {Destination, DestinationType, Intersection} from "../types/destination";
import {BOURG_PALETTE} from "./destinations/bourg_palette";
import {JADIELLE} from "./destinations/jadielle";
import {FORET_JADE} from "./destinations/foret_jade";
import {ARGENTA} from "./destinations/argenta";
import {COL_DE_MONTAGNE} from "./destinations/col_montagne";
import {MONT_SELENITE} from "./destinations/mont_selenite";
import {CRAMOISILE} from "./destinations/cramoisile";
import {MONT_BRAISE} from "./destinations/mont_braise";
import {COLLINE_ROYALE} from "./destinations/colline_royale";
import {CELADOPOLE} from "./destinations/celadopole";
import {AZURIA} from "./destinations/azuria";
import {GROTTE_AZUREE} from "./destinations/grotte_azuree";
import {CENTRALE} from "./destinations/centrale";
import {PENSION} from "./destinations/pension";
import {LAVANVILLE} from "./destinations/lavanville";
import {SAFRANIA} from "./destinations/safrania";
import {TOUR_POKEMON} from "./destinations/tour_pokemon";
import {DOJO} from "./destinations/dojo";
import {MAISON_PSY} from "./destinations/maison_psy";
import {CARMIN} from "./destinations/carmin";
import {CAVE_TAUPIQUEUR_EST, CAVE_TAUPIQUEUR_OUEST} from "./destinations/cave_taupiqueur";
import {OCEANE_CARMIN, OCEANE_CRAMOISILE, OCEANE_AZURIA} from "./destinations/oceane";
import {PISTE_CYCLABLE} from "./destinations/piste_cyclable";
import {FALAISES} from "./destinations/falaises";
import {CAMP_NOMADE} from "./destinations/camp_nomade";
import {PARMANIE} from "./destinations/parmanie";
import {PARC_SAFARI} from "./destinations/parc_safari";
import {ILES_ECUME} from "./destinations/iles_ecume";
import {CHAMPS_VERDOYANTS} from "./destinations/champs_verdoyants";
import { ROUTE_VICTOIRE_ENTREE, ROUTE_VICTOIRE_SORTIE } from "./destinations/route_victoire";
import { LIGUE } from "./destinations/ligue";


export const DESTINATIONS: { [ref: string]: Destination } = {
    BOURG_PALETTE,
    JADIELLE,
    CAVE_TAUPIQUEUR_OUEST,
    CAVE_TAUPIQUEUR_EST,
    FORET_JADE,
    ARGENTA,
    COLLINE_ROYALE,
    COL_DE_MONTAGNE,
    MONT_SELENITE,
    AZURIA,
    GROTTE_AZUREE,
    PENSION,
    CENTRALE,
    LAVANVILLE,
    TOUR_POKEMON,
    SAFRANIA,
    DOJO,
    CELADOPOLE,
    MAISON_PSY,
    CARMIN,
    OCEANE_CARMIN,
    OCEANE_CRAMOISILE,
    OCEANE_AZURIA,
    FALAISES,
    CAMP_NOMADE,
    CHAMPS_VERDOYANTS,
    PARMANIE,
    PARC_SAFARI,
    PISTE_CYCLABLE,
    ILES_ECUME,
    CRAMOISILE,
    MONT_BRAISE,
    ROUTE_VICTOIRE_ENTREE,
    ROUTE_VICTOIRE_SORTIE,
    LIGUE
}

export const FAST_TRAVEL_DESTINATIONS = [
    OCEANE_CARMIN,
    OCEANE_CRAMOISILE,
    OCEANE_AZURIA,
    CAVE_TAUPIQUEUR_OUEST,
    CAVE_TAUPIQUEUR_EST,
    ROUTE_VICTOIRE_ENTREE,
    ROUTE_VICTOIRE_SORTIE
]

export const FAST_TRAVELS: Map<Destination, Destination> = new Map([
    [OCEANE_AZURIA, OCEANE_CARMIN],
    [OCEANE_CARMIN, OCEANE_CRAMOISILE],
    [OCEANE_CRAMOISILE, OCEANE_AZURIA],
    [CAVE_TAUPIQUEUR_OUEST, CAVE_TAUPIQUEUR_EST],
    [CAVE_TAUPIQUEUR_EST, CAVE_TAUPIQUEUR_OUEST],
    [ROUTE_VICTOIRE_ENTREE, ROUTE_VICTOIRE_SORTIE],
    [ROUTE_VICTOIRE_SORTIE, ROUTE_VICTOIRE_ENTREE]
])

export const INTERSECTIONS: Intersection[] = [
    {
        ref: "i1",
        coordinates: [136,72],
        nextDestinations: {
            ARGENTA: [[-2,0]],
            COLLINE_ROYALE: [[2,0]],
            CELADOPOLE: [[0,2]]
        }
    },
    {
        ref: "i2",
        coordinates: [152,40],
        nextDestinations: {
            COL_DE_MONTAGNE: [[-2,0]],
            AZURIA: [[4, 0]],
            MONT_SELENITE: [[0,-1]]
        }
    },
    {
        ref: "i3",
        coordinates: [248,40],
        nextDestinations: {
            AZURIA: [[-2, 0]],
            OCEANE_AZURIA: [[0,-1],[1,0],[0,-1]],
            CENTRALE: [[0,1],[1,0],[0,1]]
        }
    },
    {
        ref: "i4",
        coordinates: [264,168],
        nextDestinations: {
            CAVE_TAUPIQUEUR_EST: [[0,-1]],
            FALAISES: [[2, 0]],
            CARMIN: [[-3,0]]
        }
    },
    {
        ref: "i5",
        coordinates: [88,252],
        nextDestinations: {
            BOURG_PALETTE: [[0,-1.5],[-1,0]],
            MONT_BRAISE: [[-3, 0.7]],
            CRAMOISILE: [[0,2.5]]
        }
    }
]

export const DestinationTypeHighlightTint: { [type in DestinationType]: number } = {
    [DestinationType.ARENA]: 0x33eeff,
    [DestinationType.WILD]: 0x33ff33,
    [DestinationType.SPECIAL]: 0xffff33
}
