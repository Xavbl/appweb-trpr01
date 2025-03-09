<script setup lang="ts">
    import { ref, watch } from "vue"
    import { TypeVetement, Vetement } from "../ts/Vetement"
    import { vetements } from "../ts/produits";

    // Enfant

    const props = defineProps<{
        idProduit: String,
        typeProduit: TypeVetement,
        nomProduit: String,
        lienImgProduit: String,
        prixProduit: Number,
        quantiteProduit: Number,
    }>();
    
    const emit = defineEmits<{
        (e: 'sauvegarde-modification', payload: Vetement): void
    }>()
    
    const nomProduit = ref<String>(props.nomProduit)
    const typeProduit = ref<TypeVetement>(props.typeProduit)
    const prix = ref<Number>(props.prixProduit)
    const lienImg = ref<String>(props.lienImgProduit)
    const quantite = ref<Number>(props.quantiteProduit)


    watch(() => props.typeProduit, (nouveauType) => {typeProduit.value = nouveauType})
    watch(() => props.nomProduit, (nouveauNom) => {nomProduit.value = nouveauNom.valueOf()})
    watch(() => props.lienImgProduit, (nouveauLien) => {lienImg.value = nouveauLien})
    watch(() => props.prixProduit, (nouveauPrix) => {prix.value = nouveauPrix})
    watch(() => props.quantiteProduit, (nouvelleQuantite) => {quantite.value = nouvelleQuantite})

    function sauvegardeModification(produit : Vetement | undefined){
        if(verifierFormulaire()){
            if(produit == undefined){
                console.log("produit is undefined")
                return;
            }
            
            produit.lienImg = lienImg.value.valueOf()
            produit.name = nomProduit.value.valueOf()
            produit.prix = prix.value.valueOf()
            produit.quantite = quantite.value.valueOf()
            produit.typeVetement = typeProduit.value
            const produitMod = new Vetement(produit.id, nomProduit.value.valueOf(), typeProduit.value, prix.value.valueOf(), quantite.value.valueOf(), lienImg.value.valueOf())
            emit('sauvegarde-modification', produitMod)
        }
    }        

    function verifierFormulaire():boolean{
        let erreurs = 0
        erreurs += verifierSiVide(props.prixProduit.toString())
        erreurs += verifierSiVide(props.nomProduit.valueOf())
        erreurs += verifierSiVide(props.typeProduit)
        erreurs += verifierSiQuantiteInvalide()

        return erreurs === 0
    }

    function verifierSiVide(text : string):number{
        if(text.trim() == ''){
            return 1
        }
        return 0
    }
    
    function verifierSiQuantiteInvalide():number{
        let quantiteNbs = quantite.value?.valueOf()
        if(Number(quantiteNbs?.valueOf()) > 0){
            return 0 // Faux
        }
        return 1 // Vrai
    }

    function modificationProduit():void{
        if(verifierFormulaire()){
            const produit = vetements.value.find(article => article.id == props.idProduit)
            sauvegardeModification(produit)
        }
    }

</script>

<template>
    <div class="row">
        <div class="col-12">
            <form id="ajout_frm" class="ajout_frm">
                <div id="nom_produit">
                    <p>Nom produit :</p>
                    <input type="text" id="nom_produit" name="nom_produit" placeholder="Nom du produit..." v-model="nomProduit">
                </div>

                <div id="type_produit">
                    <p>Type du produit : </p>
                    <input type="radio" id="chandail" name="type_produit" :value="TypeVetement.Chandail" v-model="typeProduit">
                    <label for="chandail">Chandail / Pull</label>
                    <br>
                    <input type="radio" id="pantalon" name="type_produit" :value="TypeVetement.Pantalons" v-model="typeProduit">
                    <label for="pantalon">Pantalon</label>
                    <br>
                    <input type="radio" id="souliers" name="type_produit" :value="TypeVetement.Souliers" v-model="typeProduit">
                    <label for="souliers">Souliers</label>
                    <br>
                    <input type="radio" id="autres/accessoires" name="type_produit" :value="TypeVetement.Autre" v-model="typeProduit">
                    <label for="autres/accessoires">Autres / Accessoires</label>
                    <br>
                </div>
                
                <div id="lien_image">
                    <p>Lien Image : </p>
                    <input type="text" id="img_link" name="img_link" placeholder="Lien de l'image..." v-model="lienImg">
                </div>

                <div id="prix_produit">
                    <p>Prix : </p>
                    <input type="text" id="prix" name="prix" placeholder="Prix en dollars..." v-model="prix">
                </div>


                <p>Quantité :</p>
                <div>
                    <input type="number" class="quantite" id="quantite" name="quantite" placeholder="Quantité..." v-model="quantite">
                </div>

                <br>
                <!-- Msg erreur ici -->
                <br>
                <button type="button" class="btn btn-primary" id="ajout_produit_btn" v-bind-disabled="!verifierFormulaire()" @click="modificationProduit">Modifier v2</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
img.taille_bas_homme{
    max-width: 33%;
}

img.taille_haut_homme{
    max-width: 66%;
}

img.taille_vetement_femme{
    max-width: 80%;
}
</style>
