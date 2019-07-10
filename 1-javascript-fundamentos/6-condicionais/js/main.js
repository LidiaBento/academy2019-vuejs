const a = 10
const b = 5
const c = '5'

/*
  Operadores de comparação
  - igual a
  - identico a 
  - diferente
  - maior que
  - maior ou igual a
  - menor que
  - menor ou igual a
*/
 
console.log('igual a', b ==c)
console.log('Identico a', b === c)
console.log('Diferente', b != c)
console.log('Realmente é diferente?', b !== c)
console.log('Maior', a > b)
console.log('Maior ou igual', a >= b)
console.log('Menor', a < b)
console.log('Menor ou igual', a <= b)

if( 4 > 2){
  console.log('é')
} else {
  console.log('não é')
}

const maior = 4 > 2 ? 'é' : 'não é'

console.log('maior ->', a > b && b == c)
console.log('maior ->', a > b || b == c)
console.log('maior ->', !(a > b) && b == c)




/*
 Operadores Lógicos
 - e
 - ou
 - negação
*/

/*
 - If
 - ternário
*/