function checkXSS(input) {
    const regex = /<script|<\/script>|<iframe|<\/iframe>|<object|<\/object>|<embed|<\/embed>|javascript:|onload=|onerror=|alert\(|eval\(|expression\(|url\(|data:/gi;
    if(regex.test(input)){
        console.log('[ CRTL ] XSS Attempted:' + input)
        return ''
    }else{
        return input
    }
}

module.exports = checkXSS