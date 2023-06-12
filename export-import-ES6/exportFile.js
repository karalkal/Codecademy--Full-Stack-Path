/*  IMPORTANT: In order to use ES6 export/import include in package.json :
    "type": "module"

    Otherwise:
    (node:30474) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
*/


export default function nameDoesNotMatter() {
    console.log("This is Default Export. Export a single value or to have a fallback value. Name does not matter.\n")
}

const strValue1 = "String1 named export example"
export const strValue2 = "String2 named export example"

function func1() {
    console.log("Named export")
}
export function func2(a, b) {
    console.log("Named export", arguments)

}

export {strValue1, func1}

func2(44, 88)       //Please note this function will run first with these arguments even when triggered from other module