<!-- Page d'affichage des produits -->
<script setup lang="ts">
import { TypeVetement, Vetement } from '../ts/Vetement';
import AjoutProduit from './AjoutProduit.vue';
import { computed, reactive, ref, onMounted, defineComponent, watch, type ComputedRef } from 'vue';
import { vetements } from '../ts/produits'
import { v4 } from 'uuid';
import ModificationProduit from './ModificationProduit.vue';

// Parent

const ajoutProduitActif = ref(false);
const produitAModifier = ref<Vetement>();
const idProduitDetailsMontres = ref('');
const produitsAchetes = ref<Vetement[]>([])
const prixTotal = ref<number>()

const vetementsEtat = ref()
const vetementsList = computed(() => vetements.value)

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

watch(vetementsEtat, (nouvelEtat) => {vetementsEtat.value = nouvelEtat});

// Partie CSV faite avec DeepAI
// Prompt : export csv file in vue 3 js
 
function telechargerCSV() {
    const entetes = Object.keys(vetements.value[0])
    const rangeesCSV = []

    rangeesCSV.push(entetes.join(","))

    vetements.value.forEach((rangee) =>{
        const values = entetes.map(entete => {
          // Escape quotes in values
          const escapedValue = (rangee[entete] || '').toString().replace(/"/g, '""')
          return `"${escapedValue}"` // Wrap each value in quotes
        })
        rangeesCSV.push(values.join(","))
    })

    const stringCSV = rangeesCSV.join("\n")

    const blob = new Blob([stringCSV], { type: 'text/csv;charset=utf-8;'})
    const lien = document.createElement("a")
    const url = URL.createObjectURL(blob)
    lien.setAttribute("href", url)
    lien.setAttribute("download", "data.csv")
    lien.style.visibility = 'hidden'
    document.body.appendChild(lien)
    lien.click()
    document.body.removeChild(lien)
}

function acheterProduit(vetement : Vetement){
    produitsAchetes.value?.push(vetement)
    if(prixTotal.value == undefined){
        prixTotal.value = 0
    }
    prixTotal.value += vetement.prix
}

function retirerProduit(vetement : Vetement){
    prixTotal.value -= vetement.prix
    prixTotal.value?.toFixed(2)
    const index = produitsAchetes.value?.findIndex(article => article.id === vetement.id)
    if(index == undefined){
        return;
    }
    produitsAchetes.value?.splice(index, 1)
}

function venteProduits(){
    produitsAchetes.value?.forEach(article =>{
        if(vetementsList.value.includes(article)){
            const index = vetementsList.value.indexOf(article)
            vetementsList.value[index].quantite -= 1
        }
    })
    prixTotal.value = 0
}

function verifierSiQuantiteVideSeul(vetement : Vetement):boolean{
    if(vetement.quantite > 0){
        return false
    }
    return true
}

function verifierSiQuantiteVideTous():Vetement[]{
    const vetementsQuantiteVide: Vetement[] = []
    vetements.value.forEach((vetement) =>{
        if(vetement.quantite <= 0){
            vetementsQuantiteVide.push(vetement)
        }
    })
    return vetementsQuantiteVide
}

function filtrerArticles(typeVetement : TypeVetement): Vetement[]{
    return vetementsList.value.filter(article => article.typeVetement == typeVetement)
}

function changementProduitDetailMontre(vetement : Vetement):void{
    idProduitDetailsMontres.value = vetement.id
}

function changementAjoutProduit():void{
    if(ajoutProduitActif.value){
        ajoutProduitActif.value = false;
    }
    else{
        produitAModifier.value = undefined
        ajoutProduitActif.value = true;
    }
}

function selectionProduitAModifier(produit : Vetement):void{
    produitAModifier.value = produit
    produitAModifier.value.id = produit.id
}

function dupliquerProduit(produit : Vetement):void{
    insertionProduit(produit)
    filtrerArticles(produit.typeVetement)
}

function insertionProduit(produit : Vetement):void{
    vetementsList.value.push(produit)
}

function suppressionProduit(produit : Vetement):void{
    vetementsList.value.splice(vetementsList.value.findIndex(article => article.id === produit.id), 1)
}

function sauvegardeModification(produit : Vetement){
    const index = vetementsList.value.findIndex(article => article.id == produit.id);

    if(index === -1){
        console.log(index)
        return;
    }
    console.log("click")
    vetementsList.value[index].name = produit.name
    vetementsList.value[index].prix = produit.prix
    vetementsList.value[index].quantite = produit.quantite
    vetementsList.value[index].typeVetement = produit.typeVetement
    vetementsList.value[index].lienImg = produit.lienImg
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
                        <button type="button" class="btn btn-primary" v-bind:disabled="verifierSiQuantiteVideSeul(vetement)" @click="acheterProduit(vetement)">Acheter</button>
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
    <div class="logo">
        <img align="left" src="../../img/original-d3b62be0bb4e4228e3a8cc3c64b71d4b.webp" id="logo" class="logo">
        <p class="logo">Filaments du temps</p>
    </div>
    <div v-for="vetement in verifierSiQuantiteVideTous()">   
        <div class="alert alert-danger" role="alert">
            L'article {{ vetement.name }} est en rupture de stock !
        </div>
    </div>

    <br>
    <br>
    <button type="button" class="btn btn-secondary" @click="telechargerCSV()">Exporter en CSV</button>
    <button type="button" class="btn btn-primary" @click="changementAjoutProduit()">Ajouter produit</button>
    <div>
        <h3>Panier (Prix total : {{ prixTotal }} $)</h3>
        <div v-for="vetement in produitsAchetes">
            <p> {{ vetement.name }} : {{ vetement.prix }} $</p>
            <button class="btn btn-warning" @click="retirerProduit(vetement)">Retirer produit</button>
        </div>
        <div class="dropdown-divider">
            <button class="btn btn-success" @click="venteProduits()">Acheter</button>
        </div>
    </div>
    <br>
    <br>
    <br>
    <div class="ajout" v-if="ajoutProduitActif">
        <p>Ajouter produit</p>
        <AjoutProduit @insertion-produit="insertionProduit"/>
    </div>
    <br>
    <br>
    <br>
    <h1><p> TOUS LES PRODUITS </p></h1>
    <h2>Chandails</h2>
    <div class="card-group">
        <div v-for="chandail in filtrerArticles(TypeVetement.Chandail)">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" v-bind:src="chandail.lienImg" v-bind:alt="chandail.name">
                <div class="card-body">
                    <h5 class="card-title">{{ chandail.name }}</h5>
                    <p class="card-text">{{ chandail.prix }} $</p>
                    <div v-if="idProduitDetailsMontres == chandail.id">
                        <div v-if="chandail.quantite >= 10">
                            <p class="text-success bg-dark"> Quantité restante : {{chandail.quantite}}</p>
                        </div>
                        <div v-else-if="chandail.quantite > 0">
                            <p class="text-warning bg-dark"> Quantité restante : {{chandail.quantite}}</p>
                        </div>
                        <div v-else>
                            <p class="text-danger bg-dark"> Quantité restante : {{chandail.quantite}}</p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" v-bind:disabled="verifierSiQuantiteVideSeul(chandail)" @click="acheterProduit(chandail)">Acheter</button>
                    <button type="button" class="btn btn-info" @click="changementProduitDetailMontre(chandail)">Détails</button>
                    <button type="button" class="btn btn-success" @click="dupliquerProduit(chandail)">Dupliquer</button>
                    <button type="button" class="btn btn-warning" @click="selectionProduitAModifier(chandail)">Mise à jour</button>
                        <div v-if="produitAModifier?.id == chandail.id">
                            <ModificationProduit 
                            :id-produit="produitAModifier.id" 
                            :nom-produit="produitAModifier.name"
                            :prix-produit="produitAModifier.prix"
                            :quantite-produit="produitAModifier.quantite"
                            :lien-img-produit="produitAModifier.lienImg"
                            :type-produit="produitAModifier.typeVetement"
                            @sauvegarde-modification="sauvegardeModification(chandail)"/>
                        </div>
                    <button type="button" class="btn btn-danger" @click="suppressionProduit(chandail)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
    <h2>Pantalons</h2>
    <div class="card-group">
        <div v-for="pantalons in filtrerArticles(TypeVetement.Pantalons)">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" v-bind:src="pantalons.lienImg" v-bind:alt="pantalons.name">
                <div class="card-body">
                    <h5 class="card-title">{{ pantalons.name }}</h5>
                    <p class="card-text">{{ pantalons.prix }} $</p>
                    <div v-if="idProduitDetailsMontres == pantalons.id">
                        <div v-if="pantalons.quantite >= 10">
                            <p class="text-success bg-dark"> Quantité restante : {{pantalons.quantite}}</p>
                        </div>
                        <div v-else-if="pantalons.quantite > 0">
                            <p class="text-warning bg-dark"> Quantité restante : {{pantalons.quantite}}</p>
                        </div>
                        <div v-else>
                            <p class="text-danger bg-dark"> Quantité restante : {{pantalons.quantite}}</p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" v-bind:disabled="verifierSiQuantiteVideSeul(pantalons)" @click="acheterProduit(pantalons)">Acheter</button>
                    <button type="button" class="btn btn-info" @click="changementProduitDetailMontre(pantalons)">Détails</button>
                    <button type="button" class="btn btn-success" @click="dupliquerProduit(pantalons)">Dupliquer</button>
                    <button type="button" class="btn btn-warning" @click="selectionProduitAModifier(pantalons)">Mise à jour</button>
                        <div v-if="produitAModifier?.id == pantalons.id">
                            <ModificationProduit 
                            :id-produit="produitAModifier.id" 
                            :nom-produit="produitAModifier.name"
                            :prix-produit="produitAModifier.prix"
                            :quantite-produit="produitAModifier.quantite"
                            :lien-img-produit="produitAModifier.lienImg"
                            :type-produit="produitAModifier.typeVetement"
                            @sauvegarde-modification="sauvegardeModification(pantalons)"/>
                        </div>
                    <button type="button" class="btn btn-danger" @click="suppressionProduit(pantalons)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
    <h2>Souliers</h2>
    <div class="card-group">
        <div v-for="souliers in filtrerArticles(TypeVetement.Souliers)">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" v-bind:src="souliers.lienImg" v-bind:alt="souliers.name">
                <div class="card-body">
                    <h5 class="card-title">{{ souliers.name }}</h5>
                    <p class="card-text">{{ souliers.prix }} $</p>
                    <div v-if="idProduitDetailsMontres == souliers.id">
                        <div v-if="souliers.quantite >= 10">
                            <p class="text-success bg-dark"> Quantité restante : {{souliers.quantite}}</p>
                        </div>
                        <div v-else-if="souliers.quantite > 0">
                            <p class="text-warning bg-dark"> Quantité restante : {{souliers.quantite}}</p>
                        </div>
                        <div v-else>
                            <p class="text-danger bg-dark"> Quantité restante : {{souliers.quantite}}</p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary"  v-bind:disabled="verifierSiQuantiteVideSeul(souliers)" @click="acheterProduit(souliers)">Acheter</button>
                    <button type="button" class="btn btn-info" @click="changementProduitDetailMontre(souliers)">Détails</button>
                    <button type="button" class="btn btn-success" @click="dupliquerProduit(souliers)">Dupliquer</button>
                    <button type="button" class="btn btn-warning" @click="selectionProduitAModifier(souliers)">Mise à jour</button>
                        <div v-if="produitAModifier?.id == souliers.id">
                            <ModificationProduit 
                            :id-produit="produitAModifier.id" 
                            :nom-produit="produitAModifier.name"
                            :prix-produit="produitAModifier.prix"
                            :quantite-produit="produitAModifier.quantite"
                            :lien-img-produit="produitAModifier.lienImg"
                            :type-produit="produitAModifier.typeVetement"
                            @sauvegarde-modification="sauvegardeModification(souliers)"/>
                        </div>
                    <button type="button" class="btn btn-danger" @click="suppressionProduit(souliers)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
    <h2>Autres / Accessoires</h2>
    <div class="card-group">
        <div v-for="autre in filtrerArticles(TypeVetement.Autre)">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" v-bind:src="autre.lienImg" v-bind:alt="autre.name">
                <div class="card-body">
                    <h5 class="card-title">{{ autre.name }}</h5>
                    <p class="card-text">{{ autre.prix }} $</p>
                    <div v-if="idProduitDetailsMontres == autre.id">
                        <div v-if="autre.quantite >= 10">
                            <p class="text-success bg-dark"> Quantité restante : {{autre.quantite}}</p>
                        </div>
                        <div v-else-if="autre.quantite > 0">
                            <p class="text-warning bg-dark"> Quantité restante : {{autre.quantite}}</p>
                        </div>
                        <div v-else>
                            <p class="text-danger bg-dark"> Quantité restante : {{autre.quantite}}</p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary"  v-bind:disabled="verifierSiQuantiteVideSeul(autre)" @click="acheterProduit(autre)">Acheter</button>
                    <button type="button" class="btn btn-info" @click="changementProduitDetailMontre(autre)">Détails</button>
                    <button type="button" class="btn btn-success" @click="dupliquerProduit(autre)">Dupliquer</button>
                    <button type="button" class="btn btn-warning" @click="selectionProduitAModifier(autre)">Mise à jour</button>
                        <div v-if="produitAModifier?.id == autre.id">
                            <ModificationProduit 
                            :id-produit="produitAModifier.id" 
                            :nom-produit="produitAModifier.name"
                            :prix-produit="produitAModifier.prix"
                            :quantite-produit="produitAModifier.quantite"
                            :lien-img-produit="produitAModifier.lienImg"
                            :type-produit="produitAModifier.typeVetement"
                            @sauvegarde-modification="sauvegardeModification(autre)"/>
                        </div>
                    <button type="button" class="btn btn-danger" @click="suppressionProduit(autre)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h2{
    padding-top: 25px;
    padding-bottom: 25px;
}
img.logo{
    max-width: 20%;
}

div.logo{
    padding-bottom: 12%;
}

p.logo{
    padding-top: 9%;
    font-size: 5em;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
