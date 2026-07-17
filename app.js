const RadhathLAB = {

formulas: [],


createFormula:function(name,size,ingredients){


let total = ingredients.reduce((sum,item)=>{
return sum + Number(item.percent);
},0);



if(total !== 100){

return {
error:"المجموع يجب أن يكون 100% - الحالي: "+total+"%"
};

}



let formula = {

id:"RDH-"+Date.now(),

name:name,

size:size,

ingredients:ingredients.map(item=>({

name:item.name,

percent:Number(item.percent),

ml:(Number(size)*Number(item.percent))/100

})),

date:new Date().toLocaleDateString()

};



this.formulas.push(formula);


localStorage.setItem(
"radhath_formulas",
JSON.stringify(this.formulas)
);



console.log("Saved:", this.formulas);



return formula;


},



loadFormulas:function(){


let saved = localStorage.getItem("radhath_formulas");


if(saved){

this.formulas = JSON.parse(saved);

}


return this.formulas;


}



};



RadhathLAB.loadFormulas();

console.log("Radhath LAB Ready");
