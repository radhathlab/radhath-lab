const RadhathLAB = {

    formulas: [],

    createFormula: function(name, bottleSize, ingredients){

        let total = 0;

        ingredients.forEach(item=>{
            total += Number(item.percent);
        });

        if(total !== 100){
            return {
                error: "النسب يجب أن تكون 100%"
            };
        }

        let result = [];

        ingredients.forEach(item=>{

            let ml = (Number(bottleSize) * Number(item.percent)) / 100;

            result.push({
                name:item.name,
                percent:item.percent,
                ml:ml
            });

        });


        let formula = {

            id:"RDH-" + Date.now(),

            name:name,

            size:bottleSize,

            ingredients:result,

            date:new Date().toLocaleDateString()

        };


        this.formulas.push(formula);

        localStorage.setItem(
            "radhath_formulas",
            JSON.stringify(this.formulas)
        );


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


console.log("Radhath LAB Engine Ready");
