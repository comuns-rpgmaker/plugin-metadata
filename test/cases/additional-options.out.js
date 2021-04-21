/*:
 * @target MZ
 * @author Me
 * @plugindesc Metadata with params that have additional options.
 * @help My plugin.
 * 
 * @param number_param
 * @type number
 * @text Number param
 * @desc A number
 * @min 0
 * @max 100
 * @decimals 2
 * @default 20.2
 * 
 * @param file_param
 * @type file
 * @text File param
 * @desc A file
 * @dir some_dir/
 * 
 * @param file_param_required
 * @type file
 * @text Required file
 * @desc A file that is required on deployment
 * @dir another_dir/
 * @require 1
 * 
 * @param animation_param
 * @type animation
 * @text Animation param
 * @desc An animation that is required on deployment
 * @require 1
 * 
 * @param boolean_param
 * @type boolean
 * @text Boolean param
 * @desc A boolean
 * @on Activate
 * @off Deactivate
 * 
 * @param select_param
 * @type select
 * @text Select param
 * @desc A select
 * @option foo
 * @option Bar
 * @value bar
 * 
 * @param combo_param
 * @type combo
 * @text Combo param
 * @desc A combo
 * @option foo
 * @option bar
 */
