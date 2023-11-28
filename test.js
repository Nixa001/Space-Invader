function pyramid(str, num){
    let res = ''
    let space = ' '.repeat(str.length)
    for (let i = 1 ; i <= num; i++) {
        res = res + space.repeat(num-i) + str.repeat(2 * i - 1) + '\n'
    }
    return res.slice(0, -1)
}
console.log(pyramid('+', 5))