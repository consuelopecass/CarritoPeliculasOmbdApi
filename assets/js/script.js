$(function() {

    $('#search').click(e => {
        buscarPelicula();
    });

    $("#clean").click(e => {
        limpiar();
    })

    $(document).keypress(e => {
        if (e.which == 13) {
            buscarPelicula();
        }
    })
});

function buscarPelicula() {
    var nombrePelicula = $("#input_search").val();
    if (validacion(nombrePelicula) == false) {
        errorInput();
        return;
    }
    getPelicula(nombrePelicula);
}

function validacion(titulo) {
    var expresion = /^./;
    if (expresion.test(titulo)) {
        return true;
    }
    return false;
}

function errorInput() {
    alert("Nombre de inválido");
    $("#input_search").focus();
}

function limpiar() {
    $("#peliInfo").empty();
    $("#input_search").focus();
}

//Intento 1 para entrar a la API
// async function getPelicula(titulo) {
//     try {
//         let urlPeliculas = `http://www.omdbapi.com/?i&apikey=4213517b&s=${titulo}`
//             //&page=${pagina}
//         let resultadoConsulta = fetch(urlPeliculas);
//         let respuesta = await resultadoConsulta;
//         let data = await respuesta.json();
//         // console.log(data)
//         $('#heroInfo').append(generarCard(data));
//     } catch (error) {
//         alert(error);
//     }
// }

function getPelicula(titulo) {
    $.ajax({
        type: "GET",
        url: `http://www.omdbapi.com/?i&apikey=4213517b&s=${titulo}`,
        success: function(pelicula) {
            $("#peliInfo").empty();
            $('#peliInfo').append(generarCard(pelicula));
        }
    })
    console.log(titulo)
}

function generarCard(pelicula) {
    console.log(pelicula)
    var card = `
        <h4>Películas Encontradas</h4>
        <div class="card" style="max-width: 540px;">
            <div class="row">
                <div class=""> 
                    <img src="${pelicula.Poster}" class="card-img-top" alt="...">
                </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${pelicula.Title}</h5>
                            <br>
                            <div> Publicado por: ${pelicula.Year}</div>
                            <hr>
                            <div> Ocupación: ${pelicula.Type}</div>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    return card;
}