import { v4 } from "uuid";

export enum TypeVetement{
    Autre = 'Autre',
    Chandail = 'Chandail',
    Pantalons = 'Pantalons',
    Souliers = 'Souliers'
}

export interface Vetement{
    id : string,
    name : string,
    lienImg : string,
    typeVetement : TypeVetement,
    prix : number,
    quantite : number
}

export class Vetement implements Vetement{
    id: string
    name: string
    lienImg: string
    typeVetement: TypeVetement
    prix: number
    quantite: number

    constructor(id : string, name: string, typeVetement : TypeVetement, prix: number, quantite: number, lienImg: string){
        if(id == undefined || id.trim() == ""){
            this.id = v4()
        }
        else{
            this.id = id;
        }
        this.typeVetement = typeVetement
        this.name = name
        this.lienImg = lienImg
        this.prix = prix
        this.quantite = quantite
    }
}

export interface VetementPost extends Omit<Vetement, 'id'>{
    id: string
}