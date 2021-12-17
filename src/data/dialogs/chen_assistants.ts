import {startDialog} from "../../logic/dialog";

export const assistant1 = () => {
    return startDialog([
      "ASSISTANT: Je pose la racine carrée, je retiens cinq...",
        "Hmm ? C'est pour quoi ?",
        {
            "Qui êtes-vous ?": () => [
                "J'assiste le PROF. CHEN. Je suis donc son... ASSISTANT !"
            ],
            "Où suis-je ?":  () => [
                "Tu te trouves au labo Pokémon de Bourg Palette.",
                "Nous étudions ici les différentes espèces de Pokémon de Kanto."
            ],
            "Que faites-vous ?": () => [
                "Je regroupe les dernières données recueillies par les dresseurs comme toi.",
                "En étudiant vos combats, nous recueillons des informations sur les Pokémon.",
                "Ces informations sont ensuite regroupées dans le Pokédex.",
                "C'est utile pour nos recherches, mais aussi pour vos stratégies de combat."
            ]
        }
      ,
      ""
    ], { speaker: "assistant1"})
}


export const assistant2 = () => {
    return startDialog([
        "ASSISTANT: Cette machine garde en mémoire les équipes de Pokémon",
        "qui se sont illustrées en battant la ligue Pokemon.",
        "Analyser les meilleures équipes nous permet d'en apprendre un maximum !",
        "Si tu parviens à battre la ligue, nous ajouterons avec plaisir ton équipe",
        "dans la mémoire de la machine."
    ], { speaker: "assistant2"})
}