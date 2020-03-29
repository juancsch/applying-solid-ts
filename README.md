# Aplicando SOLID al diseño de Software.

SOLID es el acrónimo que aúna una serie de principios de diseño de software, cuyo objetivo es dirigir nuestras decisiones 
hacia una implementación limpia de nuestro código. Entendiendo por limpia, no un “código bonito”, 
que es un concepto subjetivo a cada persona, sino un código mantenible, es decir capaz de absorber cambios durante de la vida del programa.

Podéis encontrar por internet multitud de artículos que definen estos principios y la forma en cómo se relacionan para 
alcanzar el objetivo expuesto, pero la forma en los que vamos a pensar sobre ellos, desde el punto de vista de javascript, 
será la siguiente:

- S: responsabilidad única => una única razón para cambiar.
- O: abierto a la extensión y cerrado a la modificación.
- L: duck-typing, la sustitución por un tipo hijo no altera la corrección del programa.
- I: diseño por contrato.
- D: depender de abstracciones no concreciones.

Vamos a centrarnos en cómo se pueden ir aplicando de forma práctica para guiarnos en la implementación del siguiente caso de uso.

## Caso de uso: contador de palabras

Dado un fichero de texto se requiere generar un informe, en formato JSON, con el número de palabras del mismo.

Se definen las interfaces de la comunicación con el exterior (infraestructura) => SRP

```typescript
type Input = (location: string) => Promise<string>

type Output = (content: { wordCount: number }) => Promise<void>
```

Se extrae la lógica del caso de uso (de lo que hablamos con negocio, contar palabras) a el DOMINIO => DIP, haciendo uso de la inyección de dependencias (DI)

```typescript
(Input, Output) => (string, string) => Promise<void>
```

#### Llega un cambio: el fichero se recoge de un api http:

Trabajo en el INPUT para incluir la nueva funcionalida sin que se afecte el dominio o el resto de los desarrollos => OCP

- Resumen:
  - separacion del flujo de ejecución principal y lógica de dominio (word-counter.js) de como se ejecuta (cli). Ademas de independizarnos de la infraestructura.
  - conservamos el lenguaje de dominio: contar palabras
  - minima sorpresa, cada cosa hace lo que dice y no más

#### Llega otro cambio: lo voy a invocar como un api http, no desde CLI.

Reaprovecamos todo => mantenibilidad y testeabilidad.

### Y si ademas tenemos que informar de las preposiciones, ¿cúal es el impacto del cambio?
