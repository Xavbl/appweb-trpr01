import { computed } from "vue";
import { type Vetement, TypeVetement } from "./Vetement";

export const vetements = computed<Vetement[]>(() => {
    return [WQT, GinoChouinard, SteFoyUni, BalenciagaShirt,
        Jeans, PantalonsCuir, MTShorts, BalenciagaPants,
        NikeBlazers, BottesACap, Crocs, PatinsAsphalt,
        ChainesArgent, BagueOr, ChainesOr, BraceletCuir
    ].map(vetement =>{
        return{
            ...vetement,
            id: vetement.id,
            name: vetement.name,
            prix: vetement.prix,
            quantite: vetement.quantite,
            lienImg: vetement.lienImg,
            typeVetement: vetement.typeVetement
        }
    })
})

export const WQT: Vetement = {
    id: "1",
    name: "WQT - Wakete",
    prix: 29.99,
    quantite: 15,
    lienImg: "https://grimmtl.com/cdn/shop/files/LeWqtMOCKUPcopy.png?v=1726169994",
    typeVetement: TypeVetement.Chandail
}

export const GinoChouinard: Vetement = {
    id: "2",
    name: "Gino Chouinard (Metal T-Shirt)",
    prix: 34.99,
    quantite: 2,
    lienImg: "https://grimmtl.com/cdn/shop/files/GINOCHOINARDFrontMockupcopy.png?v=1697158090&width=1946",
    typeVetement: TypeVetement.Chandail
}

export const SteFoyUni: Vetement = {
    id: "3",
    name: "Ste-Foy University (FAKE U)",
    prix: 49.99,
    quantite: 6,
    lienImg: "https://grimmtl.com/cdn/shop/files/StFoyUCrewnecknoir.png?v=1724171396&width=1946",
    typeVetement: TypeVetement.Chandail
}

export const BalenciagaShirt: Vetement = {
    id: "4",
    name: "Chandail Balenciaga",
    prix: 999.99,
    quantite: 1,
    lienImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBRtkplNJPjy9Bk6RoOXLjRAZ-eIrNno9wxA&s",
    typeVetement: TypeVetement.Chandail
}

export const Jeans: Vetement = {
    id: "5",
    name: "Jeans Levis",
    prix: 89.99,
    quantite: 6,
    lienImg: "https://www.rayrickburn.com/cdn/shop/files/levis-skateboarding-baggy-5-pocket-jean-deep-groove1.webp?v=1722985380",
    typeVetement: TypeVetement.Pantalons
}

export const PantalonsCuir: Vetement = {
    id: "6",
    name: "Pantalons de cuir noir",
    prix: 145.99,
    quantite: 2,
    lienImg: "https://i.ebayimg.com/images/g/hs0AAOSwIKVdyTXe/s-l400.jpg",
    typeVetement: TypeVetement.Pantalons
}

export const MTShorts: Vetement = {
    id: "7",
    name: "Shorts de Muay Thai",
    prix: 49.99,
    quantite: 8,
    lienImg: "https://siamno1.com/wp-content/uploads/2018/02/20582424_1596654497044634_1633069711241510912_n-1024x740.jpg   ",
    typeVetement: TypeVetement.Pantalons
}

export const BalenciagaPants: Vetement = {
    id: "8",
    name: "Pantalons Balenciaga",
    prix: 999.99,
    quantite: 1,
    lienImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEjCRsYzjygVv3twG7qcWrlPFpH_f_OPXysQ&s",
    typeVetement: TypeVetement.Pantalons
}

export const NikeBlazers: Vetement = {
    id: "9",
    name: "Nike Blazers '77",
    prix: 79.99,
    quantite: 4,
    lienImg: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/7dcc6fd4-b41c-493e-85bd-58b8944b6b1d/W+BLAZER+MID+%2777.png",
    typeVetement: TypeVetement.Souliers
}

export const BottesACap: Vetement = {
    id: "10",
    name: "Bottes à cap d'acier",
    prix: 64.99,
    quantite: 2,
    lienImg: "https://www.centrefh.com/uploads/products/pictures/large/8929.jpg",
    typeVetement: TypeVetement.Souliers
}

export const Crocs: Vetement = {
    id: "11",
    name: "Crocs (mode vitesse)",
    prix: 29.99,
    quantite: 12,
    lienImg: "https://images.journeys.ca/images/products/1_487051_FS.JPG",
    typeVetement: TypeVetement.Souliers
}

export const PatinsAsphalt: Vetement = {
    id: "12",
    name: "Patins à roulette",
    prix: 119.99,
    quantite: 0,
    lienImg: "https://instantcomptant.ca/wp-content/uploads/2025/01/2D519B1C-C1DD-E142-BB00-74B4DCFD1083_1.jpg",
    typeVetement: TypeVetement.Souliers
}

export const ChainesArgent: Vetement = {
    id: "13",
    name: "Chaînes en argent",
    prix: 19.99,
    quantite: 19,
    lienImg: "https://m.media-amazon.com/images/I/61qWN3YBmFL.jpg",
    typeVetement: TypeVetement.Autre
}

export const BagueOr: Vetement = {
    id: "14",
    name: "Bague en or",
    prix: 87.99,
    quantite: 8,
    lienImg: "https://imagescdn.simons.ca/images/13533-317017-77-A1_2/quintessential-golden-ring.jpg?__=1",
    typeVetement: TypeVetement.Autre
}

export const ChainesOr: Vetement = {
    id: "15",
    name: "Chaînes en or",
    prix: 39.99,
    quantite: 4,
    lienImg: "https://www.kaufmanndesuisse.ca/sites/default/files/styles/extralarge/public/44186-1.jpg?itok=0QUOg23z",
    typeVetement: TypeVetement.Autre
}

export const BraceletCuir: Vetement = {
    id: "16",
    name: "Bracelet en cuir",
    prix: 74.99,
    quantite: 29,
    lienImg: "https://static.yoursurprise.com/galleryimage/b4/b4e673c9c7165d2eb8e6888b4ee37bdc/luxurious-double-leather-bracelet-with-engraving-men-brown-m.png?width=900&crop=1%3A1&bg-color=ffffff&format=jpg",
    typeVetement: TypeVetement.Autre
}