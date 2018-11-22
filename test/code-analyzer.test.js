import assert from 'assert';
import {RUN, parseCode} from '../src/js/code-analyzer';

describe('example test from site and more full function' ,() => {
    // Test 1:
    it('check full function from sample project', () => {
        assert.equal(RUN(parseCode('function binarySearch(X, V, n){\n' +
            '    let low, high, mid;\n' +
            '    low = 0;\n' +
            '    high = n - 1;\n' +
            '    while (low <= high) {\n' +
            '        mid = (low + high)/2;\n' +
            '        if (X < V[mid])\n' +
            '            high = mid - 1;\n' +
            '        else if (X > V[mid])\n' +
            '            low = mid + 1;\n' +
            '        else\n' +
            '            return mid;\n' +
            '    }\n' +
            '    return -1;\n' +
            '}')).toString(), 'function declaration,binarySearch,1,variable declaration,X,1,variable declaration,V,1,variable declaration,n,1,variable declaration,low,,2,variable declaration,high,,2,variable declaration,mid,,2,assignment expression,low,0,3,assignment expression,high,n - 1,4,while statement,low <= high,5,assignment expression,mid,(low + high) / 2,6,if statement,X < V[mid],7,assignment expression,high,mid - 1,8,else if statement,X > V[mid],9,assignment expression,low,mid + 1,10,return statement,mid,12,return statement,-1,14');
    });
    // Test 2:
    it('check full with for function', () => {
        assert.equal(RUN(parseCode('function forCheck(x,y,z){\n' +
            '  let i = 3;\n' +
            '  let t;\n' +
            '  for(t=0; y < 20 ; y=y+1){\n' +
            '    x=5;\n' +
            '  }\n' +
            '  for(x=0; z < t ; x++){\n' +
            '    for(x=0; w < i ; x++){\n' +
            '      let m = y;\n' +
            '  }\n' +
            '}\n' +
            'return m;\n' +
            '}')).toString() , 'function declaration,forCheck,1,variable declaration,x,1,variable declaration,y,1,variable declaration,z,1,variable declaration,i,3,2,variable declaration,t,,3,for statement,t = 0 ; y < 20 ; y = y + 1,4,assignment expression,x,5,5,for statement,x = 0 ; z < t ; x ++,7,for statement,x = 0 ; w < i ; x ++,8,variable declaration,m,y,9,return statement,m,12');

    });
    // Test 3:
    it('check full with if else function', () => {
        assert.equal(RUN(parseCode('function iffelse(x,y,z){\n' +
            '                   let i = 3;\n' +
            '                       let t;\n' +
            '                        for(t=0; t < 20 + 5 ; t=t+1){\n' +
            '                          if(x<5){\n' +
            '                             i++;\n' +
            '                         }\n' +
            '                   }\n' +
            '                        if (X < V[mid]){\n' +
            '                 }\n' +
            '                        else {\n' +
            '                        }\n' +
            '                        if(x < X)\n' +
            '                        i++;\n' +
            '                        else\n' +
            '                        t++;    \n' +
            '                        let w = true;\n' +
            '                          if(w==true){\n' +
            '                           w=false;\n' +
            '                          }\n' +
            '                          else if(w == false){\n' +
            '                             w=true;\n' +
            '                          }\n' +
            '                           else{\n' +
            '                             return x;\n' +
            '                        }\n' +
            '                        return m;\n' +
            '                        }')).toString() ,'function declaration,iffelse,1,variable declaration,x,1,variable declaration,y,1,variable declaration,z,1,variable declaration,i,3,2,variable declaration,t,,3,for statement,t = 0 ; t < 20 + 5 ; t = t + 1,4,if statement,x < 5,5,update expression,i,i ++,6,if statement,X < V[mid],9,if statement,x < X,13,update expression,i,i ++,14,update expression,t,t ++,16,variable declaration,w,true,17,if statement,w == true,18,assignment expression,w,false,19,else if statement,w == false,21,assignment expression,w,true,22,return statement,x,25,return statement,m,27');
    });
    // Test 4:
    it('empty function', () => {
        assert.equal(RUN(parseCode('function empty(){\n' +
            '\n' +
            '}')).toString() ,'function declaration,empty,1');
    });
});

describe('unit test case:' ,() => {
    // Test 5:
    it('check let function', () => {
        assert.equal(RUN(parseCode('function letCheck(i){\n' +
            '   let g = 5;\n' +
            '   let h = i\n' +
            '   let a,b,c,d,e;\n' +
            '   let f;\n' +
            '   x=7;\n' +
            '   y=6;\n' +
            '   \n' +
            '}')).toString() , 'function declaration,letCheck,1,variable declaration,i,1,variable declaration,g,5,2,variable declaration,h,i,3,variable declaration,a,,4,variable declaration,b,,4,variable declaration,c,,4,variable declaration,d,,4,variable declaration,e,,4,variable declaration,f,,5,assignment expression,x,7,6,assignment expression,y,6,7');
    });
    // Test 6:
    it('check define function and params', () => {
        assert.equal(RUN(parseCode('function funcANDparams(a,b,c,d,e,f,g,h,i){\n' +
            '   \n' +
            '}')).toString() ,'function declaration,funcANDparams,1,variable declaration,a,1,variable declaration,b,1,variable declaration,c,1,variable declaration,d,1,variable declaration,e,1,variable declaration,f,1,variable declaration,g,1,variable declaration,h,1,variable declaration,i,1');
    });
    // Test 7:
    it('check return', () => {
        assert.equal(RUN(parseCode('function return_paramsANDsimplereturn(a,b,c,d,e,f,g,h,i){\n' +
            '   return a;\n' +
            '   return b;\n' +
            '   return c*d;\n' +
            '   return 100;\n' +
            '   return 3-d;\n' +
            '   return i+50;\n' +
            '   return -1;\n' +
            '}')).toString() ,'function declaration,return_paramsANDsimplereturn,1,variable declaration,a,1,variable declaration,b,1,variable declaration,c,1,variable declaration,d,1,variable declaration,e,1,variable declaration,f,1,variable declaration,g,1,variable declaration,h,1,variable declaration,i,1,return statement,a,2,return statement,b,3,return statement,c * d,4,return statement,100,5,return statement,3 - d,6,return statement,i + 50,7,return statement,-1,8');
    });
    // Test 8:
    it('check if else', () => {
        assert.equal(RUN(parseCode('function check_condition(x,y){\n' +
            '   if(x>y){\n' +
            '     if(x>100){\n' +
            '      y=50;\n' +
            '     }\n' +
            '   }\n' +
            '   else{\n' +
            '     x=50;\n' +
            '   }\n' +
            '   if(x == y){\n' +
            '   \n' +
            '   }\n' +
            '   else if(x != y+1){\n' +
            '   }\n' +
            '   else{\n' +
            '     return 100 * x * y;\n' +
            '   }\n' +
            '}')).toString() ,    'function declaration,check_condition,1,variable declaration,x,1,variable declaration,y,1,if statement,x > y,2,if statement,x > 100,3,assignment expression,y,50,4,assignment expression,x,50,8,if statement,x == y,10,else if statement,x != y + 1,13,return statement,100 * x * y,16');
    });
    // Test 9:
    it('check loops', () => {
        assert.equal(RUN(parseCode('function checkLoops(x,y){\n' +
            '   while(x<5){\n' +
            '     y++;\n' +
            '     y=y+1;\n' +
            '     for(let m = 5 ; m < 10 ; m++){\n' +
            '       return 6;\n' +
            '     }\n' +
            '   }\n' +
            '   for(x = n; x < n*n;x++){\n' +
            '     for(b = 3; b < 1; b= b+1) {\n' +
            '        t++;\n' +
            '     }\n' +
            '     for(g=1; g<b; g++){\n' +
            '     }\n' +
            '   }\n' +
            '}')).toString() ,'function declaration,checkLoops,1,variable declaration,x,1,variable declaration,y,1,while statement,x < 5,2,update expression,y,y ++,3,assignment expression,y,y + 1,4,for statement,m = 5 ; m < 10 ; m ++,5,return statement,6,6,for statement,x = n ; x < n * n ; x ++,9,for statement,b = 3 ; b < 1 ; b = b + 1,10,update expression,t,t ++,11,for statement,g = 1 ; g < b ; g ++,13');

    });
    // Test 10:
    it('check assignments and declarations', () => {
        assert.equal(RUN(parseCode('function checkLoops(x,c){\n' +
            '   let a,name;\n' +
            '   name = 6;\n' +
            '   let b = 1;\n' +
            '   let c = name;\n' +
            '   x = b + 1;\n' +
            '   let d = (x * c) + 2;\n' +
            '   \n' +
            '}')).toString() ,'function declaration,checkLoops,1,variable declaration,x,1,variable declaration,c,1,variable declaration,a,,2,variable declaration,name,,2,assignment expression,name,6,3,variable declaration,b,1,4,variable declaration,c,name,5,assignment expression,x,b + 1,6,variable declaration,d,7');
    });
});
describe('randomly function from internet:' ,() => {
    // Test 11:
    it('RAND 1:', () => {
        assert.equal(RUN(parseCode('function myFunction(p1, p2) {\n' +
            '    return p1 * p2;              // The function returns the product of p1 and p2\n' +
            '}')).toString(), 'function declaration,myFunction,1,variable declaration,p1,1,variable declaration,p2,1,return statement,p1 * p2,2');
    });
    // Test 12:
    it('RAND 2:', () => {
        assert.equal(RUN(parseCode('function toCelsius(fahrenheit) {\n' +
            'return (5/9) * (fahrenheit-32);\n' +
            '}')).toString(), 'function declaration,toCelsius,1,variable declaration,fahrenheit,1,return statement,5 / 9 * fahrenheit - 32,2');
    });
    // Test 13:
    it('RAND 3:', () => {
        assert.equal(RUN(parseCode('function square(number) {\n' +
            ' return number * number;\n' +
            '}')).toString(), 'function declaration,square,1,variable declaration,number,1,return statement,number * number,2');
    });
});

describe('specific test to coverage:' ,() => {
    // Test 14:
    it('if else more branches:', () => {
        assert.equal(RUN(parseCode('function ddd(X, V, n){\n' +
            '    let low, high, mid;\n' +
            '    low = 0;\n' +
            '    high = n - 1;\n' +
            '    while (low <= high) {\n' +
            '        mid = (low + high)/2;\n' +
            '        if (X < V[mid])\n' +
            '            high = mid - 1;\n' +
            '        else if (X > V[mid]){\n' +
            '            return 1;\n' +
            '}\n' +
            '        else{\n' +
            '            mid=mid+1;\n' +
            'mid++;\n' +
            'return 5;\n' +
            '\n' +
            '}\n' +
            '    }\n' +
            '    return -1;\n' +
            '}')).toString(), 'function declaration,ddd,1,variable declaration,X,1,variable declaration,V,1,variable declaration,n,1,variable declaration,low,,2,variable declaration,high,,2,variable declaration,mid,,2,assignment expression,low,0,3,assignment expression,high,n - 1,4,while statement,low <= high,5,assignment expression,mid,(low + high) / 2,6,if statement,X < V[mid],7,assignment expression,high,mid - 1,8,else if statement,X > V[mid],9,return statement,1,10,assignment expression,mid,mid + 1,13,update expression,mid,mid ++,14,return statement,5,15,return statement,-1,19');
    });
    // Test 15:
    it('iff else more branches:', () => {
        assert.equal(RUN(parseCode('function ddd(X, V, n){\n' +
            '                    if (X < n)\n' +
            '                        n++;\n' +
            '                    else if (X > V[mid]){\n' +
            '                        return 1;\n' +
            '            }\n' +
            '                    else\n' +
            '            x = x+1;\n' +
            '                \n' +
            '               return -1;\n' +
            '            }')).toString(), 'function declaration,ddd,1,variable declaration,X,1,variable declaration,V,1,variable declaration,n,1,if statement,X < n,2,update expression,n,n ++,3,else if statement,X > V[mid],4,return statement,1,5,assignment expression,x,x + 1,8,return statement,-1,10');

    });
    // Test 16:
    it('ifff else more branches:', () => {
        assert.equal(RUN(parseCode('function sss(X, V, n){\n' +
            '                    mid = (low + high)/2;\n' +
            '                    if (X < V[mid])\n' +
            '                        high = mid - 1;\n' +
            '                    else\n' +
            '                      i=i+1;\n' +
            '                    if (X > V[mid])\n' +
            '                        i++;\n' +
            '                    else\n' +
            '                     return 5;\n' +
            '                \n' +
            '            for(let g=0;g<5;g++)\n' +
            '            g=g+1;\n' +
            '                return -1;\n' +
            '            }')).toString(), 'function declaration,sss,1,variable declaration,X,1,variable declaration,V,1,variable declaration,n,1,assignment expression,mid,(low + high) / 2,2,if statement,X < V[mid],3,assignment expression,high,mid - 1,4,assignment expression,i,i + 1,6,if statement,X > V[mid],7,update expression,i,i ++,8,return statement,5,10,for statement,g = 0 ; g < 5 ; g ++,12,assignment expression,g,g + 1,13,return statement,-1,14');
    });
    // Test 17:
    it('for more branches:', () => {
        assert.equal(RUN(parseCode('function forfor(X, V, n){\n' +
            'let x,i;\n' +
            'for(x=0;x<10;x++)\n' +
            'i++;\n' +
            '\n' +
            '}')).toString(), 'function declaration,forfor,1,variable declaration,X,1,variable declaration,V,1,variable declaration,n,1,variable declaration,x,,2,variable declaration,i,,2,for statement,x = 0 ; x < 10 ; x ++,3,update expression,i,i ++,4');
    });
    // Test 18:
    it('ffor more branches:', () => {
        assert.equal(RUN(parseCode('function mmm(X, V, n){\n' +
            '  for(let i=0;i<10;i++)\n' +
            '    return n;\n' +
            'for(let i=0;i<10;i++)\n' +
            '    return -3;\n' +
            'for(let i=0;i<10;i++)\n' +
            '    return 1;\n' +
            '\n' +
            '}')).toString(), 'function declaration,mmm,1,variable declaration,X,1,variable declaration,V,1,variable declaration,n,1,for statement,i = 0 ; i < 10 ; i ++,2,return statement,n,3,for statement,i = 0 ; i < 10 ; i ++,4,return statement,-3,5,for statement,i = 0 ; i < 10 ; i ++,6,return statement,1,7');

    });
    // Test 19:
    it('else more branches:', () => {
        assert.equal(RUN(parseCode('function ddd(X, V, n){\n' +
            '                    if (X < n)\n' +
            '                        n++;\n' +
            '                    else if (X > V[mid])\n' +
            '                        n++;\n' +
            '                    else\n' +
            '                     x++;\n' +
            '               return n;\n' +
            '            }')).toString(), 'function declaration,ddd,1,variable declaration,X,1,variable declaration,V,1,variable declaration,n,1,if statement,X < n,2,update expression,n,n ++,3,else if statement,X > V[mid],4,update expression,n,n ++,5,update expression,x,x ++,7,return statement,n,8');
});
    // Test 20:
    it('return more branches:', () => {
        assert.equal(RUN(parseCode('function last(x){\n' +
            'if(x==1)\n' +
            'return x;\n' +
            'else if(x==2)\n' +
            'return x;\n' +
            'else\n' +
            'return x;\n' +
            '\n' +
            'if(x==1)\n' +
            'return 1;\n' +
            'else if(x==2)\n' +
            'return 2;\n' +
            'else\n' +
            'return 3;\n' +
            '\n' +
            'if(x==1)\n' +
            'return -3;\n' +
            'else if(x==2)\n' +
            'return -3;\n' +
            'else\n' +
            'return -2;\n' +
            '\n' +
            'if(x==1)\n' +
            'return 1*5;\n' +
            'else if(x==2)\n' +
            'return 2*n;\n' +
            'else\n' +
            'return 3*2;\n' +
            '\n' +
            '\n' +
            '}')).toString(), 'function declaration,last,1,variable declaration,x,1,if statement,x == 1,2,return statement,x,3,else if statement,x == 2,4,return statement,x,5,return statement,x,7,if statement,x == 1,9,return statement,1,10,else if statement,x == 2,11,return statement,2,12,return statement,3,14,if statement,x == 1,16,return statement,-3,17,else if statement,x == 2,18,return statement,-3,19,return statement,-2,21,if statement,x == 1,23,return statement,1 * 5,24,else if statement,x == 2,25,return statement,2 * n,26,return statement,3 * 2,28'); });
});