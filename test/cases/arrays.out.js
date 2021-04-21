/*:
 * @target MZ
 * @author Me
 * @plugindesc A simple plugin with array parameters.
 * @help My plugin.
 * 
 * @param array1
 * @type text[]
 * @text Array 1
 * @desc An array of texts.
 * 
 * @param array2
 * @type struct<MyStruct>[]
 * @text Array 2
 * @desc An array of structs.
 * @default [{"field1":"foo","field2":1},{"field1":"bar","field2":2},{"field1":"baz","field2":3}]
 */
/*~struct~MyStruct:
 * 
 * @param field1
 * @type text
 * @text Field 1
 * @desc A field.
 * 
 * @param field2
 * @type number
 * @text Field 2
 * @desc Another field.
 */
