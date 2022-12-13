//se buscará saber que tipo de selector le estamos pasando

//vamos a crear una funcion que reciba por parametro por elemento. 

//se recorrerá el arbol ejecutando esa funcion en cada paso. 





//const TemplateGlob = require("@11ty/eleventy/src/TemplateGlob");

var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") { // es el primer elemento a evaluar 
    startEl = document.body; //indica que se debe iniciar por el body del documento
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)){
    resultSet.push(startEl);
  }
  
  for (let i = 0; i < startEl.children.length; i++) {
    let elements = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...elements];
    
  }
  return resultSet;

};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

//devuelve que tipo de elemento es el selector pasado como argumento

var selectorTypeMatcher = function(selector) {
  // tu código aquí
  
  if(selector[0] === "#"){
    return "id";
  }else if(selector[0] === "."){
    return "class";
  }else if(selector.split(".").length >1){ //selector.includes(".")
    return "tag.class";
  }else{
    return "tag";
  }

};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) { 
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
    matchFunction = function(el){
      return "#" + el.id === selector;
    }
  } else if (selectorType === "class") {
    matchFunction = function(el){
      let classes = el.classList; // retorna un array con la lista de las clases

      for (let i = 0; i < classes.length; i++) {
        
        if(("." + classes[i]) === selector ){
          return true;
        }
        
      }
      return false;
    }
  } else if (selectorType === "tag.class") {

    matchFunction = function(el){

      var[tagBuscado, classBuscada] = selector.split(".");

      return matchFunctionMaker(tagBuscado)(el) && matchFunctionMaker("." + classBuscada)(el);
    }
  } else if (selectorType === "tag") {
    //
    matchFunction = function(el){
      if(el.tagName.toLowerCase() === selector){
        return true;
      }
      return false;
    }
    //return el.tagName.toLowerCase() === selector; 
  }
  return matchFunction;
};

var $ = function(selector) { //esta funcion recibe un selector como parametro y nos indica si este elemento está en el documento html
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
