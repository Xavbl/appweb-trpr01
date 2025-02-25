import { v4 } from "uuid";

enum Grandeur{
    ExtraSmall,
    Small,
    Medium,
    Large,
    ExtraLarge,
    TwoExtraLarge
}[]

export interface Produit{
    id : string,
    name : string,
    lienImg? : string,
    prix : number,
    quantite : number
}

export class Haut implements Produit{
    id: string;
    name: string;
    lienImg?: string;
    prix: number;
    quantite: number;
    grandeur:Grandeur[];

    constructor(name: string, prix: number, quantite: number, grandeur: Grandeur[], lienImg?: string,){
        this.id = v4();
        this.name = name
        this.lienImg = lienImg
        this.prix = prix
        this.quantite = quantite
        this.grandeur = grandeur
    }
}

export class Bas implements Produit{
    id: string;
    name: string;
    lienImg?: string;
    prix: number;
    quantite: number;
    grandeur:Grandeur[];

    constructor(name: string, prix: number, quantite: number, grandeur: Grandeur[], lienImg?: string,){
        this.id = v4();
        this.name = name
        this.lienImg = lienImg
        this.prix = prix
        this.quantite = quantite
        this.grandeur = grandeur
    }
}

export class Souliers implements Produit{
    id: string;
    name: string;
    lienImg?: string;
    prix: number;
    quantite: number;
    grandeur:Grandeur[];

    constructor(name: string, prix: number, quantite: number, grandeur: Grandeur[], lienImg?: string,){
        this.id = v4();
        this.name = name
        this.lienImg = lienImg
        this.prix = prix
        this.quantite = quantite
        this.grandeur = grandeur
    }
}