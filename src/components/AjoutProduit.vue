<script setup lang="ts">
    import { ref, computed, reactive } from "vue"

    const nomProduit = ref('')
    const typeProduit = ref('')
    const prixProduit = ref()

    function verifierSiVite(texte : String):boolean{
        if(texte.trim() === ''){
            return true;
        }
        return false;
    }

    function ajoutProduit():void{
    
    }
</script>

<template>
    <form id="ajout_frm" class="ajout_frm">
    <p>Nom produit :</p>
    <input type="text" id="nom_produit" name="nom_produit" placeholder="Nom du produit...">

    <p>Type du produit : </p>
    <input type="radio" id="chandail" name="type_produit" value="Chandail">
    <label for="chandail">Chandail</label>
    <br>
    <input type="radio" id="pull" name="type_produit" value="Pull">
    <label for="pull">Pull</label>
    <br>
    <input type="radio" id="pantalon" name="type_produit" value="Pantalon">
    <label for="pantalon">Pantalon</label>
    <br>
    <input type="radio" id="souliers" name="type_produit" value="Souliers">
    <label for="souliers">Souliers</label>
    <br>
    <input type="radio" id="autres/accessoires" name="type_produit" value="Autres/Accessoires">
    <label for="autres/accessoires">Autres / Accessoires</label>
    <br>

    <p>Grandeur produit :</p>
    <input type="checkbox" id="extrasmall" name="extrasmall" value="Extrasmall">
    <label for="extrasmall">XS</label>
    <br>
    <input type="checkbox" id="small" name="small" value="Small">
    <label for="small">S</label>
    <br>
    <input type="checkbox" id="medium" name="medium" value="Medium">
    <label for="medium">M</label>
    <br>
    <input type="checkbox" id="large" name="large" value="Large">
    <label for="large">L</label>
    <br>
    <input type="checkbox" id="extralarge" name="extralarge" value="Extralarge">
    <label for="extralarge">XL</label>
    <br>
    <input type="checkbox" id="twoextralarge" name="twoextralarge" value="TwoExtralarge">
    <label for="twoextralarge">2XL</label>

    <p>Lien Image : </p>
    <input type="text" id="img_link" name="img_link" placeholder="Lien de l'image...">

    <p>Prix : </p>
    <input type="text" id="prix" name="prix" placeholder="Prix en dollars...">

    <p>Quantité : </p>
    <input type="number" id="quantite" name="quantite" placeholder="Quantité en nombre...">

    <br>
    <!-- Msg erreur ici -->
    <br>
    <button type="button" class="btn btn-primary" id="ajout_produit_btn">Ajouter</button>
</form>
</template>

<style scoped>

</style>
