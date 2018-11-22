import * as esprima from 'esprima';
import * as codegen from 'escodegen';

const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse,{loc:true});
};

//exports:
export  {RUN,arrayB};
export {parseCode};
//defines:
let arrayB = [];

// MAIN functions:
function RUN(parsedCode) {
    arrayB.length = 0;
    arrayB.push('function declaration');
    arrayB.push(parsedCode.body[0].id.name);
    arrayB.push(parsedCode.body[0].id.loc.start.line);
    for (let x = 0; x < parsedCode.body[0].params.length; x++) {
        arrayB.push('variable declaration');
        arrayB.push(parsedCode.body[0].params[x].name);
        arrayB.push(parsedCode.body[0].params[x].loc.start.line);
    }
    startBody(parsedCode.body[0].body);
    return arrayB;
}
function startBody(parsedCode) {
    for(let i=0;i<parsedCode.body.length;i++){
        if(parsedCode.body[i].type === 'VariableDeclaration'){
            VarDeST(parsedCode,i);
        }
        else if(parsedCode.body[i].type === 'ExpressionStatement') {
            AssST(parsedCode,i);
        }
        else if(parsedCode.body[i].type === 'ReturnStatement'){
            RetST(parsedCode,i);
        }
        else {
            continueBody(parsedCode,i);
        }
    }
}
function continueBody(parsedCode,i) {
    if (parsedCode.body[i].type === 'WhileStatement') {
        WhiST(parsedCode, i);
        if(parsedCode.body[i].body.body.length > 0 ) { // need check else
            startBody(parsedCode.body[i].body);
        }
    }
    else if(parsedCode.body[i].type === 'IfStatement'){
        ifStaBody(parsedCode,i);
    }
    else {
        belastBody(parsedCode,i);
    }
}
function ifStaBody(parsedCode,i) {
    IfST(parsedCode,i);
    consquent(parsedCode,i);
    if(parsedCode.body[i].alternate !== null) {
        if (parsedCode.body[i].alternate.type === 'IfStatement') {// else if
            arrayB.push('else if statement'); arrayB.push(codegen.generate(parsedCode.body[i].alternate.test)); arrayB.push(parsedCode.body[i].alternate.test.left.loc.start.line);//not cover (i==3+1)
            if (parsedCode.body[i].alternate.consequent.type === 'BlockStatement') {
                if (parsedCode.body[i].alternate.consequent.body.length > 0) {
                    startBody(parsedCode.body[i].alternate.consequent);
                }
            }
            else { altCons(parsedCode, i);
            }
            alternateAlt(parsedCode, i);
        }
        else{
            alternate(parsedCode,i);
        }
    }
}
function altCons(parsedCode,i) {
    if(parsedCode.body[i].alternate.consequent.type === 'ReturnStatement'){
        RetSTaltcon(parsedCode,i);
    }
    else if(parsedCode.body[i].alternate.consequent.type === 'ExpressionStatement'){
        AssSTaltcon(parsedCode,i);
    }
}
function alternateAlt(parsedCode,i) {
    if(parsedCode.body[i].alternate.alternate !== 'null'){
        if(parsedCode.body[i].alternate.alternate.type ==='BlockStatement' ) {
            startBody(parsedCode.body[i].alternate.alternate);
        }
        else {
            if(parsedCode.body[i].alternate.alternate.type === 'ReturnStatement'){
                RetSTelse(parsedCode,i);
            }
            else if(parsedCode.body[i].alternate.alternate.type === 'ExpressionStatement'){
                AssSTelse(parsedCode,i);
            }
        }
    }
}
function consquent(parsedCode,i) {
    if(parsedCode.body[i].consequent.type === 'BlockStatement') {
        if(parsedCode.body[i].consequent.body.length > 0) {
            startBody(parsedCode.body[i].consequent);
        }
    }
    else{
        if(parsedCode.body[i].consequent.type === 'ReturnStatement'){
            RetSTcon(parsedCode,i);
        }
        else if(parsedCode.body[i].consequent.expression.type === 'AssignmentExpression'){
            AssSTcon(parsedCode,i);
        }
        else{
            UpdSTcon(parsedCode,i);
        }
    }
}
function alternate(parsedCode,i) {
    if (parsedCode.body[i].alternate.type === 'BlockStatement') {
        startBody(parsedCode.body[i].alternate);
    }
    else {
        if (parsedCode.body[i].alternate.type === 'ExpressionStatement') {
            if (parsedCode.body[i].alternate.expression.type === 'AssignmentExpression') {
                AssSTelseR(parsedCode, i);
            }
            else {
                UpdSTelseR(parsedCode,i);
            }
        }
        else {
                RetSTelseR(parsedCode, i);
        }
    }
}
function belastBody(parsedCode,i) {
    if (parsedCode.body[i].type === 'ForStatement') {
        ForST(parsedCode, i);
        if (parsedCode.body[i].body.type === 'BlockStatement') {
            if( parsedCode.body[i].body.body.length > 0) {
                startBody(parsedCode.body[i].body);
            }
            else {
                i++;
            }
        }
        else {
            lastBody(parsedCode,i);
        }
    }
}
function lastBody(parsedCode,i) {
    if (parsedCode.body[i].body.type === 'ReturnStatement') {
        RetSTfor(parsedCode, i);
    }
    else if (parsedCode.body[i].body.expression.type === 'AssignmentExpression') {
        AssSTfor(parsedCode, i);
    }
    else {
        UpdSTfor(parsedCode, i);
    }
}

// STATEMENT functions:
function ForST(parsedCode,i) {
    arrayB.push('for statement');
    let init='';
    if (parsedCode.body[i].init.type === 'AssignmentExpression') {
        init = ContForST(parsedCode,i,init);
    }
    else {
        init = parsedCode.body[i].init.declarations[0].id.name + ' ' + '=' + ' ';
        if (parsedCode.body[i].init.declarations[0].init.type === 'Literal') {
            init = init + parsedCode.body[i].init.declarations[0].init.value;
        }
        else {
            init = init + parsedCode.body[i].init.declarations[0].init.name;
        }
    }
    LastForST(parsedCode,i,init);
}
function ContForST(parsedCode,i,init) {
    init = parsedCode.body[i].init.left.name + ' ' + parsedCode.body[i].init.operator + ' ';
    if (parsedCode.body[i].init.right.type === 'Literal') {
        init = init + parsedCode.body[i].init.right.value;
    }
    else {
        init = init + parsedCode.body[i].init.right.name;
    }
    return init;
}
function LastForST(parsedCode,i,init) {
    let test = codegen.generate(parsedCode.body[i].test);
    let update= '';
    if(parsedCode.body[i].update.type ==='UpdateExpression'){
        update = parsedCode.body[i].update.argument.name+' '+parsedCode.body[i].update.operator;
    }
    else {
        update = parsedCode.body[i].update.left.name+' '+'='+ ' '+ codegen.generate(parsedCode.body[i].update.right);
    }
    let final = init +' ; '+ test + ' ; '+ update;
    arrayB.push(final);
    if(parsedCode.body[i].init.type === 'AssignmentExpression') {
        arrayB.push(parsedCode.body[i].init.left.loc.start.line);
    }
    else {
        arrayB.push(parsedCode.body[i].init.declarations[0].id.loc.start.line);
    }
}

function IfST(parsedCode,i) {
    arrayB.push('if statement');
    let element = codegen.generate(parsedCode.body[i].test);
    arrayB.push(element);
    if (parsedCode.body[i].test.left.type === 'BinaryExpression') {
        arrayB.push(parsedCode.body[i].test.left.left.loc.start.line);
    }
    else {
        arrayB.push(parsedCode.body[i].test.left.loc.start.line);
    }
}

function WhiST(parsedCode,i) { //need update element
    arrayB.push('while statement');
    let element = codegen.generate(parsedCode.body[i].test);
    arrayB.push(element);
    if (parsedCode.body[i].test.left.type === 'BinaryExpression') {
        arrayB.push(parsedCode.body[i].test.left.left.loc.start.line);
    }
    else {
        arrayB.push(parsedCode.body[i].test.left.loc.start.line);
    }

}

function VarDeST(parsedCode,i){
    for(let x=0;x<parsedCode.body[i].declarations.length ;x++){ // maybe need ask about type before
        arrayB.push('variable declaration');
        arrayB.push(parsedCode.body[i].declarations[x].id.name);
        if(parsedCode.body[i].declarations[x].init !== null){
            if (parsedCode.body[i].declarations[x].init.type === 'Identifier') {
                arrayB.push(parsedCode.body[i].declarations[x].init.name);
            }
            else if (parsedCode.body[i].declarations[x].init.type === 'Literal') {
                arrayB.push(parsedCode.body[i].declarations[x].init.value);
            }
        }
        else {
            arrayB.push('');
        }
        arrayB.push(parsedCode.body[i].declarations[x].id.loc.start.line);
    }
}

// I am very sorry about the complex code ... before the end i got troubled and i was'nt time to do well code...
function AssST(parsedCode,i){
    if(parsedCode.body[i].expression.type === 'AssignmentExpression'){
        arrayB.push('assignment expression');
        arrayB.push(parsedCode.body[i].expression.left.name);
        if (parsedCode.body[i].expression.right.type === 'BinaryExpression') {
            let tmp = codegen.generate(parsedCode.body[i].expression.right);
            arrayB.push(tmp);
        }
        else {
            LitVarExp(parsedCode,i);
        }
        arrayB.push(parsedCode.body[i].expression.left.loc.start.line);
    }
    else {
        UpdST(parsedCode,i);
    }
}
function AssSTelse(parsedCode,i) {
    if(parsedCode.body[i].alternate.alternate.expression.type === 'AssignmentExpression') {
        arrayB.push('assignment expression');
        arrayB.push(parsedCode.body[i].alternate.alternate.expression.left.name);
        if (parsedCode.body[i].alternate.alternate.expression.right.type === 'BinaryExpression') {
            let tmp = codegen.generate(parsedCode.body[i].alternate.alternate.expression.right);
            arrayB.push(tmp);
        }
        else {
            LitVarExp(parsedCode,i);
        }
        arrayB.push(parsedCode.body[i].alternate.alternate.expression.left.loc.start.line);
    }
    else {
        UpdSTelse(parsedCode,i);
    }
}
function AssSTelseR(parsedCode, i) {
    if(parsedCode.body[i].alternate.expression.type === 'AssignmentExpression') {
        arrayB.push('assignment expression');
        arrayB.push(parsedCode.body[i].alternate.expression.left.name);
        if (parsedCode.body[i].alternate.expression.right.type === 'BinaryExpression') {
            let tmp = codegen.generate(parsedCode.body[i].alternate.expression.right);
            arrayB.push(tmp);
        }
        else {
            LitVarExp(parsedCode,i);
        }
        arrayB.push(parsedCode.body[i].alternate.expression.left.loc.start.line);
    }
    else {
        UpdSTelseR(parsedCode,i);
    }
}
function AssSTcon(parsedCode,i) {
    if(parsedCode.body[i].consequent.expression.type === 'AssignmentExpression') {
        arrayB.push('assignment expression');
        arrayB.push(parsedCode.body[i].consequent.expression.left.name);
        if (parsedCode.body[i].consequent.expression.right.type === 'BinaryExpression') {
            let tmp = codegen.generate(parsedCode.body[i].consequent.expression.right);
            arrayB.push(tmp);
        }
        else {
            LitVarExp(parsedCode,i);
        }
        arrayB.push(parsedCode.body[i].consequent.expression.left.loc.start.line);
    }
    else {
        UpdSTcon(parsedCode,i);
    }
}
function AssSTaltcon(parsedCode,i) {
    if(parsedCode.body[i].alternate.consequent.expression.type === 'AssignmentExpression') {
        arrayB.push('assignment expression');
        arrayB.push(parsedCode.body[i].alternate.consequent.expression.left.name);
        if (parsedCode.body[i].alternate.consequent.expression.right.type === 'BinaryExpression') {
            let tmp = codegen.generate(parsedCode.body[i].alternate.consequent.expression.right);
            arrayB.push(tmp);
        }
        else {
            LitVarExp(parsedCode,i);
        }
        arrayB.push(parsedCode.body[i].alternate.consequent.expression.left.loc.start.line);
    }
    else {
        UpdSTaltcon(parsedCode,i);
    }
}
function AssSTfor(parsedCode, i) {
    if(parsedCode.body[i].body.expression.type === 'AssignmentExpression'){
        arrayB.push('assignment expression');
        arrayB.push(parsedCode.body[i].body.expression.left.name);
        if (parsedCode.body[i].body.expression.right.type === 'BinaryExpression') {
            let tmp = codegen.generate(parsedCode.body[i].body.expression.right);
            arrayB.push(tmp);
        }
        else {
            LitVarExp(parsedCode,i);
        }
        arrayB.push(parsedCode.body[i].body.expression.left.loc.start.line);
    }
    else {
        UpdSTfor(parsedCode,i);
    }
}
function RetST(parsedCode,i) {
    arrayB.push('return statement');
    if (parsedCode.body[i].argument.type === 'Identifier') {
        arrayB.push(parsedCode.body[i].argument.name);
    }
    else if (parsedCode.body[i].argument.type === 'Literal') {
        arrayB.push(parsedCode.body[i].argument.value);
    }
    else if(parsedCode.body[i].argument.type === 'UnaryExpression'){
        arrayB.push(parsedCode.body[i].argument.operator+''+parsedCode.body[i].argument.argument.value);
    }
    else {
        arrayB.push(BinExp(parsedCode.body[i].argument, ''));
    }
    arrayB.push(parsedCode.body[i].argument.loc.start.line);
}
function RetSTelse(parsedCode,i) {
    arrayB.push('return statement');
    if (parsedCode.body[i].alternate.alternate.argument.type === 'Identifier') {
        arrayB.push(parsedCode.body[i].alternate.alternate.argument.name);
    }
    else if (parsedCode.body[i].alternate.alternate.argument.type === 'Literal') {
        arrayB.push(parsedCode.body[i].alternate.alternate.argument.value);
    }
    else if(parsedCode.body[i].alternate.alternate.argument.type === 'UnaryExpression'){
        arrayB.push(parsedCode.body[i].alternate.alternate.argument.operator+''+parsedCode.body[i].alternate.alternate.argument.argument.value);
    }
    else {
        arrayB.push(BinExp(parsedCode.body[i].alternate.alternate.argument, ''));
    }
    arrayB.push(parsedCode.body[i].alternate.alternate.argument.loc.start.line);
}
function RetSTelseR(parsedCode, i){
    arrayB.push('return statement');
    if (parsedCode.body[i].alternate.argument.type === 'Identifier') {
        arrayB.push(parsedCode.body[i].alternate.argument.name);
    }
    else if (parsedCode.body[i].alternate.argument.type === 'Literal') {
        arrayB.push(parsedCode.body[i].alternate.argument.value);
    }
    else if(parsedCode.body[i].alternate.argument.type === 'UnaryExpression'){
        arrayB.push(parsedCode.body[i].alternate.alternate.argument.operator+''+parsedCode.body[i].alternate.argument.argument.value);
    }
    else {
        arrayB.push(BinExp(parsedCode.body[i].alternate.argument, ''));
    }
    arrayB.push(parsedCode.body[i].alternate.argument.loc.start.line);
}
function RetSTcon(parsedCode,i){
    arrayB.push('return statement');
    if (parsedCode.body[i].consequent.argument.type === 'Identifier') {
        arrayB.push(parsedCode.body[i].consequent.argument.name);
    }
    else if (parsedCode.body[i].consequent.argument.type === 'Literal') {
        arrayB.push(parsedCode.body[i].consequent.argument.value);
    }
    else if(parsedCode.body[i].consequent.argument.type === 'UnaryExpression'){
        arrayB.push(parsedCode.body[i].consequent.argument.operator+''+parsedCode.body[i].consequent.argument.argument.value);
    }
    else {
        arrayB.push(BinExp(parsedCode.body[i].consequent.argument, ''));
    }
    arrayB.push(parsedCode.body[i].consequent.argument.loc.start.line);
}
function RetSTaltcon(parsedCode,i) {
    arrayB.push('return statement');
    if (parsedCode.body[i].alternate.consequent.argument.type === 'Identifier') {
        arrayB.push(parsedCode.body[i].alternate.consequent.argument.name);
    }

    else if (parsedCode.body[i].alternate.consequent.argument.type === 'Literal') {
        arrayB.push(parsedCode.body[i].alternate.consequent.argument.value);
    }
    else if(parsedCode.body[i].alternate.consequent.argument.type === 'UnaryExpression'){
        arrayB.push(parsedCode.body[i].alternate.consequent.argument.operator+''+parsedCode.body[i].alternate.consequent.argument.argument.value);
    }
    else {
        arrayB.push(BinExp(parsedCode.body[i].alternate.consequent.argument, ''));
    }
    arrayB.push(parsedCode.body[i].alternate.consequent.argument.loc.start.line);
}
function RetSTfor(parsedCode, i){
    arrayB.push('return statement');
    if (parsedCode.body[i].body.argument.type === 'Identifier') {
        arrayB.push(parsedCode.body[i].body.argument.name);
    }
    else if (parsedCode.body[i].body.argument.type === 'Literal') {
        arrayB.push(parsedCode.body[i].body.argument.value);
    }
    else if(parsedCode.body[i].body.argument.type === 'UnaryExpression'){
        arrayB.push(parsedCode.body[i].body.argument.operator+''+parsedCode.body[i].body.argument.argument.value);
    }
    else {
        arrayB.push(BinExp(parsedCode.body[i].body.argument, ''));
    }
    arrayB.push(parsedCode.body[i].body.argument.loc.start.line);
}
function UpdST(parsedCode,i) {
    arrayB.push('update expression');
    arrayB.push(parsedCode.body[i].expression.argument.name);//just name
    arrayB.push(parsedCode.body[i].expression.argument.name+' '+parsedCode.body[i].expression.operator);//value
    arrayB.push(parsedCode.body[i].expression.argument.loc.start.line);
}
function UpdSTelse(parsedCode,i) {
    arrayB.push('update expression');
    arrayB.push(parsedCode.body[i].alternate.alternate.expression.argument.name);//just name
    arrayB.push(parsedCode.body[i].alternate.alternate.expression.argument.name+' '+parsedCode.body[i].alternate.alternate.expression.operator);//value
    arrayB.push(parsedCode.body[i].alternate.alternate.expression.argument.loc.start.line);
}
function UpdSTcon(parsedCode,i) {
    arrayB.push('update expression');
    arrayB.push(parsedCode.body[i].consequent.expression.argument.name);//just name
    arrayB.push(parsedCode.body[i].consequent.expression.argument.name+' '+parsedCode.body[i].consequent.expression.operator);//value
    arrayB.push(parsedCode.body[i].consequent.expression.argument.loc.start.line);
}
function UpdSTaltcon(parsedCode,i) {
    arrayB.push('update expression');
    arrayB.push(parsedCode.body[i].alternate.consequent.expression.argument.name);//just name
    arrayB.push(parsedCode.body[i].alternate.consequent.expression.argument.name+' '+parsedCode.body[i].alternate.consequent.expression.operator);//value
    arrayB.push(parsedCode.body[i].alternate.consequent.expression.argument.loc.start.line);
}
function UpdSTelseR(parsedCode,i) {
    arrayB.push('update expression');
    arrayB.push(parsedCode.body[i].alternate.expression.argument.name);//just name
    arrayB.push(parsedCode.body[i].alternate.expression.argument.name+' '+parsedCode.body[i].alternate.expression.operator);//value
    arrayB.push(parsedCode.body[i].alternate.expression.argument.loc.start.line);
}
function UpdSTfor(parsedCode, i) {
    arrayB.push('update expression');
    arrayB.push(parsedCode.body[i].body.expression.argument.name);//just name
    arrayB.push(parsedCode.body[i].body.expression.argument.name+' '+parsedCode.body[i].body.expression.operator);//value
    arrayB.push(parsedCode.body[i].body.expression.argument.loc.start.line);
}

// EXPRESSION functions:
function LitVarExp(parsedCode,i) {
    if (parsedCode.body[i].expression.right.type === 'Literal') {
        arrayB.push(parsedCode.body[i].expression.right.value);
    }
    else {
        arrayB.push(parsedCode.body[i].expression.right.name);
    }
}

function BinExp(parsedCode,element){ //maybe need fix
    if(parsedCode.type ==='BinaryExpression') {
        element = element + BinExp(parsedCode.left,element)+' '+parsedCode.operator+' '+BinExp(parsedCode.right,element);
    }
    else {
        if(parsedCode.type === 'Identifier') {
            element = parsedCode.name;
        }
        else {
            element = parsedCode.value;
        }
    }
    return element;
}

