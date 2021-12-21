require('dotenv').config()

const {leerInput, inquirerMenu, pausa, listarLugares}  = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async()=>{
   
  let opt;  
  const busquedas = new Busquedas();
    do {

        opt= await inquirerMenu();
        switch (opt) {
            case 1:
                const termino = await leerInput('Ciudad: ')
                const lugares = await busquedas.ciudad (termino);
                const id = await listarLugares(lugares);
                if(id==='0') continue;
                const lugarSelec = lugares.find(l=>l.id=id);
                busquedas.agregarHistorial(lugarSelec.nombre);

                const clima = await busquedas.climaLugar(lugarSelec.lat, lugarSelec.lng)

                console.clear();
                console.log('\nInformación de la ciudad:\n'.green);
                console.log('Ciudad:', lugarSelec.nombre);
                console.log('Lat:', lugarSelec.lat);
                console.log('Long:', lugarSelec.lng);
                console.log('Descripción:' , clima.desc);
                console.log('Temperatura:' , clima.temp);
                console.log('Mín:', clima.min);
                console.log('Máx:', clima. max);
      

                break;
                case 2:
                busquedas.historialCapitalizado.forEach((lugar, i)=>{
                    const index = `${i+1}`.green;
                    console.log(`${index} ${lugar}`)

                })
                break
        
            default:
                break;
        }
        await pausa();

    } while (opt!==0);


    
}

main();