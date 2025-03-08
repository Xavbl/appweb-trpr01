<script lang="ts">
import { ref } from 'vue';
import ModificationProduit from './ModificationProduit.vue';
import type { Vetement } from '../ts/Vetement'
import { vetements } from '../ts/produits'

const vetementRecherche = ref('');

    function recherche(recherche : string):Vetement[]{
        const vetementsRecherchesTab: Vetement[] = []
        vetements.value.forEach((vetement) =>{
            if(vetement.name.toLowerCase().includes(vetementRecherche.value.toLowerCase())){
                vetementsRecherchesTab.push(vetement)
            }
        })
        console.log(vetementsRecherchesTab.length)
        return vetementsRecherchesTab
    }

</script>
<template>
<h1><p> SECTION RECHERCHE </p></h1>
    <div class="recherche">
        <input type="text" v-model="vetementRecherche" placeholder="Recherche"/>
        <div class="card-group">
            <div class="articles recherches" v-for="vetement in recherche(vetementRecherche)">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" v-bind:src="vetement.lienImg" v-bind:alt="vetement.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ vetement.name }}</h5>
                        <p class="card-text">{{ vetement.prix }} $</p>
                        <div v-if="idProduitDetailsMontres == vetement.id">
                            <div v-if="vetement.quantite >= 10">
                                <p class="text-success bg-dark"> Quantité restante : {{vetement.quantite}}</p>
                            </div>
                            <div v-else-if="vetement.quantite > 0">
                                <p class="text-warning bg-dark"> Quantité restante : {{vetement.quantite}}</p>
                            </div>
                            <div v-else>
                                <p class="text-danger bg-dark"> Quantité restante : {{vetement.quantite}}</p>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" v-bind:disabled="verifierSiQuantiteVideSeul(vetement)">Acheter</button>
                        <button type="button" class="btn btn-info" @click="changementProduitDetailMontre(vetement)">Détails</button>
                        <button type="button" class="btn btn-success" @click="dupliquerProduit(vetement)">Dupliquer</button>
                        <button type="button" class="btn btn-warning" @click="selectionProduitAModifier(vetement)">Mise à jour</button>
                            <div v-if="produitAModifier?.id == vetement.id">
                                <ModificationProduit 
                                :id-produit="produitAModifier.id" 
                                :nom-produit="produitAModifier.name"
                                :prix-produit="produitAModifier.prix"
                                :quantite-produit="produitAModifier.quantite"
                                :lien-img-produit="produitAModifier.lienImg"
                                :type-produit="produitAModifier.typeVetement"
                                @sauvegarde-modification="sauvegardeModification(vetement)"/>
                            </div>
                        <button type="button" class="btn btn-danger" @click="suppressionProduit(vetement)">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>