import {startDialog} from "../../logic/dialog";
import {DialogLine} from "../../types/dialog";
import {receiveItem} from "./descriptions";
import {ATTAQUE_PLUS, BAIE_CERIZ, BAIE_MEPO, BAIE_ORAN, BAIE_SITRUS, BOULE_FUMEE, DEFENSE_PLUS, ENCENS_FLEUR, GEMME_CIEL, GEMME_DRACO, GEMME_FLAMME, GEMME_GLACE, GEMME_GRISE, GEMME_HERBE, GEMME_HYDRO, GEMME_INSECTE, GEMME_OMBRE, GEMME_PIXIE, GEMME_POING, GEMME_PSY, GEMME_ROC, GEMME_TERRE, GEMME_TOXIC, GEMME_VOLT, GRELOT_COQUE, ITEMS, ITEMS_LIST, ITEM_POKEBALL, MAX_ELIXIR, MULTI_EXP, ORBE_FLAMME, ORBE_GLACE, ORBE_TOXIQUE, PV_PLUS, SUPER_BONBON, VITESSE_PLUS} from "../items";
import { gameState } from "../../logic/gamestate";
import { clamp, pickRandomIn } from "../../utils/helpers";

export const MAM_DIALOG_STATE = {
  hello: 0,
  after_gift: 1
}

export const MAM = () => {
  if(gameState.dialogStates.mam === MAM_DIALOG_STATE.after_gift) return startDialog(["Bon courage dans ton aventure !"])

  const ITEMS_1 = [BAIE_CERIZ, BAIE_MEPO, BAIE_ORAN, BAIE_SITRUS]
  const ITEMS_2 = [ATTAQUE_PLUS, DEFENSE_PLUS, VITESSE_PLUS, PV_PLUS]
  const ITEMS_3 = [GEMME_DRACO,
    GEMME_POING, GEMME_CIEL, GEMME_VOLT, GEMME_HERBE, GEMME_HYDRO, GEMME_FLAMME, GEMME_TOXIC, GEMME_PSY, GEMME_INSECTE, GEMME_ROC, GEMME_OMBRE, GEMME_GLACE,
    GEMME_GRISE, GEMME_PIXIE, GEMME_TERRE]
  const ITEMS_4 = [GRELOT_COQUE, BOULE_FUMEE, MULTI_EXP, MAX_ELIXIR]
  const ITEMS_5 = [ENCENS_FLEUR, ORBE_TOXIQUE, ORBE_FLAMME, ORBE_GLACE, SUPER_BONBON]

  const elapsedDays = gameState.day - gameState.lastTourMam
  return startDialog([
    "Bonjour mon chéri !",
    () => {
      let lines: DialogLine[];
      if(elapsedDays <= 3) lines = [
        "Tiens, avant que tu partes... J'ai retrouvé ça sous ton lit.",        
        () => receiveItem(ITEM_POKEBALL, clamp(elapsedDays,1,3))
      ]
      else if(elapsedDays < 9) lines = [
        "Tu n'es pas parti longtemps. Comment ça va ?",
        "J'ai cueilli des baies au jardin. Tes Pokémon vont adorer !",
        () => receiveItem(pickRandomIn(ITEMS_1), clamp(Math.ceil(elapsedDays/3), 1, 3))
      ]
      else if(elapsedDays < 20) lines = [
        "Comment se passe ton aventure ?",
        "Tiens, j'ai trouvé ça pour toi au Labo du Prof Chen.",
        () => receiveItem(pickRandomIn(ITEMS_2))
      ]
      else if(elapsedDays < 30) lines = [
        "Le voyage se passe bien ?",
        "As-tu capturé beaucoup de Pokémon ?",
        "Tiens, j'ai quelque-chose à t'offrir.",
        () => receiveItem(pickRandomIn(ITEMS_3)),
        "C'est une gemme très rare.",
        "Elle permet d'ajouter un nouveau type à un de tes Pokémon !",
        "J'espère que ça te sera utile."
      ]
      else if(elapsedDays < 40) lines = [
        "Tu es parti depuis un bon moment. Tu t'es fait de nouveaux amis ?",        
        "Je suis passée au magasin et j'ai trouvé quelque-chose pour toi.",
        () => receiveItem(pickRandomIn(ITEMS_4)),
        "Le vendeur m'a dit que tous les meilleurs dresseurs en avaient un !",
        "Mais il faut bien choisir le Pokémon à qui le donner.",
      ]
      else lines = [
        "Cela fait si longtemps que tu as quitté la maison !",
        "Tu dois avoir beaucoup d'histoires à raconter.",
        "Pour ton retour, je voudrais t'offrir un cadeau:",
        () => receiveItem(pickRandomIn(ITEMS_5)),
        "Toutes les économies y sont passées ! Mais c'est une occasion spéciale.",
        "Tu es si proche de ton but ! Je crois en toi mon chéri !"
      ]

      return lines;
    }
  ], { speaker: "mam" })  
  .then(() => startDialog([
    () => {
      gameState.lastTourMam = gameState.day
      gameState.dialogStates.mam = MAM_DIALOG_STATE.after_gift
      return "Bon courage dans ton aventure !"
    }        
  ], { speaker: "mam" }))
}