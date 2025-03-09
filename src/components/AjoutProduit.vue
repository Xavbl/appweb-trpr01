<script setup lang="ts">
    import { ref } from "vue"
    import { TypeVetement, Vetement } from "../ts/Vetement"

    // Enfant

    const emit = defineEmits(['insertion-produit'])       

    const nomProduit = ref('')
    const typeProduit = ref<TypeVetement>(TypeVetement.Autre)
    const prix = ref()
    const lienImg = ref('')
    const quantite = ref()

    function insertionProduit(produit : Vetement){
        // Changer produit pour produit.id, produit.name, etc...
        emit('insertion-produit', new Vetement(produit.id, produit.name, produit.typeVetement, produit.prix, produit.quantite, produit.lienImg))
    }

    function verifierFormulaire():boolean{
        let erreurs = 0
        erreurs += verifierSiVide(nomProduit.value)
        erreurs += verifierSiVide(typeProduit.value)
        erreurs 
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
        if(String(quantite.value).trim() == ""){
            return 1
        }
        return 0
    }

    function ajoutProduit():void{
        if(verifierFormulaire()){
            insertionProduit(new Vetement("", nomProduit.value, typeProduit.value, prix.value, quantite.value, lienImg.value))
        }
    }

</script>

<template>
    <form id="ajout_frm" class="ajout_frm">
    <div class="row">
        <div class="col">
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
        </div>
        <div class="col">
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
            <button type="button" class="btn btn-primary" id="ajout_produit_btn" v-bind-disabled="verifierFormulaire()" @click="ajoutProduit()">Ajouter</button>
        </div>
    </div>
    </form>
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
