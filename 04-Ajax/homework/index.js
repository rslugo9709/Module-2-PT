//const { text } = require("body-parser");

const URL = "http://localhost:5000/amigos"; 
console.log("vinculado")
$(document).ready(function(){

    $("#boton").click(function(e){

        e.preventDefault();
        console.log("boton de ver amigos")
        $.get(`${URL}`, function(data){
            console.log(data);

            data.forEach(element => {
                
                $("#lista").append(`<li id="${element.id}">${element.name} X </li>`)
            });
        });
    });


    $("#search").click(function(e){
        e.preventDefault();
        let id = $("#input").val();
        console.log(id);

        if(id){

            $.get(`${URL}/${id}`, function(friend){
                console.log(friend);//devuelve a un objeto

                $("#amigo").text(`${friend.name} ${friend.age} ${friend.email} `);
                $("input").val("");//limpia al campo cuando se presiona en buscar
            })
        }else{
            $("#amigo").text("Debe ingresar un ID valido");
        }




    });


    $("#delete").click(function(e){

        e.preventDefault();

        let id = $("#inputDelete").val();

        if(id){
            $.ajax( //ajax recibe un objeto con 3 propiedades
                {
                    url: `${URL}/${id}`,
                    type: "DELETE",
                    sucess: function(){
                        $("#success").text("Tu amigo fue eliminado");
                        $("#inputDelete").val("");

                    }

                }
            )
        }
    })





});