const RadhathLAB = {

    formulas: [],


    createFormula: function(name, size, ingredients){


        let total = ingredients.reduce((sum,item)=>{

            return sum + Number(item.percent);

        },0);



        if(total !== 100){

            return {

                error:
                "النسبة الحالية " + total + "% - يجب أن تكون 100%"

            };

        }



        let formula = {


            id:
            "RDH-" + Date.now(),


            name:
            name || "بدون اسم",


            size:
            size,


            ingredients:

            ingredients.map(item=>{


                return {


                    name:item.name,


                    percent:Number(item.percent),


                    ml:
                    (Number(size) * Number(item.percent)) / 100


                };


            }),


            date:
            new Date().toLocaleDateString()


        };




        this.formulas.push(formula);



        this.saveFormulas();



        return formula;



    },





    saveFormulas:function(){


        localStorage.setItem(

            "radhath_formulas",

            JSON.stringify(this.formulas)

        );


    },





    loadFormulas:function(){



        let saved =

        localStorage.getItem("radhath_formulas");



        if(saved){


            this.formulas = JSON.parse(saved);


        }



        return this.formulas;



    }



};



// تحميل البيانات عند تشغيل البرنامج

RadhathLAB.loadFormulas();



console.log("Radhath LAB System Ready");
