const RadhathLAB = {

    formulas: [],

    createFormula: function(name, bottleSize, ingredients){

        let total = ingredients.reduce((sum,item)=>{
            return sum + Number(item.percent);
        },0);


        if(total !== 100){

            return {
                error:"النسبة الحالية " + total + "% - يجب أن تكون 100%"
            };

        }


        let result = ingredients.map(item=>{

            return {

                name:item.name,

                percent:Number(item.percent),

                ml:
                (Number(bottleSize) * Number(item.percent)) / 100

            };

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

        let saved =
        localStorage.getItem("radhath_formulas");


        if(saved){

            this.formulas =
            JSON.parse(saved);

        }


        return this.formulas;

    }


};


console.log("Radhath LAB v1.1 Ready");
