
function parImpar(a){

    const res = a%2;
    if(res === 0){
        return "Es numero par"
    }else{
        return "es numero impar"
    }

}

const fParImpar = (a) => {
    if(a%2 === 0){
         return "Es numero par"
    }else{
        return "es numero impar"
    }
}
console.log(fParImpar(66))