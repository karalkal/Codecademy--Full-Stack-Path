import someOtherName from './exportFile.js'     // function is named nameDoesNotMatter() in its module, name does not matter
import { strValue1, strValue2, func1, func2 } from './exportFile.js'


someOtherName()

console.log(strValue1)
console.log(strValue2)
console.log("Name of imported funk is: ", func1.name)
func2("newArg1", "newArg2")




