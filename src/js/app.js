import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {RUN} from './code-analyzer';
let arrayB = [] ;
let Table='';
$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        arrayB = RUN(parsedCode);
        Table = makeTableHTML(arrayB);
        window.alert(arrayB.toString());
        printData(Table);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
});

function printData(Table) {
    var newWin;
    var divToPrint=Table;
    newWin= window.open('');
    newWin.document.write(divToPrint);
}
function makeTableHTML(arrB) {
    let result = '<table border=1>';
    result = result +'<tr>' +'<tbody>'+'<th>' + 'Line'+ '</th>'+'<th>' + 'Type'+ '</th>'+'<th>' + 'Name'+ '</th>'+'<th>' + 'Condition'+ '</th>'+'<th>' + 'Value'+ '</th>'+'</tr>';
    for(let i=0; i<arrB.length;i) {
        result += '<tr>';
        let skip = getSkip(arrB,i);
        result += organizeTD_A(arrB,i);
        i = i + skip;
        result += '</tr>';
    }
    result += '</tbody>'+'</table>';

    return result;
}

function organizeTD_A(arrTD,i) {
    if(arrTD[i] === 'function declaration'){
        return ('<td>'+arrTD[i+2] +'</td>' + '<td>'+arrTD[i] +'</td>' + '<td>'+arrTD[i+1] +'</td>'+'<td>'+''+'</td>'+'<td>'+''+'</td>' );
    }
    else if(arrTD[i] === 'variable declaration'){
        if(arrTD[i+2] === 1 && arrTD[i+6] !== 1 ) {
            return ('<td>'+arrTD[i+2] +'</td>' + '<td>'+arrTD[i] +'</td>' + '<td>'+arrTD[i+1] +'</td>'+'<td>'+''+'</td>'+'<td>'+''+'</td>');
        }
        else {
            return ('<td>'+arrTD[i+3] +'</td>' + '<td>'+arrTD[i] +'</td>' + '<td>'+arrTD[i+1] +'</td>' +'<td>'+''+'</td>'+'<td>'+arrTD[i+2] +'</td>');
        }
    }

    else{
        return organizeTD_B(arrTD,i);
    }
}
function organizeTD_B(arrTD,i){
    if(arrTD[i] === 'if statement'){//ask if this ok!!?
        return ('<td>'+arrTD[i+2] +'</td>' + '<td>'+arrTD[i] +'</td>'+'<td>'+''+'</td>' + '<td>'+arrTD[i+1] +'</td>'+'<td>'+''+'</td>');
    }
    else if(arrTD[i] === 'assignment expression'){
        return ('<td>'+arrTD[i+3] +'</td>' + '<td>'+arrTD[i] +'</td>' + '<td>'+arrTD[i+1] +'</td>'+'<td>'+''+'</td>' + '<td>'+arrTD[i+2] +'</td>');
    }
    else if(arrTD[i] === 'while statement'){
        return ('<td>'+arrTD[i+2] +'</td>' + '<td>'+arrTD[i] +'</td>'+'<td>'+''+'</td>' + '<td>'+arrTD[i+1] +'</td>'+'<td>'+''+'</td>');
    }
    else if(arrTD[i] === 'else if statement'){
        return ('<td>'+arrTD[i+2] +'</td>' + '<td>'+arrTD[i] +'</td>'+'<td>'+''+'</td>' + '<td>'+arrTD[i+1] +'</td>'+'<td>'+''+'</td>');
    }
    else{
        return organizeTD_C(arrTD,i);
    }
}
function organizeTD_C(arrTD,i) {
    if(arrTD[i] === 'update expression'){
        return ('<td>'+arrTD[i+3] +'</td>' + '<td>'+arrTD[i] +'</td>' + '<td>'+arrTD[i+1] +'</td>'+'<td>'+''+'</td>' + '<td>'+arrTD[i+2] +'</td>');
    }
    else if(arrTD[i] === 'return statement'){
        return ('<td>'+arrTD[i+2] +'</td>' + '<td>'+arrTD[i] +'</td>'+'<td>'+''+'</td>'+'<td>'+''+'</td>'+'<td>'+arrTD[i+1] +'</td>' );
    }
    else if (arrTD[i] === 'for statement'){
        return ('<td>'+arrTD[i+2] +'</td>' + '<td>'+arrTD[i] +'</td>'+'<td>'+''+'</td>'+ '<td>'+arrTD[i+1] +'</td>' +'<td>'+''+'</td>');
    }
}

function getSkip(arrTD,i) {
    if(arrTD[i] === 'function declaration'){
        return 3;
    }
    else if(arrTD[i] === 'variable declaration'){
        if(arrTD[i+2] === 1 && arrTD[i+6] !== 1 ) {
            return 3;
        }
        else {
            return 4;
        }
    }
    else{
        return contSKip(arrTD,i);
    }
}
function contSKip(arrTD,i){
    if(arrTD[i] === 'if statement'){
        return 3;
    }
    else if(arrTD[i] === 'assignment expression' || arrTD[i] === 'update expression'){
        return 4;
    }
    else if(arrTD[i] === 'while statement'){
        return 3;
    }
    else{ /*if(arrTD[i] === 'else if statement' || arrTD[i] === 'return statement')*/
        {
            return 3;
        }
    }

}
