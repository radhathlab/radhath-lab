const RadhathLAB = {

    formulas: [],


    loadFormulas: function(){

        let saved = localStorage.getItem("radhath_formulas");


        if(saved){

            this.formulas = JSON.parse(saved);

        }


        return this.formulas;

    },


    saveFormulas: function(){

        localStorage.setItem(
            "radhath_formulas",
            JSON.stringify(this.formulas)
        );

    },



    createFormula: function(name, size, ingredients){


        let total = 0;


        ingredients.forEach(item=>{

            total += Number(item.percent);

        });



        if(total !== 100){

            return {

                error:"النسبة يجب أن تكون 100%"

            };

        }



        let formula = {


            id: Date.now(),


            name:name,


            size:Number(size),


            ingredients:ingredients,


            date:new Date().toLocaleDateString(),


            cost:0,


            sellPrice:0,


            profit:0


        };



        this.formulas.push(formula);


        this.saveFormulas();



        return formula;


    },



    calculateCost: function(formula){


        let totalCost = 0;


        formula.ingredients.forEach(item=>{


            if(item.price){


                let mlCost = Number(item.price) / 100;


                totalCost += mlCost * Number(item.ml || 0);


            }


        });



        formula.cost = totalCost;


        formula.profit =

        Number(formula.sellPrice || 0)

        - totalCost;



        this.saveFormulas();


        return totalCost;


    }

};
RadhathLAB.updateIngredientPrice = function(formulaId, ingredientName, price){


    let formula = this.formulas.find(
        f => f.id === formulaId
    );


    if(!formula){

        return false;

    }



    let ingredient = formula.ingredients.find(

        i => i.name === ingredientName

    );



    if(ingredient){


        ingredient.price = Number(price);


    }



    this.calculateCost(formula);


    return true;


};




RadhathLAB.setSellingPrice = function(formulaId, price){


    let formula = this.formulas.find(

        f => f.id === formulaId

    );



    if(formula){


        formula.sellPrice = Number(price);


        this.calculateCost(formula);


        return true;

    }



    return false;


};




RadhathLAB.getFormulaReport = function(formula){


    return {


        name: formula.name,


        size: formula.size,


        cost: formula.cost || 0,


        sellPrice: formula.sellPrice || 0,


        profit: formula.profit || 0


    };


};




// تشغيل النظام وتحميل الوصفات القديمة

RadhathLAB.loadFormulas();



console.log("Radhath LAB Cost System Ready");
